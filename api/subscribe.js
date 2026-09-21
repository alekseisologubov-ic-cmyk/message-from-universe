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

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validTimezone(value) {
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

function createTokenHash() {
  const token =
    crypto.randomBytes(32).toString("hex");

  const hash =
    crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

  return {
    token,
    hash
  };
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
        error: "SUPABASE_URL is missing."
      });
    }

    if (!publishableKey) {
      return res.status(500).json({
        ok: false,
        error:
          "SUPABASE_PUBLISHABLE_KEY is missing."
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
          error: "Invalid JSON request."
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

    if (!validEmail(email)) {
      return res.status(400).json({
        ok: false,
        error: "Please enter a valid email address."
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
      validTimezone(body.timezone);

    // ======================================================
    // UNSUBSCRIBE TOKEN
    // ======================================================

    const {
      token,
      hash
    } = createTokenHash();

    // ======================================================
    // 500 MESSAGE ORDER
    // ======================================================

    const messageOrder =
      createMessageOrder();

    // ======================================================
    // REST URL
    // ======================================================

    const tableUrl =
      `${supabaseUrl}/rest/v1/${TABLE_NAME}`;

    // ======================================================
    // PUBLIC SUPABASE REQUEST
    //
    // No SELECT.
    // No service-role lookup.
    //
    // The anon INSERT policy controls access.
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
                hash,

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
    // DUPLICATE
    // ======================================================

    if (
      response.status === 409 ||
      /duplicate|unique/i.test(
        responseText
      )
    ) {
      return res.status(200).json({
        ok: true,
        subscribed: true,
        alreadySubscribed: true,
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

        ok: false,

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

    console.log(
      "Universe139 subscription saved:",
      email
    );

    return res.status(200).json({

      ok: true,

      subscribed: true,

      alreadySubscribed: false,

      message:
        "You are subscribed. Your daily messages will begin soon.",

      unsubscribeToken:
        token

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
        "Unable to save your subscription."

    });

  }

}
