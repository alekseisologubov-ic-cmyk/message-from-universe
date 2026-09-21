// ==========================================================
// UNIVERSE139 SUBSCRIPTION API
//
// Route:
// POST /api/subscribe
//
// Database:
// public.universe139_subscribers
//
// Required Vercel environment variables:
//
// SUPABASE_URL
// SUPABASE_SERVICE_ROLE_KEY
//
// Optional:
// SUPABASE_SECRET_KEY
//
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
    "no-store, no-cache, must-revalidate"
  );


  // --------------------------------------------------------
  // ALLOW OPTIONS
  // --------------------------------------------------------

  if (req.method === "OPTIONS") {

    return res
      .status(200)
      .json({
        ok: true
      });

  }


  // --------------------------------------------------------
  // POST ONLY
  // --------------------------------------------------------

  if (req.method !== "POST") {

    return res
      .status(405)
      .json({

        ok: false,

        error:
          "Method not allowed. Use POST."

      });

  }


  try {

    // ======================================================
    // ENVIRONMENT
    // ======================================================

    const supabaseUrl =
      String(
        process.env.SUPABASE_URL || ""
      ).replace(
        /\/+$/,
        ""
      );


    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.SUPABASE_SECRET_KEY ||
      "";


    if (!supabaseUrl) {

      console.error(
        "Universe139: SUPABASE_URL missing."
      );

      return res
        .status(500)
        .json({

          ok: false,

          error:
            "SUPABASE_URL is missing in Vercel."

        });

    }


    if (!supabaseKey) {

      console.error(
        "Universe139: Supabase server key missing."
      );

      return res
        .status(500)
        .json({

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
          JSON.parse(
            body
          );

      } catch {

        return res
          .status(400)
          .json({

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
        body.timezone || "UTC"
      ).trim() ||
      "UTC";


    // ======================================================
    // EMAIL VALIDATION
    // ======================================================

    const validEmail =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(
          email
        );


    if (!validEmail) {

      return res
        .status(400)
        .json({

          ok: false,

          error:
            "Please enter a valid email address."

        });

    }


    // ======================================================
    // SUPABASE TABLE
    //
    // This is the table we created.
    // ======================================================

    const table =
      "universe139_subscribers";


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
    // CHECK EXISTING EMAIL
    // ======================================================

    const lookupUrl =
      `${supabaseUrl}/rest/v1/${table}` +
      `?select=id,email,language,timezone,active` +
      `&email=eq.${encodeURIComponent(email)}` +
      `&limit=1`;


    const lookupResponse =
      await fetch(
        lookupUrl,
        {
          method:
            "GET",

          headers
        }
      );


    const lookupText =
      await lookupResponse.text();


    if (!lookupResponse.ok) {

      console.error(
        "Universe139 Supabase lookup error:",
        lookupResponse.status,
        lookupText
      );


      return res
        .status(502)
        .json({

          ok: false,

          error:
            "Unable to check the subscription database.",

          details:
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

      existing = [];

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
      // Reactivate / update language
      // ----------------------------------------------------

      const updateUrl =
        `${supabaseUrl}/rest/v1/${table}` +
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


      const updateText =
        await updateResponse.text();


      if (!updateResponse.ok) {

        console.error(
          "Universe139 Supabase update error:",
          updateResponse.status,
          updateText
        );


        return res
          .status(502)
          .json({

            ok: false,

            error:
              "Unable to update your subscription.",

            details:
              updateText

          });

      }


      console.log(
        "Universe139 existing subscriber updated:",
        email
      );


      return res
        .status(200)
        .json({

          ok: true,

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

    const insertUrl =
      `${supabaseUrl}/rest/v1/${table}`;


    const insertResponse =
      await fetch(
        insertUrl,
        {

          method:
            "POST",

          headers: {

            ...headers,

            Prefer:
              "return=representation"

          },

          body:
            JSON.stringify({

              email,

              language,

              timezone,

              active:
                true

            })

        }
      );


    const insertText =
      await insertResponse.text();


    if (!insertResponse.ok) {

      console.error(
        "Universe139 Supabase insert error:",
        insertResponse.status,
        insertText
      );


      // ----------------------------------------------------
      // Duplicate race condition
      // ----------------------------------------------------

      if (
        insertResponse.status === 409 ||
        insertText.includes(
          "duplicate"
        ) ||
        insertText.includes(
          "unique"
        )
      ) {

        return res
          .status(200)
          .json({

            ok: true,

            subscribed:
              true,

            alreadySubscribed:
              true,

            message:
              "You are already subscribed."

          });

      }


      return res
        .status(502)
        .json({

          ok: false,

          error:
            "Unable to save your subscription.",

          details:
            insertText

        });

    }


    // ======================================================
    // SUCCESS
    // ======================================================

    console.log(
      "Universe139 new subscriber:",
      email,
      language,
      timezone
    );


    return res
      .status(200)
      .json({

        ok: true,

        subscribed:
          true,

        alreadySubscribed:
          false,

        message:
          "Subscription saved successfully."

      });


  } catch (error) {

    console.error(
      "Universe139 /api/subscribe error:",
      error
    );


    return res
      .status(500)
      .json({

        ok: false,

        error:
          error?.message ||
          "Subscription request failed."

      });

  }

}
