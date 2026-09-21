// ==========================================================
// UNIVERSE139 SUBSCRIBE
// Uses Supabase Publishable Key + RLS INSERT policy
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


  if (req.method !== "POST") {

    return res.status(405).json({
      ok: false,
      error: "Method not allowed. Use POST."
    });

  }


  try {

    const supabaseUrl =
      String(
        process.env.SUPABASE_URL || ""
      )
        .trim()
        .replace(/\/+$/, "");


    const publishableKey =
      String(
        process.env.SUPABASE_PUBLISHABLE_KEY || ""
      )
        .trim();


    if (!supabaseUrl) {

      return res.status(500).json({
        ok: false,
        error:
          "SUPABASE_URL is missing."
      });

    }


    if (!publishableKey) {

      return res.status(500).json({
        ok: false,
        error:
          "SUPABASE_PUBLISHABLE_KEY is missing."
      });

    }


    let body =
      req.body || {};


    if (
      typeof body === "string"
    ) {

      body =
        JSON.parse(body);

    }


    const email =
      String(
        body.email || ""
      )
        .trim()
        .toLowerCase();


    const language =
      String(
        body.language || "en"
      )
        .trim()
        .toLowerCase();


    const timezone =
      String(
        body.timezone ||
        "Europe/Tallinn"
      )
        .trim();


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


    const allowedLanguages = [
      "en",
      "es",
      "zh",
      "ru",
      "hi",
      "th"
    ];


    const safeLanguage =
      allowedLanguages.includes(language)
        ? language
        : "en";


    const tableUrl =
      `${supabaseUrl}/rest/v1/universe139_subscribers`;


    // ------------------------------------------------------
    // Generate required fields
    // ------------------------------------------------------

    const tokenBytes =
      new Uint8Array(32);

    crypto
      .getRandomValues(tokenBytes);


    const unsubscribeToken =
      Array.from(
        tokenBytes
      )
        .map(
          byte =>
            byte
              .toString(16)
              .padStart(2, "0")
        )
        .join("");


    const encoder =
      new TextEncoder();


    const hashBuffer =
      await crypto.subtle.digest(
        "SHA-256",
        encoder.encode(
          unsubscribeToken
        )
      );


    const hashArray =
      Array.from(
        new Uint8Array(hashBuffer)
      );


    const unsubscribeTokenHash =
      hashArray
        .map(
          byte =>
            byte
              .toString(16)
              .padStart(2, "0")
        )
        .join("");


    // ------------------------------------------------------
    // 500-message sequence
    // ------------------------------------------------------

    const messageOrder =
      Array.from(
        { length: 500 },
        (_, index) =>
          index
      );


    // Fisher-Yates shuffle

    for (
      let i =
        messageOrder.length - 1;

      i > 0;

      i--
    ) {

      const random =
        Math.floor(
          Math.random() *
          (i + 1)
        );


      const temp =
        messageOrder[i];


      messageOrder[i] =
        messageOrder[random];


      messageOrder[random] =
        temp;

    }


    // ------------------------------------------------------
    // INSERT
    // ------------------------------------------------------

    const response =
      await fetch(
        tableUrl,
        {

          method:
            "POST",

          headers: {

            apikey:
              publishableKey,

            "Content-Type":
              "application/json",

            Accept:
              "application/json",

            Prefer:
              "return=representation"

          },

          body:
            JSON.stringify({

              email,

              language:
                safeLanguage,

              timezone,

              active:
                true,

              unsubscribe_token_hash:
                unsubscribeTokenHash,

              message_order:
                messageOrder,

              message_position:
                0

            })

        }
      );


    const responseText =
      await response.text();


    // ------------------------------------------------------
    // DUPLICATE EMAIL
    // ------------------------------------------------------

    if (
      response.status === 409
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


    // ------------------------------------------------------
    // SUPABASE ERROR
    // ------------------------------------------------------

    if (
      !response.ok
    ) {

      console.error(
        "Universe139 Supabase error:",
        response.status,
        responseText
      );


      return res.status(502).json({

        ok:
          false,

        error:
          "Supabase rejected the subscription.",

        supabaseStatus:
          response.status,

        supabaseResponse:
          responseText

      });

    }


    // ------------------------------------------------------
    // SUCCESS
    // ------------------------------------------------------

    return res.status(200).json({

      ok:
        true,

      subscribed:
        true,

      alreadySubscribed:
        false,

      message:
        "You are subscribed. Your daily messages will begin soon.",

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
