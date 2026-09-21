// ==========================================================
// UNIVERSE139 SUBSCRIBE
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

    const supabaseKey =
      String(
        process.env.SUPABASE_SECRET_KEY || ""
      )
        .trim();

    if (!supabaseUrl) {
      return res.status(500).json({
        ok: false,
        error: "SUPABASE_URL is missing."
      });
    }

    if (!supabaseKey) {
      return res.status(500).json({
        ok: false,
        error: "SUPABASE_SECRET_KEY is missing."
      });
    }

    let body = req.body || {};

    if (typeof body === "string") {
      body = JSON.parse(body);
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
        body.timezone || "Europe/Tallinn"
      )
        .trim();

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return res.status(400).json({
        ok: false,
        error: "Please enter a valid email address."
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

    // NEW Supabase secret key:
    // apikey header only.
    //
    // Do NOT use Authorization: Bearer
    // with sb_secret_... because the new secret
    // keys are not JWTs.
    const headers = {
      apikey: supabaseKey,
      "Content-Type": "application/json",
      Accept: "application/json"
    };

    // ------------------------------------------------------
    // Check for existing subscriber
    // ------------------------------------------------------

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
        "Universe139 Supabase lookup:",
        lookupResponse.status,
        lookupText
      );

      return res.status(502).json({
        ok: false,
        error: "Supabase rejected the database request.",
        supabaseStatus: lookupResponse.status,
        supabaseResponse: lookupText
      });
    }

    let existing = [];

    try {
      existing =
        lookupText
          ? JSON.parse(lookupText)
          : [];
    } catch {
      return res.status(502).json({
        ok: false,
        error: "Supabase returned invalid JSON.",
        supabaseResponse: lookupText
      });
    }

    // ------------------------------------------------------
    // Existing subscriber
    // ------------------------------------------------------

    if (
      Array.isArray(existing) &&
      existing.length > 0
    ) {

      const id =
        existing[0].id;

      const updateResponse =
        await fetch(
          `${tableUrl}?id=eq.${encodeURIComponent(id)}`,
          {
            method: "PATCH",
            headers: {
              ...headers,
              Prefer: "return=representation"
            },
            body: JSON.stringify({
              language: safeLanguage,
              timezone,
              active: true
            })
          }
        );

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

    // ------------------------------------------------------
    // New subscriber
    // ------------------------------------------------------

    const insertResponse =
      await fetch(
        tableUrl,
        {
          method: "POST",
          headers: {
            ...headers,
            Prefer: "return=representation"
          },
          body: JSON.stringify({
            email,
            language: safeLanguage,
            timezone,
            active: true
          })
        }
      );

    const insertText =
      await insertResponse.text();

    if (!insertResponse.ok) {

      console.error(
        "Universe139 Supabase insert:",
        insertResponse.status,
        insertText
      );

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

    // ------------------------------------------------------
    // Verify it was actually saved
    // ------------------------------------------------------

    const verifyResponse =
      await fetch(
        `${tableUrl}` +
        `?select=id,email,language,timezone,active` +
        `&email=eq.${encodeURIComponent(email)}` +
        `&limit=1`,
        {
          method: "GET",
          headers
        }
      );

    const verifyText =
      await verifyResponse.text();

    if (!verifyResponse.ok) {

      return res.status(502).json({
        ok: false,
        error:
          "Subscriber was created but could not be verified.",
        supabaseStatus:
          verifyResponse.status,
        supabaseResponse:
          verifyText
      });
    }

    let verified = [];

    try {
      verified =
        verifyText
          ? JSON.parse(verifyText)
          : [];
    } catch {
      verified = [];
    }

    if (
      !Array.isArray(verified) ||
      verified.length === 0
    ) {

      return res.status(502).json({
        ok: false,
        error:
          "Supabase did not confirm the subscriber."
      });
    }

    return res.status(200).json({

      ok: true,

      subscribed: true,

      alreadySubscribed: false,

      message:
        "You are subscribed. Your daily messages will begin soon.",

      subscriber:
        verified[0]

    });

  } catch (error) {

    console.error(
      "Universe139 subscribe error:",
      error
    );

    return res.status(500).json({
      ok: false,
      error:
        error?.message ||
        "Subscription request failed."
    });
  }
}
