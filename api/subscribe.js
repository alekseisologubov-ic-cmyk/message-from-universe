// ==========================================================
// UNIVERSE139 SUBSCRIBE API - DIAGNOSTIC VERSION
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


  if (req.method === "OPTIONS") {

    return res.status(200).json({
      ok: true
    });

  }


  if (req.method !== "POST") {

    return res.status(405).json({
      ok: false,
      error: "Method not allowed. Use POST."
    });

  }


  try {

    // ======================================================
    // ENVIRONMENT
    // ======================================================

    const supabaseUrl =
      String(
        process.env.SUPABASE_URL || ""
      ).trim().replace(/\/+$/, "");


    const supabaseKey =
      String(
        process.env.SUPABASE_SERVICE_ROLE_KEY || ""
      ).trim();


    // ------------------------------------------------------
    // CHECK VARIABLES
    // ------------------------------------------------------

    if (!supabaseUrl) {

      return res.status(500).json({
        ok: false,
        error: "SUPABASE_URL is missing."
      });

    }


    if (!supabaseKey) {

      return res.status(500).json({
        ok: false,
        error: "SUPABASE_SERVICE_ROLE_KEY is missing."
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
          JSON.parse(body);

      } catch {

        return res.status(400).json({
          ok: false,
          error: "Invalid JSON request."
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


    const emailValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      );


    if (!emailValid) {

      return res.status(400).json({
        ok: false,
        error: "Please enter a valid email address."
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
    // SUPABASE URL
    // ======================================================

    const table =
      "universe139_subscribers";


    const lookupUrl =
      `${supabaseUrl}/rest/v1/${table}` +
      `?select=id,email,language,timezone,active` +
      `&email=eq.${encodeURIComponent(email)}` +
      `&limit=1`;


    console.log(
      "Universe139 Supabase URL:",
      supabaseUrl
    );


    console.log(
      "Universe139 lookup URL:",
      lookupUrl
    );


    // ======================================================
    // SUPABASE LOOKUP
    // ======================================================

    let lookupResponse;


    try {

      lookupResponse =
        await fetch(
          lookupUrl,
          {

            method: "GET",

            headers: {

              apikey:
                supabaseKey,

              Authorization:
                `Bearer ${supabaseKey}`,

              Accept:
                "application/json"

            }

          }
        );

    } catch (networkError) {

      console.error(
        "Universe139 Supabase NETWORK ERROR:",
        networkError
      );


      return res.status(502).json({

        ok: false,

        error:
          "Could not connect to Supabase.",

        diagnostic:
          networkError?.message ||
          String(networkError)

      });

    }


    // ======================================================
    // READ SUPABASE RESPONSE
    // ======================================================

    const lookupText =
      await lookupResponse.text();


    console.log(
      "Universe139 Supabase HTTP:",
      lookupResponse.status
    );


    console.log(
      "Universe139 Supabase response:",
      lookupText
    );


    // ======================================================
    // SUPABASE ERROR
    // ======================================================

    if (!lookupResponse.ok) {

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


    // ======================================================
    // PARSE RESULT
    // ======================================================

    let existing = [];


    try {

      existing =
        lookupText
          ? JSON.parse(lookupText)
          : [];

    } catch {

      return res.status(502).json({

        ok: false,

        error:
          "Supabase returned invalid JSON.",

        response:
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


      const updateUrl =
        `${supabaseUrl}/rest/v1/${table}` +
        `?id=eq.${encodeURIComponent(
          subscriber.id
        )}`;


      let updateResponse;


      try {

        updateResponse =
          await fetch(
            updateUrl,
            {

              method: "PATCH",

              headers: {

                apikey:
                  supabaseKey,

                Authorization:
                  `Bearer ${supabaseKey}`,

                "Content-Type":
                  "application/json",

                Prefer:
                  "return=minimal"

              },

              body:
                JSON.stringify({

                  language,

                  timezone,

                  active: true

                })

            }
          );

      } catch (error) {

        console.error(
          "Universe139 Supabase UPDATE network error:",
          error
        );


        return res.status(502).json({

          ok: false,

          error:
            "Could not connect to Supabase while updating your subscription.",

          diagnostic:
            error?.message ||
            String(error)

        });

      }


      const updateText =
        await updateResponse.text();


      if (!updateResponse.ok) {

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

        ok: true,

        subscribed: true,

        alreadySubscribed: true,

        message:
          "You are already subscribed."

      });

    }


    // ======================================================
    // NEW SUBSCRIBER
    // ======================================================

    const insertUrl =
      `${supabaseUrl}/rest/v1/${table}`;


    let insertResponse;


    try {

      insertResponse =
        await fetch(
          insertUrl,
          {

            method: "POST",

            headers: {

              apikey:
                supabaseKey,

              Authorization:
                `Bearer ${supabaseKey}`,

              "Content-Type":
                "application/json",

              Prefer:
                "return=representation"

            },

            body:
              JSON.stringify({

                email,

                language,

                timezone,

                active: true

              })

          }
        );

    } catch (error) {

      console.error(
        "Universe139 Supabase INSERT network error:",
        error
      );


      return res.status(502).json({

        ok: false,

        error:
          "Could not connect to Supabase while saving the subscription.",

        diagnostic:
          error?.message ||
          String(error)

      });

    }


    const insertText =
      await insertResponse.text();


    if (!insertResponse.ok) {

      return res.status(502).json({

        ok: false,

        error:
          "Supabase rejected the subscription.",

        supabaseStatus:
          insertResponse.status,

        supabaseResponse:
          insertText

      });

    }


    // ======================================================
    // SUCCESS
    // ======================================================

    console.log(
      "Universe139 subscription saved:",
      email
    );


    return res.status(200).json({

      ok: true,

      subscribed: true,

      alreadySubscribed: false,

      message:
        "Subscription saved successfully."

    });


  } catch (error) {

    console.error(
      "Universe139 subscribe fatal error:",
      error
    );


    return res.status(500).json({

      ok: false,

      error:
        error?.message ||
        "Subscription request failed.",

      diagnostic:
        error?.stack ||
        String(error)

    });

  }

}
