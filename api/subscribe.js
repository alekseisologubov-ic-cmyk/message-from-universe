// ==========================================================
// UNIVERSE139 - SUBSCRIBE API
// File: api/subscribe.js
//
// Purpose:
// - Save a subscriber to public.universe139_subscribers
// - Uses Supabase Publishable key + anon INSERT policy
// - Creates a private randomized order of 500 message indexes
// - Creates a signed unsubscribe token hash
//
// Required Vercel variables:
//   SUPABASE_URL
//   SUPABASE_PUBLISHABLE_KEY
//   UNSUBSCRIBE_SECRET
// ==========================================================

import crypto from "crypto";

const TABLE = "universe139_subscribers";
const LANGUAGES = ["en", "es", "zh", "ru", "hi", "th"];

function normalizeSupabaseUrl(value) {
  return String(value || "")
    .trim()
    .replace(/\/+$/, "")
    .replace(/\/rest\/v1$/, "");
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validTimezone(value) {
  const timezone = String(value || "Europe/Tallinn").trim();
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: timezone }).format(new Date());
    return timezone;
  } catch {
    return "Europe/Tallinn";
  }
}

function createMessageOrder() {
  const order = Array.from({ length: 500 }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = crypto.randomInt(0, i + 1);
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

function createUnsubscribeToken(email) {
  const secret = String(process.env.UNSUBSCRIBE_SECRET || "").trim();
  if (!secret) {
    throw new Error("UNSUBSCRIBE_SECRET is not configured.");
  }

  const nonce = crypto.randomBytes(16).toString("hex");
  const payload = `${email}|${nonce}`;
  const signature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  return `${nonce}.${signature}`;
}

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed. Use POST." });
  }

  try {
    const supabaseUrl = normalizeSupabaseUrl(process.env.SUPABASE_URL);
    const publishableKey = String(process.env.SUPABASE_PUBLISHABLE_KEY || "").trim();

    if (!supabaseUrl) {
      return res.status(500).json({ ok: false, error: "SUPABASE_URL is missing in Vercel." });
    }

    if (!publishableKey) {
      return res.status(500).json({ ok: false, error: "SUPABASE_PUBLISHABLE_KEY is missing in Vercel." });
    }

    let body = req.body || {};
    if (typeof body === "string") body = JSON.parse(body);

    const email = String(body.email || "").trim().toLowerCase();
    const languageInput = String(body.language || "en").trim().toLowerCase();
    const language = LANGUAGES.includes(languageInput) ? languageInput : "en";
    const timezone = validTimezone(body.timezone);

    if (!validEmail(email)) {
      return res.status(400).json({ ok: false, error: "Please enter a valid email address." });
    }

    const unsubscribeToken = createUnsubscribeToken(email);
    const unsubscribeTokenHash = hashToken(unsubscribeToken);
    const messageOrder = createMessageOrder();

    const tableUrl = `${supabaseUrl}/rest/v1/${TABLE}`;

    const response = await fetch(tableUrl, {
      method: "POST",
      headers: {
        apikey: publishableKey,
        "Content-Type": "application/json",
        Accept: "application/json",
        Prefer: "return=representation"
      },
      body: JSON.stringify({
        email,
        language,
        timezone,
        active: true,
        unsubscribe_token_hash: unsubscribeTokenHash,
        message_order: messageOrder,
        message_position: 0
      })
    });

    const text = await response.text();

    if (!response.ok) {
      const duplicate =
        response.status === 409 || /duplicate|unique/i.test(text);

      if (duplicate) {
        return res.status(200).json({
          ok: true,
          subscribed: true,
          alreadySubscribed: true,
          message: "You are already subscribed."
        });
      }

      console.error("Universe139 subscribe insert error:", response.status, text);

      return res.status(502).json({
        ok: false,
        error: "Supabase rejected the subscription.",
        supabaseStatus: response.status,
        supabaseResponse: text
      });
    }

    return res.status(200).json({
      ok: true,
      subscribed: true,
      alreadySubscribed: false,
      message: "You are subscribed. Your daily messages will begin soon."
    });
  } catch (error) {
    console.error("Universe139 subscribe error:", error);

    return res.status(500).json({
      ok: false,
      error: error?.message || "Unable to save your subscription."
    });
  }
}
