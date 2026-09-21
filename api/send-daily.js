// ==========================================================
// UNIVERSE139 - DAILY EMAIL SENDER
// File: api/send-daily.js
//
// Called by Vercel Cron.
// Sends one unused message per active subscriber per local day.
//
// Required Vercel variables:
//   SUPABASE_URL
//   SUPABASE_SECRET_KEY OR SUPABASE_SERVICE_ROLE_KEY
//   RESEND_API_KEY
//   RESEND_FROM_EMAIL
//   UNSUBSCRIBE_SECRET
//   APP_URL (optional)
// ==========================================================

const TABLE = "universe139_subscribers";
const LANGUAGES = ["en", "es", "zh", "ru", "hi", "th"];
const APP_URL = String(
  process.env.APP_URL || "https://message-from-universe.vercel.app"
).replace(/\/+$/, "");

let database;
try {
  database = require("../lib/universe-messages");
} catch (error) {
  console.error("Universe139 message database load failed:", error);
}

function normalizeSupabaseUrl(value) {
  return String(value || "")
    .trim()
    .replace(/\/+$/, "")
    .replace(/\/rest\/v1$/, "");
}

function getSupabaseAuth() {
  const secretKey = String(process.env.SUPABASE_SECRET_KEY || "").trim();
  const serviceRole = String(process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
  const key = secretKey || serviceRole;

  if (!key) throw new Error("No Supabase server key is configured.");

  const headers = {
    apikey: key,
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  // Legacy service_role keys are JWTs and also need Authorization.
  // New sb_secret_ keys are sent as apikey only.
  if (!key.startsWith("sb_secret_")) {
    headers.Authorization = `Bearer ${key}`;
  }

  return { key, headers };
}

function getMessages(language) {
  const messages = database?.messages;
  const list = messages?.[language];

  if (!Array.isArray(list)) {
    throw new Error(`No message list found for language ${language}.`);
  }

  if (list.length !== 500) {
    throw new Error(`Language ${language} must contain exactly 500 messages; found ${list.length}.`);
  }

  if (new Set(list).size !== 500) {
    throw new Error(`Language ${language} contains duplicate messages.`);
  }

  return list;
}

function localDate(timezone) {
  try {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(new Date());
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function createUnsubscribeToken(email, nonce) {
  const secret = String(process.env.UNSUBSCRIBE_SECRET || "").trim();
  if (!secret) throw new Error("UNSUBSCRIBE_SECRET is not configured.");

  const payload = `${email}|${nonce}`;
  const signature = require("crypto")
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  return `${nonce}.${signature}`;
}

// The DB stores only a hash, not the nonce itself, so the deterministic
// unsubscribe link cannot be reconstructed from that hash alone.
// Therefore send-daily uses a row-specific signed token stored in the
// email only when the subscription record also contains a nonce field.
// The current schema does not contain that field. To keep the existing
// schema unchanged, we instead build a signed token from the subscriber
// id and email. The unsubscribe endpoint validates it against the same
// secret; no stored raw token is required.
function createIdBasedToken(id, email) {
  const crypto = require("crypto");
  const secret = String(process.env.UNSUBSCRIBE_SECRET || "").trim();
  if (!secret) throw new Error("UNSUBSCRIBE_SECRET is not configured.");

  const payload = `${id}|${email}`;
  const signature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  return Buffer.from(`${id}.${signature}`, "utf8").toString("base64url");
}

function getEmailCopy(language) {
  const copy = {
    en: {
      subject: "Your Message From The Universe ✨",
      title: "Your Daily Message",
      footer: "A new message will arrive tomorrow.",
      unsubscribe: "Unsubscribe"
    },
    es: {
      subject: "Tu mensaje del Universo ✨",
      title: "Tu mensaje diario",
      footer: "Un nuevo mensaje llegará mañana.",
      unsubscribe: "Cancelar suscripción"
    },
    zh: {
      subject: "来自宇宙的讯息 ✨",
      title: "你的每日讯息",
      footer: "明天你会收到新的讯息。",
      unsubscribe: "取消订阅"
    },
    ru: {
      subject: "Твоё послание от Вселенной ✨",
      title: "Твоё ежедневное послание",
      footer: "Завтра ты получишь новое послание.",
      unsubscribe: "Отписаться"
    },
    hi: {
      subject: "ब्रह्मांड से आपका संदेश ✨",
      title: "आपका दैनिक संदेश",
      footer: "कल आपको एक नया संदेश मिलेगा।",
      unsubscribe: "सदस्यता समाप्त करें"
    },
    th: {
      subject: "ข้อความจากจักรวาลของคุณ ✨",
      title: "ข้อความประจำวันของคุณ",
      footer: "พรุ่งนี้คุณจะได้รับข้อความใหม่",
      unsubscribe: "ยกเลิกการสมัคร"
    }
  };

  return copy[language] || copy.en;
}

function buildEmail({ language, message, date, unsubscribeUrl }) {
  const copy = getEmailCopy(language);

  return `<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(copy.title)}</title>
</head>
<body style="margin:0;background:#07020f;color:#fff;font-family:Arial,Helvetica,sans-serif;">
<div style="max-width:620px;margin:0 auto;padding:40px 16px;">
  <div style="text-align:center;color:#c9a7ff;font-size:13px;letter-spacing:4px;margin-bottom:22px;">UNIVERSE139</div>
  <div style="background:linear-gradient(145deg,#29104a,#12051f);border:1px solid rgba(255,255,255,.14);border-radius:26px;padding:34px 26px;">
    <h1 style="margin:0;text-align:center;font-size:27px;">${escapeHtml(copy.title)}</h1>
    <div style="text-align:center;color:rgba(255,255,255,.55);font-size:13px;margin-top:10px;">${escapeHtml(date)}</div>
    <div style="margin:25px 0;padding:26px 20px;background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.10);border-radius:18px;text-align:center;font-family:Georgia,'Times New Roman',serif;font-size:21px;line-height:1.7;">
      ${escapeHtml(message)}
    </div>
    <div style="text-align:center;color:rgba(255,255,255,.50);font-size:13px;line-height:1.6;">${escapeHtml(copy.footer)}</div>
  </div>
  <div style="text-align:center;margin-top:22px;">
    <a href="${escapeHtml(unsubscribeUrl)}" style="color:#caa5ff;text-decoration:none;font-size:12px;">${escapeHtml(copy.unsubscribe)}</a>
  </div>
</div>
</body>
</html>`;
}

async function sendResendEmail({ to, subject, html, idempotencyKey }) {
  const apiKey = String(process.env.RESEND_API_KEY || "").trim();
  const from = String(process.env.RESEND_FROM_EMAIL || "").trim();

  if (!apiKey) throw new Error("RESEND_API_KEY is not configured.");
  if (!from) throw new Error("RESEND_FROM_EMAIL is not configured.");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html
    })
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Resend ${response.status}: ${text}`);
  }

  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "Method not allowed." });
  }

  const cronSecret = String(process.env.CRON_SECRET || "").trim();
  const authorization = String(req.headers.authorization || "");

  if (cronSecret && authorization !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ ok: false, error: "Unauthorized." });
  }

  try {
    const supabaseUrl = normalizeSupabaseUrl(process.env.SUPABASE_URL);
    const { headers } = getSupabaseAuth();

    if (!supabaseUrl) throw new Error("SUPABASE_URL is not configured.");
    if (!database?.messages) throw new Error("Universe139 message database could not be loaded.");

    const tableUrl = `${supabaseUrl}/rest/v1/${TABLE}`;

    const response = await fetch(
      `${tableUrl}?select=id,email,language,timezone,active,message_order,message_position,last_sent_date&active=eq.true&limit=1000`,
      { method: "GET", headers }
    );

    const text = await response.text();

    if (!response.ok) {
      throw new Error(`Supabase ${response.status}: ${text}`);
    }

    const subscribers = text ? JSON.parse(text) : [];
    const results = [];

    for (const subscriber of subscribers) {
      try {
        const language = LANGUAGES.includes(subscriber.language)
          ? subscriber.language
          : "en";
        const messages = getMessages(language);
        const today = localDate(subscriber.timezone || "Europe/Tallinn");

        if (subscriber.last_sent_date === today) {
          results.push({ email: subscriber.email, status: "already_sent" });
          continue;
        }

        let order = Array.isArray(subscriber.message_order)
          ? subscriber.message_order
          : [];
        let position = Number.isInteger(subscriber.message_position)
          ? subscriber.message_position
          : 0;

        if (
          order.length !== 500 ||
          new Set(order).size !== 500 ||
          order.some(i => !Number.isInteger(i) || i < 0 || i >= 500)
        ) {
          order = Array.from({ length: 500 }, (_, i) => i);
          for (let i = order.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [order[i], order[j]] = [order[j], order[i]];
          }
          position = 0;
        }

        if (position >= 500) {
          order = Array.from({ length: 500 }, (_, i) => i);
          for (let i = order.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [order[i], order[j]] = [order[j], order[i]];
          }
          position = 0;
        }

        const messageIndex = order[position];
        const message = messages[messageIndex];

        const token = createIdBasedToken(subscriber.id, subscriber.email);
        const unsubscribeUrl = `${APP_URL}/api/unsubscribe?token=${encodeURIComponent(token)}`;

        const copy = getEmailCopy(language);
        const emailResult = await sendResendEmail({
          to: subscriber.email,
          subject: copy.subject,
          html: buildEmail({
            language,
            message,
            date: today,
            unsubscribeUrl
          }),
          idempotencyKey: `universe139/${subscriber.id}/${today}`
        });

        const updateResponse = await fetch(
          `${tableUrl}?id=eq.${encodeURIComponent(subscriber.id)}`,
          {
            method: "PATCH",
            headers: {
              ...headers,
              Prefer: "return=minimal"
            },
            body: JSON.stringify({
              message_order: order,
              message_position: position + 1,
              last_sent_date: today,
              updated_at: new Date().toISOString()
            })
          }
        );

        const updateText = await updateResponse.text();

        if (!updateResponse.ok) {
          throw new Error(`Supabase update ${updateResponse.status}: ${updateText}`);
        }

        results.push({
          email: subscriber.email,
          status: "sent",
          messageIndex,
          resendId: emailResult?.id || null
        });
      } catch (subscriberError) {
        console.error("Universe139 daily subscriber error:", subscriber.email, subscriberError);
        results.push({
          email: subscriber.email,
          status: "error",
          error: subscriberError?.message || String(subscriberError)
        });
      }
    }

    return res.status(200).json({
      ok: true,
      processed: subscribers.length,
      results
    });
  } catch (error) {
    console.error("Universe139 daily sender error:", error);
    return res.status(500).json({
      ok: false,
      error: error?.message || "Daily sender failed."
    });
  }
}
