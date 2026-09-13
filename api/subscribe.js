export default async function handler(req, res) {

  if (req.method !== "POST") {

    return res
      .status(405)
      .json({
        error: "Method not allowed."
      });

  }

  try {

    const body =
      req.body || {};

    const email =
      String(
        body.email || ""
      )
        .trim()
        .toLowerCase();

    const language =
      String(
        body.language || "en"
      );

    const emailIsValid =
      email.length >= 5 &&
      email.includes("@") &&
      email.lastIndexOf(".") >
        email.indexOf("@") + 1 &&
      !email.endsWith(".");

    if (!emailIsValid) {

      return res
        .status(400)
        .json({
          error:
            "Invalid email address."
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

    const selectedLanguage =
      allowedLanguages.includes(language)
        ? language
        : "en";

    const supabaseUrl =
      process.env.SUPABASE_URL;

    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (
      !supabaseUrl ||
      !supabaseKey
    ) {

      console.error(
        "Supabase environment variables are missing."
      );

      return res
        .status(500)
        .json({
          error:
            "Subscription database is not configured."
        });

    }

    // Check whether email already exists
    const checkResponse =
      await fetch(
        `${supabaseUrl}/rest/v1/subscribers?select=id,active&email=eq.${encodeURIComponent(email)}&limit=1`,
        {
          headers: {
            apikey:
              supabaseKey,

            Authorization:
              `Bearer ${supabaseKey}`
          }
        }
      );

    if (!checkResponse.ok) {

      throw new Error(
        await checkResponse.text()
      );

    }

    const existing =
      await checkResponse.json();

    if (
      Array.isArray(existing) &&
      existing.length > 0
    ) {

      // If already exists, just make sure
      // the subscription is active and update language.
      const existingId =
        existing[0].id;

      const updateResponse =
        await fetch(
          `${supabaseUrl}/rest/v1/subscribers?id=eq.${existingId}`,
          {

            method:
              "PATCH",

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

                language:
                  selectedLanguage,

                active:
                  true

              })

          }
        );

      if (!updateResponse.ok) {

        throw new Error(
          await updateResponse.text()
        );

      }

      return res
        .status(200)
        .json({

          ok:
            true,

          alreadySubscribed:
            true

        });

    }

    // New subscriber
    const insertResponse =
      await fetch(
        `${supabaseUrl}/rest/v1/subscribers`,
        {

          method:
            "POST",

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

              email:
                email,

              language:
                selectedLanguage,

              active:
                true

            })

        }
      );

    if (!insertResponse.ok) {

      throw new Error(
        await insertResponse.text()
      );

    }

    return res
      .status(200)
      .json({

        ok:
          true,

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

        error:
          "Unable to save your subscription."

      });

  }

}
