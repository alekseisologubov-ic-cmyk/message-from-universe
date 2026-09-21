// ==========================================================
// UNIVERSE139 - SUBSCRIBE API
// ==========================================================

import crypto from "crypto";


// ==========================================================
// CONFIG
// ==========================================================

const TABLE =
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
// HANDLER
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

    const requestedLanguage =
      String(
        body.language || "en"
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
      String(
        body.timezone ||
        "Europe/Tallinn"
      ).trim() ||
      "Europe/Tallinn";


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
    // CREATE RANDOM ORDER OF ALL 500 MESSAGES
    //
    // 0 ... 499
    // ======================================================

    const messageOrder =
      Array.from(
        { length: 500 },
        (_, index) => index
      );


    // Fisher-Yates shuffle

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
    // INSERT
    // ======================================================

    const tableUrl =
      `${supabaseUrl}/rest/v1/${TABLE}`;


    const headers = {

      apikey:
        supabaseKey,

      Authorization:
        `Bearer ${supabaseKey}`,

      "Content-Type":
        "application/json",

      Accept:
        "application/json",

      Prefer:
        "return=representation"

    };


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
      "Universe139: inserting subscriber",
      email
    );


    const insertResponse =
      await fetch(
        tableUrl,
        {

          method:
            "POST",

          headers,

          body:
            JSON.stringify(
              insertPayload
            )

        }
      );


    const insertText =
      await insertResponse.text();


    // ======================================================
    // INSERT FAILED
    // ======================================================

    if (!insertResponse.ok) {

      console.error(
        "Universe139 Supabase INSERT:",
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
    // PARSE INSERT RESULT
    // ======================================================

    let insertedRow =
      null;


    try {

      const parsed =
        insertText
          ? JSON.parse(
              insertText
            )
          : [];


      if (
        Array.isArray(parsed) &&
        parsed.length > 0
      ) {

        insertedRow =
          parsed[0];

      }

    } catch {

      insertedRow =
        null;

    }


    // ======================================================
    // VERIFY
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

          headers

        }
      );


    const verifyText =
      await verifyResponse.text();


    if (!verifyResponse.ok) {

      console.error(
        "Universe139 verification:",
        verifyResponse.status,
        verifyText
      );


      return res.status(502).json({

        ok:
          false,

        error:
          "Subscriber was inserted but could not be verified.",

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
        verifiedRows[0],

      unsubscribeToken:
        unsubscribeToken

    });


  } catch (error) {

    console.error(
      "Universe139 subscribe error:",
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
Commit changes...
