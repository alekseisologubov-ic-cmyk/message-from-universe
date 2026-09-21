// ==========================================================
// UNIVERSE139 - SUBSCRIBE API
//
// File:
// api/subscribe.js
//
// Endpoint:
// POST /api/subscribe
//
// Supabase table:
// public.universe139_subscribers
//
// Vercel environment variables:
//
// SUPABASE_URL
// SUPABASE_SERVICE_ROLE_KEY
//
// ==========================================================

import crypto from "crypto";


// ==========================================================
// CONFIG
// ==========================================================

const TABLE_NAME =
  "universe139_subscribers";

const ALLOWED_LANGUAGES = [
  "en",
  "es",
  "zh",
  "ru",
  "hi",
  "th"
];


// ==========================================================
// NORMALIZE SUPABASE URL
//
// Accepts either:
//
// https://project.supabase.co
//
// OR:
//
// https://project.supabase.co/rest/v1/
//
// and always produces the correct base URL.
// ==========================================================

function normalizeSupabaseUrl(value) {

  return String(value || "")
    .trim()
    .replace(/\/+$/, "")
    .replace(/\/rest\/v1$/, "");

}


// ==========================================================
// EMAIL VALIDATION
// ==========================================================

function isValidEmail(email) {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email
  );

}


// ==========================================================
// TIMEZONE VALIDATION
// ==========================================================

function getTimezone(value) {

  const timezone =
    String(
      value ||
      "Europe/Tallinn"
    ).trim();

  try {

    new Intl.DateTimeFormat(
      "en-US",
      {
        timeZone: timezone
      }
    ).format(
      new Date()
    );

    return timezone;

  } catch {

    return "Europe/Tallinn";

  }

}


// ==========================================================
// CREATE RANDOM 500-MESSAGE ORDER
//
// Numbers 0-499 are stored in a randomized order.
// ==========================================================

function createMessageOrder() {

  const order =
    Array.from(
      {
        length: 500
      },
      (_, index) => index
    );


  for (
    let i = order.length - 1;
    i > 0;
    i--
  ) {

    const j =
      crypto.randomInt(
        0,
        i + 1
      );


    const temp =
      order[i];

    order[i] =
      order[j];

    order[j] =
      temp;

  }


  return order;

}


// ==========================================================
// CREATE UNSUBSCRIBE TOKEN HASH
// ==========================================================

function createUnsubscribeToken() {

  return crypto
    .randomBytes(32)
    .toString("hex");

}


function hashToken(token) {

  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

}


// ==========================================================
// MAIN HANDLER
// ==========================================================

