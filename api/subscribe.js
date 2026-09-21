// ==========================================================
// UNIVERSE139 - SUBSCRIBE API
//
// File:
// api/subscribe.js
//
// Endpoint:
// POST /api/subscribe
//
// Supabase:
// public.universe139_subscribers
//
// REQUIRED VERCEL VARIABLES:
//
// SUPABASE_URL
// SUPABASE_SECRET_KEY
//
// IMPORTANT:
// SUPABASE_SECRET_KEY must be the new Supabase secret key:
//
// sb_secret_...
//
// Do NOT put the secret key in script.js.
// Do NOT put it in GitHub.
// ==========================================================


// ==========================================================
// MAIN HANDLER
// ==========================================================

export default async function handler(req, res) {

  // --------------------------------------------------------
  // RESPONSE HEADERS
  // --------------------------------------------------------

  res.setHeader(
    "Content-Type",
    "application/json; charset=utf-8"
  );

  res.setHeader(
    "Cache-Control",
    "no-store"
  );


  // --------------------------------------------------------
  // CORS / PREFLIGHT
  // --------------------------------------------------------

  if (req.method === "OPTIONS") {

    return res.status(200).json({
      ok: true
    });

  }


  // --------------------------------------------------------
  // POST ONLY
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

    const supabaseUrl =
      String(
        process.env.SUPABASE_URL || ""
      )
        .trim()
        .replace(
          /\/+$/,
          ""
        );


    const supabaseSecretKey =
  String(
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  ).trim();


    // ======================================================
    // CHECK CONFIGURATION
    // ======================================================

    if (!supabaseUrl) {

      console.error(
        "Universe139: SUPABASE_URL is missing."
      );

      return res.status(500).json({

        ok: false,

        error:
          "SUPABASE_URL is not configured in Vercel."

      });

    }


    if (!supabaseSecretKey) {

      console.error(
        "Universe139: SUPABASE_SECRET_KEY is missing."
      );

      return res.status(500).json({

        ok: false,

        error:
          "SUPABASE_SECRET_KEY is not configured in Vercel."

      });

    }


    // ======================================================
    // BASIC URL VALIDATION
    // ======================================================

    let parsedSupabaseUrl;

    try {

      parsedSupabaseUrl =
        new URL(
          supabaseUrl
        );

    } catch {

      return res.status(500).json({

        ok: false,

        error:
          "SUPABASE_URL is invalid."

      });

    }


    if (
      parsedSupabaseUrl.protocol !==
      "https:"
    ) {

      return res.status(500).json({

        ok: false,

        error:
          "SUPABASE_URL must use HTTPS."

      });

    }


    // ======================================================
    // REQUEST BODY
    // ======================================================

    let body =
      req.body || {};


    if (
      typeof body ===
      "string"
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


    const emailIsValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(
          email
        );


    if (!emailIsValid) {

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
        body.language ||
        "en"
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
      )
        .trim() ||
      "Europe/Tallinn";


    // ======================================================
    // TABLE
    // ======================================================

    const table =
      "universe139_subscribers";


    // ======================================================
    // SUPABASE REST BASE
    // ======================================================

    const restBase =
      `${supabaseUrl}/rest/v1`;


    const tableUrl =
      `${restBase}/${table}`;


    // ======================================================
    // IMPORTANT SUPABASE HEADERS
    //
    // The new sb_secret key belongs in "apikey".
    //
    // We intentionally DO NOT send:
    //
    // Authorization: Bearer sb_secret_...
    //
    // because the new secret key is not a JWT.
    // ======================================================

    const supabaseHeaders = {

      "apikey":
        supabaseSecretKey,

      "Content-Type":
        "application/json",

      "Accept":
        "application/json"

    };


    // ======================================================
    // TEST SUPABASE CONNECTION
    //
    // First perform a simple request to the table.
    // ======================================================

    const lookupUrl =
      `${tableUrl}` +
      `?select=id,email,language,timezone,active` +
      `&email=eq.${encodeURIComponent(email)}` +
      `&limit=1`;


    console.log(
      "Universe139: checking Supabase subscriber..."
    );


    let lookupResponse;


    try {

      lookupResponse =
        await fetch(
          lookupUrl,
          {

            method:
              "GET",

            headers:
              supabaseHeaders

          }
        );

    } catch (error) {

      console.error(
        "Universe139: Supabase connection failed:",
        error
      );


      return res.status(502).json({

        ok: false,

        error:
          "Could not connect to Supabase.",

        diagnostic:
          error?.message ||
          String(error)

      });

    }


    const lookupText =
      await lookupResponse.text();


    // ======================================================
    // SUPABASE LOOKUP ERROR
    // ======================================================

    if (
      !lookupResponse.ok
    ) {

      console.error(
        "Universe139: Supabase lookup rejected.",
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


    // ======================================================
    // PARSE LOOKUP
    // ======================================================

    let existingSubscribers;


    try {

      existingSubscribers =
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
      Array.isArray(
        existingSubscribers
      ) &&
      existingSubscribers.length > 0
    ) {

      const subscriber =
        existingSubscribers[0];


      // ----------------------------------------------------
      // Update existing subscriber
      // ----------------------------------------------------

      const updateUrl =
        `${tableUrl}` +
        `?id=eq.${encodeURIComponent(
          subscriber.id
        )}`;


      let updateResponse;


      try {

        updateResponse =
          await fetch(
            updateUrl,
            {

              method:
                "PATCH",

              headers: {

                ...supabaseHeaders,

                "Prefer":
                  "return=minimal"

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

      } catch (error) {

        console.error(
          "Universe139: Supabase update connection failed:",
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


      if (
        !updateResponse.ok
      ) {

        console.error(
          "Universe139: Supabase update rejected.",
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


      console.log(
        "Universe139: subscriber updated."
      );


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

    const insertPayload = {

      email,

      language,

      timezone,

      active:
        true

    };


    let insertResponse;


    try {

      insertResponse =
        await fetch(
          tableUrl,
          {

            method:
              "POST",

            headers: {

              ...supabaseHeaders,

              "Prefer":
                "return=representation"

            },

            body:
              JSON.stringify(
                insertPayload
              )

          }
        );

    } catch (error) {

      console.error(
        "Universe139: Supabase insert connection failed:",
        error
      );


      return res.status(502).json({

        ok: false,

        error:
          "Could not connect to Supabase while saving your subscription.",

        diagnostic:
          error?.message ||
          String(error)

      });

    }


    const insertText =
      await insertResponse.text();


    // ======================================================
    // INSERT ERROR
    // ======================================================

    if (
      !insertResponse.ok
    ) {

      console.error(
        "Universe139: Supabase insert rejected.",
        insertResponse.status,
        insertText
      );


      // -----------------------------------------------
      // Duplicate
      // -----------------------------------------------

      const duplicate =
        insertResponse.status === 409 ||
        /duplicate|unique/i.test(
          insertText
        );


      if (duplicate) {

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
    // SUCCESS
    // ======================================================

    let insertedSubscriber =
      null;


    try {

      const parsed =
        insertText
          ? JSON.parse(
              insertText
            )
          : null;


      if (
        Array.isArray(parsed) &&
        parsed.length > 0
      ) {

        insertedSubscriber =
          parsed[0];

      }

    } catch {

      insertedSubscriber =
        null;

    }


    console.log(
      "Universe139: subscription saved."
    );


    return res.status(200).json({

      ok:
        true,

      subscribed:
        true,

      alreadySubscribed:
        false,

      message:
        "Subscription saved successfully.",

      subscriberId:
        insertedSubscriber?.id ||
        null

    });


  } catch (error) {

    // ======================================================
    // FINAL ERROR
    // ======================================================

    console.error(
      "Universe139: fatal subscribe error:",
      error
    );


    return res.status(500).json({

      ok:
        false,

      error:
        error?.message ||
        "Subscription request failed.",

      diagnostic:
        error?.stack ||
        String(error)

    });

  }

}
