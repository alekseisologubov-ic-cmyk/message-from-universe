// ==========================================================
// Universe139 Subscription API
//
// POST /api/subscribe
//
// Saves / reactivates a subscriber in:
// public.universe139_subscribers
//
// Required Vercel environment variables:
//   SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY
//
// Optional:
//   SUPABASE_SECRET_KEY
//
// Request:
// {
//   "email": "user@example.com",
//   "language": "en",
//   "timezone": "Europe/Tallinn"
// }
//
// Response:
// {
//   "ok": true,
//   "alreadySubscribed": false
// }
// ==========================================================

function getSupabaseKey() {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY ||
    ""
  );
}


function isValidEmail(email) {
  return (
    typeof email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  );
}


export default async function handler(req, res) {

  // --------------------------------------------------------
  // POST only
  // --------------------------------------------------------

  if (req.method !== "POST") {

    return res
      .status(405)
      .json({
        ok: false,
        error: "Method not allowed."
      });

  }


  try {

    // ------------------------------------------------------
    // Read request body safely
    // ------------------------------------------------------

    let body = req.body || {};

    if (typeof body === "string") {

      try {
        body = JSON.parse(body);
      } catch {

        return res
          .status(400)
          .json({
            ok: false,
            error: "Invalid request body."
          });

      }

    }


    // ------------------------------------------------------
    // Email
    // ------------------------------------------------------

    const email =
      String(
        body.email || ""
      )
        .trim()
        .toLowerCase();


    if (!isValidEmail(email)) {

      return res
        .status(400)
        .json({
          ok: false,
          error: "Invalid email address."
        });

    }


    // ------------------------------------------------------
    // Language
    // ------------------------------------------------------

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


    // ------------------------------------------------------
    // Timezone
    //
    // Browser can send the visitor's local timezone.
    // Falls back to UTC if missing.
    // ------------------------------------------------------

    const timezone =
      String(
        body.timezone || "UTC"
      ).trim() || "UTC";


    // ------------------------------------------------------
    // Environment variables
    // ------------------------------------------------------

    const supabaseUrl =
      String(
        process.env.SUPABASE_URL || ""
      ).replace(
        /\/$/,
        ""
      );

    const supabaseKey =
      getSupabaseKey();


    if (
      !supabaseUrl ||
      !supabaseKey
    ) {

      console.error(
        "Universe139 subscription: Supabase environment variables are missing."
      );

      return res
        .status(500)
        .json({
          ok: false,
          error:
            "Subscription database is not configured."
        });

    }


    // ------------------------------------------------------
    // Common REST headers
    // ------------------------------------------------------

    const headers = {
      apikey: supabaseKey,

      Authorization:
        `Bearer ${supabaseKey}`,

      "Content-Type":
        "application/json",

      Accept:
        "application/json"
    };


    // ------------------------------------------------------
    // TABLE
    // IMPORTANT:
    // This matches the table we created in Supabase.
    // ------------------------------------------------------

    const table =
      "universe139_subscribers";


    // ------------------------------------------------------
    // Find existing subscriber
    // ------------------------------------------------------

    const findUrl =
      `${supabaseUrl}/rest/v1/${table}` +
      `?select=*` +
      `&email=eq.${encodeURIComponent(email)}` +
      `&limit=1`;


    const checkResponse =
      await fetch(
        findUrl,
        {
          method: "GET",
          headers
        }
      );


    const checkText =
      await checkResponse.text();


    if (!checkResponse.ok) {

      console.error(
        "Universe139 subscription lookup failed:",
        checkResponse.status,
        checkText
      );

      throw new Error(
        `Supabase lookup failed: ${checkText}`
      );

    }


    let existing = [];

    try {

      existing =
        checkText
          ? JSON.parse(checkText)
          : [];

    } catch {

      existing = [];

    }


    // ------------------------------------------------------
    // Existing subscriber
    // ------------------------------------------------------

    if (
      Array.isArray(existing) &&
      existing.length > 0
    ) {

      const existingSubscriber =
        existing[0];

      const existingId =
        existingSubscriber.id;


      const updateUrl =
        `${supabaseUrl}/rest/v1/${table}` +
        `?id=eq.${encodeURIComponent(existingId)}`;


      const updateResponse =
        await fetch(
          updateUrl,
          {
            method: "PATCH",

            headers: {
              ...headers,

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


      const updateText =
        await updateResponse.text();


      if (!updateResponse.ok) {

        console.error(
          "Universe139 subscription update failed:",
          updateResponse.status,
          updateText
        );

        throw new Error(
          `Supabase update failed: ${updateText}`
        );

      }


      return res
        .status(200)
        .json({

          ok: true,

          alreadySubscribed:
            true

        });

    }


    // ------------------------------------------------------
    // New subscriber
    // ------------------------------------------------------

    const insertUrl =
      `${supabaseUrl}/rest/v1/${table}`;


    const insertResponse =
      await fetch(
        insertUrl,
        {
          method: "POST",

          headers: {
            ...headers,

            Prefer:
              "return=minimal"
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


    const insertText =
      await insertResponse.text();


    if (!insertResponse.ok) {

      console.error(
        "Universe139 subscription insert failed:",
        insertResponse.status,
        insertText
      );

      // --------------------------------------------------
      // Handle duplicate race condition
      // --------------------------------------------------

      if (
        insertResponse.status === 409 ||
        insertText.includes(
          "duplicate"
        )
      ) {

        return res
          .status(200)
          .json({

            ok: true,

            alreadySubscribed:
              true

          });

      }


      throw new Error(
        `Supabase insert failed: ${insertText}`
      );

    }


    // ------------------------------------------------------
    // Success
    // ------------------------------------------------------

    return res
      .status(200)
      .json({

        ok: true,

        alreadySubscribed:
          false

      });


  } catch (error) {

    console.error(
      "Universe139 subscribe error:",
      error
    );


    return res
      .status(500)
      .json({

        ok: false,

        error:
          "Unable to save your subscription."

      });

  }

}