export default async function handler(
  req,
  res
) {

  // --------------------------------------------------------
  // Response headers
  // --------------------------------------------------------

  res.setHeader(
    "Content-Type",
    "application/json; charset=utf-8"
  );

  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate"
  );


  // --------------------------------------------------------
  // POST only
  // --------------------------------------------------------

  if (req.method !== "POST") {

    return res.status(405).json({

      ok: false,

      error:
        "Method not allowed. Use POST."

    });

  }


  try {

    // ======================================================
    // SUPABASE ENVIRONMENT VARIABLES
    // ======================================================

    const rawSupabaseUrl =
      String(
        process.env.SUPABASE_URL || ""
      ).trim();


    const supabaseUrl =
      normalizeSupabaseUrl(
        rawSupabaseUrl
      );


    const supabaseKey =
      String(
        process.env.SUPABASE_SERVICE_ROLE_KEY || ""
      ).trim();


    // ------------------------------------------------------
    // Validate configuration
    // ------------------------------------------------------

    if (!supabaseUrl) {

      return res.status(500).json({

        ok: false,

        error:
          "SUPABASE_URL is missing in Vercel."

      });

    }


    if (!supabaseKey) {

      return res.status(500).json({

        ok: false,

        error:
          "SUPABASE_SERVICE_ROLE_KEY is missing in Vercel."

      });

    }


    // ======================================================
    // BODY
    // ======================================================

    let body =
      req.body || {};


    if (
      typeof body === "string"
    ) {

      try {

        body =
          JSON.parse(
            body
          );

      } catch {

        return res.status(400).json({

          ok: false,

          error:
            "Invalid JSON request."

        });

      }

    }


    // ======================================================
    // EMAIL
    // ======================================================

    const email =
      String(
        body.email || ""
      )
        .trim()
        .toLowerCase();


    if (
      !isValidEmail(
        email
      )
    ) {

      return res.status(400).json({

        ok: false,

        error:
          "Please enter a valid email address."

      });

    }


    // ======================================================
    // LANGUAGE
    // ======================================================

    const requestedLanguage =
      String(
        body.language ||
        "en"
      )
        .trim()
        .toLowerCase();


    const language =
      ALLOWED_LANGUAGES.includes(
        requestedLanguage
      )
        ? requestedLanguage
        : "en";


    // ======================================================
    // TIMEZONE
    // ======================================================

    const timezone =
      getTimezone(
        body.timezone
      );


    // ======================================================
    // SUPABASE REST URL
    //
    // IMPORTANT:
    //
    // Even if Vercel contains:
    //
    // https://project.supabase.co/rest/v1/
    //
    // normalizeSupabaseUrl() removes /rest/v1 first.
    //
    // Final URL is always:
    //
    // https://project.supabase.co/rest/v1/universe139_subscribers
    // ======================================================

    const tableUrl =
      `${supabaseUrl}/rest/v1/${TABLE_NAME}`;


    // ======================================================
    // SERVICE ROLE HEADERS
    // ======================================================

    const supabaseHeaders = {

      apikey:
        supabaseKey,

      Authorization:
        `Bearer ${supabaseKey}`,

      "Content-Type":
        "application/json",

      Accept:
        "application/json"

    };


    // ======================================================
    // CHECK EXISTING SUBSCRIBER
    // ======================================================

    const lookupUrl =
      `${tableUrl}` +
      `?select=id,email,language,timezone,active,message_position,subscribed_at` +
      `&email=eq.${encodeURIComponent(email)}` +
      `&limit=1`;


    const lookupResponse =
      await fetch(
        lookupUrl,
        {

          method:
            "GET",

          headers:
            supabaseHeaders

        }
      );


    const lookupText =
      await lookupResponse.text();


    // ------------------------------------------------------
    // Lookup error
    // ------------------------------------------------------

    if (
      !lookupResponse.ok
    ) {

      console.error(
        "Universe139 Supabase lookup error:",
        lookupResponse.status,
        lookupText
      );


      return res.status(502).json({

        ok: false,

        error:
          "Supabase rejected the database request.",

        supabaseStatus:
          lookupResponse.status,

        supabaseResponse:
          lookupText

      });

    }


    let existing =
      [];


    try {

      existing =
        lookupText
          ? JSON.parse(
              lookupText
            )
          : [];

    } catch {

      return res.status(502).json({

        ok: false,

        error:
          "Supabase returned invalid JSON.",

        supabaseResponse:
          lookupText

      });

    }


    // ======================================================
    // EXISTING SUBSCRIBER
    // ======================================================

    if (
      Array.isArray(existing) &&
      existing.length > 0
    ) {

      const subscriber =
        existing[0];


      // ----------------------------------------------------
      // Reactivate / update
      // ----------------------------------------------------

      const updateUrl =
        `${tableUrl}` +
        `?id=eq.${encodeURIComponent(
          subscriber.id
        )}`;


      const updateResponse =
        await fetch(
          updateUrl,
          {

            method:
              "PATCH",

            headers: {

              ...supabaseHeaders,

              Prefer:
                "return=representation"

            },

            body:
              JSON.stringify({

                language,

                timezone,

                active:
                  true

              })

          }
        );


      const updateText =
        await updateResponse.text();


      if (
        !updateResponse.ok
      ) {

        console.error(
          "Universe139 Supabase update error:",
          updateResponse.status,
          updateText
        );


        return res.status(502).json({

          ok: false,

          error:
            "Supabase rejected the subscription update.",

          supabaseStatus:
            updateResponse.status,

          supabaseResponse:
            updateText

        });

      }


      return res.status(200).json({

        ok:
          true,

        subscribed:
          true,

        alreadySubscribed:
          true,

        message:
          "You are already subscribed."

      });

    }


    // ======================================================
    // NEW SUBSCRIBER
    // ======================================================

    const unsubscribeToken =
      createUnsubscribeToken();


    const unsubscribeTokenHash =
      hashToken(
        unsubscribeToken
      );


    // ------------------------------------------------------
    // Private randomized sequence of 500 messages
    // ------------------------------------------------------

    const messageOrder =
      createMessageOrder();


    // ------------------------------------------------------
    // Payload matches the actual database schema
    //
    // id               -> database default
    // subscribed_at    -> database default
    // updated_at       -> database default
    // last_sent_date   -> nullable, omitted
    // ------------------------------------------------------

    const insertPayload = {

      email,

      language,

      timezone,

      active:
        true,

      unsubscribe_token_hash:
        unsubscribeTokenHash,

      message_order:
        messageOrder,

      message_position:
        0

    };


    console.log(
      "Universe139: creating subscriber:",
      email
    );


    // ======================================================
    // INSERT
    // ======================================================

    const insertResponse =
      await fetch(
        tableUrl,
        {

          method:
            "POST",

          headers: {

            ...supabaseHeaders,

            Prefer:
              "return=representation"

          },

          body:
            JSON.stringify(
              insertPayload
            )

        }
      );


    const insertText =
      await insertResponse.text();


    // ======================================================
    // INSERT ERROR
    // ======================================================

    if (
      !insertResponse.ok
    ) {

      console.error(
        "Universe139 Supabase INSERT error:",
        insertResponse.status,
        insertText
      );


      // ----------------------------------------------------
      // Duplicate email
      // ----------------------------------------------------

      if (
        insertResponse.status === 409 ||
        /duplicate|unique/i.test(
          insertText
        )
      ) {

        return res.status(200).json({

          ok:
            true,

          subscribed:
            true,

          alreadySubscribed:
            true,

          message:
            "You are already subscribed."

        });

      }


      return res.status(502).json({

        ok:
          false,

        error:
          "Supabase rejected the subscription.",

        supabaseStatus:
          insertResponse.status,

        supabaseResponse:
          insertText

      });

    }


    // ======================================================
    // VERIFY INSERT
    // ======================================================

    const verifyUrl =
      `${tableUrl}` +
      `?select=id,email,language,timezone,active,message_position,subscribed_at` +
      `&email=eq.${encodeURIComponent(email)}` +
      `&limit=1`;


    const verifyResponse =
      await fetch(
        verifyUrl,
        {

          method:
            "GET",

          headers:
            supabaseHeaders

        }
      );


    const verifyText =
      await verifyResponse.text();


    if (
      !verifyResponse.ok
    ) {

      console.error(
        "Universe139 verification error:",
        verifyResponse.status,
        verifyText
      );


      return res.status(502).json({

        ok:
          false,

        error:
          "Subscriber was created but could not be verified.",

        supabaseStatus:
          verifyResponse.status,

        supabaseResponse:
          verifyText

      });

    }


    let verifiedRows =
      [];


    try {

      verifiedRows =
        verifyText
          ? JSON.parse(
              verifyText
            )
          : [];

    } catch {

      verifiedRows =
        [];

    }


    // ======================================================
    // FINAL CONFIRMATION
    // ======================================================

    if (
      !Array.isArray(
        verifiedRows
      ) ||
      verifiedRows.length === 0
    ) {

      return res.status(502).json({

        ok:
          false,

        error:
          "Supabase did not confirm that the subscriber was saved."

      });

    }


    // ======================================================
    // SUCCESS
    // ======================================================

    console.log(
      "Universe139 subscriber confirmed:",
      email
    );


    return res.status(200).json({

      ok:
        true,

      subscribed:
        true,

      alreadySubscribed:
        false,

      message:
        "You are subscribed. Your daily messages will begin soon.",

      subscriber:
        verifiedRows[0]

    });


  } catch (error) {

    // ======================================================
    // FATAL ERROR
    // ======================================================

    console.error(
      "Universe139 subscribe fatal error:",
      error
    );


    return res.status(500).json({

      ok:
        false,

      error:
        error?.message ||
        "Unable to save your subscription."

    });

  }

}
