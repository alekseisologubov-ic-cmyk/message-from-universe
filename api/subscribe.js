// ==========================================================
// UNIVERSE139 - SUBSCRIBE API
// ==========================================================

import crypto from "crypto";

const TABLE_NAME = "universe139_subscribers";

const ALLOWED_LANGUAGES = [
  "en",
  "es",
  "zh",
  "ru",
  "hi",
  "th"
];

function normalizeSupabaseUrl(value) {
  return String(value || "")
    .trim()
    .replace(/\/+$/, "")
    .replace(/\/rest\/v1$/, "");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeTimezone(value) {
  const timezone =
    String(value || "Europe/Tallinn").trim();

  try {
    new Intl.DateTimeFormat("en-US", {
      timeZone: timezone
    }).format(new Date());

    return timezone;
  } catch {
    return "Europe/Tallinn";
  }
}

// IMPORTANT:
// This must match send-daily.js and unsubscribe.js.
function createUnsubscribeToken(email, secret) {
  return crypto
    .createHmac("sha256", secret)
    .update(email)
    .digest("hex");
}

function hashToken(token) {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
}

function createMessageOrder() {
  const order = Array.from(
    { length: 500 },
    (_, index) => index
  );

  for (let i = order.length - 1; i > 0; i--) {
    const j = crypto.randomInt(0, i + 1);

    const temp = order[i];
    order[i] = order[j];
    order[j] = temp;
  }

  return order;
}

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

    // ======================================================
    // SUPABASE CONFIG
    // ======================================================

    const supabaseUrl =
      normalizeSupabaseUrl(
        process.env.SUPABASE_URL
      );

    const publishableKey =
      String(
        process.env.SUPABASE_PUBLISHABLE_KEY || ""
      ).trim();

    if (!supabaseUrl) {
      return res.status(500).json({
        ok: false,
        error:
          "SUPABASE_URL is not configured."
      });
    }

    if (!publishableKey) {
      return res.status(500).json({
        ok: false,
        error:
          "SUPABASE_PUBLISHABLE_KEY is not configured."
      });
    }

    // ======================================================
    // UNSUBSCRIBE SECRET
    // ======================================================

    const unsubscribeSecret =
      String(
        process.env.UNSUBSCRIBE_SECRET || ""
      ).trim();

    if (!unsubscribeSecret) {
      return res.status(500).json({
        ok: false,
        error:
          "UNSUBSCRIBE_SECRET is not configured."
      });
    }

    // ======================================================
    // REQUEST BODY
    // ======================================================

    let body = req.body || {};

    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
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
      String(body.email || "")
        .trim()
        .toLowerCase();

    if (!isValidEmail(email)) {
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
      String(body.language || "en")
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
      normalizeTimezone(
        body.timezone
      );

    // ======================================================
    // SUBSCRIBER'S PERMANENT TOKEN
    //
    // Same token method used by:
    // subscribe.js
    // send-daily.js
    // unsubscribe.js
    // ======================================================

    const unsubscribeToken =
      createUnsubscribeToken(
        email,
        unsubscribeSecret
      );

    const unsubscribeTokenHash =
      hashToken(
        unsubscribeToken
      );

    // ======================================================
    // PERSONAL 500-MESSAGE ORDER
    // ======================================================

    const messageOrder =
      createMessageOrder();

    // ======================================================
    // SUPABASE REST TABLE URL
    // ======================================================

    const tableUrl =
      `${supabaseUrl}/rest/v1/${TABLE_NAME}`;

    // ======================================================
    // PUBLIC INSERT
    //
    // No lookup.
    // No SELECT.
    //
    // The anon INSERT policy handles authorization.
    // ======================================================

    const response =
      await fetch(
        tableUrl,
        {
          method: "POST",

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

            })
        }
      );

    const responseText =
      await response.text();

    // ======================================================
    // DUPLICATE EMAIL
    // ======================================================

    if (
      response.status === 409 ||
      /duplicate|unique/i.test(
        responseText
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

    // ======================================================
    // SUPABASE ERROR
    // ======================================================

    if (!response.ok) {

      console.error(
        "Universe139 Supabase INSERT:",
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

    // ======================================================
    // SUCCESS
    // ======================================================

    return res.status(200).json({

      ok:
        true,

      subscribed:
        true,

      alreadySubscribed:
        false,

      message:
        "You are subscribed. Your daily messages will begin soon."

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
