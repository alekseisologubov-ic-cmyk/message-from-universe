// ==========================================================
// UNIVERSE139 - SUBSCRIBE API
// ==========================================================

import crypto from "crypto";


// ==========================================================
// MAIN HANDLER
// ==========================================================

export default async function handler(req, res) {

  res.setHeader(
    "Content-Type",
    "application/json; charset=utf-8"
  );

  res.setHeader(
    "Cache-Control",
    "no-store"
  );


  // --------------------------------------------------------
  // POST ONLY
  // --------------------------------------------------------

  if (req.method !== "POST") {

    return res.status(405).json({
      ok: false,
      error: "Method not allowed. Use POST."
    });

  }


  try {

    // ======================================================
    // SUPABASE CONFIG
    // ======================================================

    const supabaseUrl =
      String(
        process.env.SUPABASE_URL || ""
      )
        .trim()
        .replace(/\/+$/, "");


    const supabaseKey =
      String(
        process.env.SUPABASE_SERVICE_ROLE_KEY || ""
      )
        .trim();


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
    // READ BODY
    // ======================================================

    let body =
      req.body || {};


    if (
      typeof body === "string"
    ) {

      try {

        body =
          JSON.parse(body);

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
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
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

    const allowedLanguages = [
      "en",
      "es",
      "zh",
      "ru",
      "hi",
      "th"
    ];


    const requestedLanguage =
      String(
        body.language || "en"
      )
        .trim()
        .toLowerCase();


    const language =
      allowedLanguages.includes(
        requestedLanguage
      )
        ? requestedLanguage
        : "en";


    // ======================================================
    // TIMEZONE
    // ======================================================

    const timezone =
      String(
        body.timezone ||
        "Europe/Tallinn"
      ).trim();


    // ======================================================
    // TABLE
    // ======================================================

    const tableUrl =
      `${supabaseUrl}/rest/v1/universe139_subscribers`;


    // ======================================================
    // HEADERS
    // ======================================================

    const headers = {

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
      `?select=id,email,language,timezone,active` +
      `&email=eq.${encodeURIComponent(email)}` +
      `&limit=1`;


    const lookupResponse =
      await fetch(
        lookupUrl,
        {
          method: "GET",
          headers
        }
      );


    const lookupText =
      await lookupResponse.text();


    if (!lookupResponse.ok) {

      console.error(
        "Universe139 lookup failed:",
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


    let existing = [];


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
          "Supabase returned invalid data."

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

              ...headers,

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


      if (!updateResponse.ok) {

        console.error(
          "Universe139 update failed:",
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
    // CREATE UNSUBSCRIBE TOKEN
    // ======================================================

    const unsubscribeToken =
      crypto
        .randomBytes(32)
        .toString("hex");


    const unsubscribeTokenHash =
      crypto
        .createHash("sha256")
        .update(unsubscribeToken)
        .digest("hex");


    // ======================================================
    // CREATE RANDOM ORDER OF 500 MESSAGES
    //
    // 0 ... 499
    // ======================================================

    const messageOrder =
      Array.from(
        { length: 500 },
        (_, index) =>
          index
      );


    for (
      let i =
        messageOrder.length - 1;

      i > 0;

      i--
    ) {

      const j =
        crypto.randomInt(
          0,
          i + 1
        );


      const temp =
        messageOrder[i];


      messageOrder[i] =
        messageOrder[j];


      messageOrder[j] =
        temp;

    }


    // ======================================================
    // FIRST MESSAGE POSITION
    // ======================================================

    const messagePosition =
      0;


    // No message has been sent yet.
    const lastSentDate =
      null;


    // ======================================================
    // INSERT NEW SUBSCRIBER
    // ======================================================

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
        messagePosition,

      last_sent_date:
        lastSentDate

    };


    console.log(
      "Universe139: inserting subscriber."
    );


    const insertResponse =
      await fetch(
        tableUrl,
        {

          method:
            "POST",

          headers: {

            ...headers,

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

    if (!insertResponse.ok) {

      console.error(
        "Universe139 INSERT failed:",
        insertResponse.status,
        insertText
      );


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

    const verifyResponse =
      await fetch(

        `${tableUrl}` +
        `?select=id,email,language,timezone,active` +
        `&email=eq.${encodeURIComponent(email)}` +
        `&limit=1`,

        {

          method:
            "GET",

          headers

        }

      );


    const verifyText =
      await verifyResponse.text();


    if (!verifyResponse.ok) {

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
          "Supabase did not confirm the subscriber."

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

  }


  catch (error) {

    console.error(
      "Universe139 subscription error:",
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
