// ==========================================================
// UNIVERSE139 - DAILY MESSAGE SENDER
// ==========================================================
//
// File:
// api/send-daily.js
//
// Required Vercel Environment Variables:
//
// SUPABASE_URL
// SUPABASE_SERVICE_ROLE_KEY
// RESEND_API_KEY
// RESEND_FROM_EMAIL
// UNSUBSCRIBE_SECRET
//
// Optional:
//
// CRON_SECRET
// APP_URL
//
// ==========================================================

import crypto from "crypto";

import messages from "../lib/universe-messages.js";


// ==========================================================
// CONFIGURATION
// ==========================================================

const TABLE_NAME =
  "universe139_subscribers";

const LANGUAGES = [
  "en",
  "es",
  "zh",
  "ru",
  "hi",
  "th"
];


// ==========================================================
// NORMALIZE SUPABASE URL
// ==========================================================

function normalizeSupabaseUrl(value) {

  return String(value || "")
    .trim()
    .replace(/\/+$/, "")
    .replace(/\/rest\/v1$/, "");

}


// ==========================================================
// LOCAL DATE FOR SUBSCRIBER
// ==========================================================

function getLocalDate(timezone) {

  try {

    const formatter =
      new Intl.DateTimeFormat(
        "en-CA",
        {
          timeZone:
            timezone,

          year:
            "numeric",

          month:
            "2-digit",

          day:
            "2-digit"
        }
      );

    return formatter.format(
      new Date()
    );

  } catch {

    return new Date()
      .toISOString()
      .slice(
        0,
        10
      );

  }

}


// ==========================================================
// CREATE NEW RANDOM 500 MESSAGE ORDER
// ==========================================================

function createMessageOrder() {

  const order =
    Array.from(
      {
        length: 500
      },
      (_, index) =>
        index
    );


  for (
    let i =
      order.length - 1;

    i > 0;

    i--
  ) {

    const j =
      crypto.randomInt(
        0,
        i + 1
      );


    const temp =
      order[i];

    order[i] =
      order[j];

    order[j] =
      temp;

  }


  return order;

}


// ==========================================================
// VALIDATE MESSAGE DATABASE
// ==========================================================

function validateMessageDatabase() {

  for (
    const language of
    LANGUAGES
  ) {

    if (
      !Array.isArray(
        messages[language]
      )
    ) {

      throw new Error(
        `Missing language ${language} in universe-messages.js`
      );

    }


    if (
      messages[language].length !== 500
    ) {

      throw new Error(
        `${language} must contain exactly 500 messages.`
      );

    }


    if (
      new Set(
        messages[language]
      ).size !== 500
    ) {

      throw new Error(
        `${language} contains duplicate messages.`
      );

    }

  }

}


// ==========================================================
// UNSUBSCRIBE TOKEN
//
// IMPORTANT:
//
// This MUST be exactly the same method used by
// subscribe.js.
//
// token = HMAC-SHA256(email, UNSUBSCRIBE_SECRET)
//
// ==========================================================

function createUnsubscribeToken(
  email,
  secret
) {

  return crypto
    .createHmac(
      "sha256",
      secret
    )
    .update(
      email
    )
    .digest(
      "hex"
    );

}


// ==========================================================
// ESCAPE HTML
// ==========================================================

function escapeHtml(value) {

  return String(
    value || ""
  )
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );

}


// ==========================================================
// EMAIL TEXT
// ==========================================================

const EMAIL_TEXT = {

  en: {

    subject:
      "Your Message From The Universe",

    title:
      "Your Message From The Universe",

    intro:
      "Here is your message for today:",

    unsubscribe:
      "Unsubscribe"

  },


  es: {

    subject:
      "Tu mensaje del Universo",

    title:
      "Tu mensaje del Universo",

    intro:
      "Este es tu mensaje de hoy:",

    unsubscribe:
      "Cancelar suscripción"

  },


  zh: {

    subject:
      "来自宇宙的讯息",

    title:
      "来自宇宙的讯息",

    intro:
      "这是你今天的讯息：",

    unsubscribe:
      "取消订阅"

  },


  ru: {

    subject:
      "Ваше послание от Вселенной",

    title:
      "Ваше послание от Вселенной",

    intro:
      "Ваше послание на сегодня:",

    unsubscribe:
      "Отписаться"

  },


  hi: {

    subject:
      "ब्रह्मांड का आपका संदेश",

    title:
      "ब्रह्मांड का आपका संदेश",

    intro:
      "आज का आपका संदेश:",

    unsubscribe:
      "सदस्यता समाप्त करें"

  },


  th: {

    subject:
      "ข้อความจากจักรวาลสำหรับคุณ",

    title:
      "ข้อความจากจักรวาลสำหรับคุณ",

    intro:
      "ข้อความของคุณสำหรับวันนี้:",

    unsubscribe:
      "ยกเลิกการสมัคร"

  }

};


// ==========================================================
// BUILD EMAIL HTML
// ==========================================================

function buildEmailHtml({

  language,
  message,
  unsubscribeUrl

}) {

  const copy =
    EMAIL_TEXT[language] ||
    EMAIL_TEXT.en;


  return `<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<meta name="viewport"
      content="width=device-width,initial-scale=1.0">

<title>
${escapeHtml(copy.title)}
</title>

</head>

<body style="
margin:0;
padding:0;
background:#080314;
font-family:Arial,Helvetica,sans-serif;
color:#ffffff;
">

<div style="
max-width:620px;
margin:0 auto;
padding:40px 20px;
">

<div style="
background:#241044;
border:1px solid rgba(255,255,255,.15);
border-radius:24px;
padding:36px 26px;
text-align:center;
">

<div style="
font-size:40px;
margin-bottom:18px;
">
✨
</div>

<h1 style="
margin:0 0 18px;
font-size:28px;
line-height:1.3;
color:#ffffff;
">
${escapeHtml(copy.title)}
</h1>

<p style="
margin:0 0 28px;
font-size:16px;
line-height:1.6;
color:rgba(255,255,255,.72);
">
${escapeHtml(copy.intro)}
</p>

<div style="
background:rgba(255,255,255,.07);
border-radius:18px;
padding:26px 20px;
">

<p style="
margin:0;
font-size:20px;
line-height:1.7;
color:#ffffff;
">
${escapeHtml(message)}
</p>

</div>

</div>

<div style="
text-align:center;
padding:24px 10px;
font-size:12px;
line-height:1.6;
color:rgba(255,255,255,.45);
">

<a
href="${escapeHtml(unsubscribeUrl)}"
style="
color:rgba(255,255,255,.65);
text-decoration:underline;
"
>
${escapeHtml(copy.unsubscribe)}
</a>

</div>

</div>

</body>

</html>`;

}


// ==========================================================
// SEND THROUGH RESEND
// ==========================================================

async function sendEmail({

  to,
  subject,
  html

}) {

  const apiKey =
    String(
      process.env.RESEND_API_KEY ||
      ""
    ).trim();


  const fromEmail =
    String(
      process.env.RESEND_FROM_EMAIL ||
      ""
    ).trim();


  if (!apiKey) {

    throw new Error(
      "RESEND_API_KEY is not configured."
    );

  }


  if (!fromEmail) {

    throw new Error(
      "RESEND_FROM_EMAIL is not configured."
    );

  }


  const response =
    await fetch(
      "https://api.resend.com/emails",
      {

        method:
          "POST",

        headers: {

          Authorization:
            `Bearer ${apiKey}`,

          "Content-Type":
            "application/json"

        },

        body:
          JSON.stringify({

            from:
              fromEmail,

            to:
              [to],

            subject:
              subject,

            html:
              html

          })

      }
    );


  const responseText =
    await response.text();


  if (
    !response.ok
  ) {

    throw new Error(
      `Resend rejected email: ${response.status} ${responseText}`
    );

  }


  try {

    return JSON.parse(
      responseText
    );

  } catch {

    return {
      ok:
        true
    };

  }

}


// ==========================================================
// SUPABASE GET
// ==========================================================

async function supabaseGet(
  url,
  headers
) {

  const response =
    await fetch(
      url,
      {

        method:
          "GET",

        headers:
          headers

      }
    );


  const text =
    await response.text();


  if (
    !response.ok
  ) {

    throw new Error(
      `Supabase GET failed: ${response.status} ${text}`
    );

  }


  if (!text) {

    return [];

  }


  try {

    return JSON.parse(
      text
    );

  } catch {

    throw new Error(
      "Supabase returned invalid JSON."
    );

  }

}


// ==========================================================
// SUPABASE PATCH
// ==========================================================

async function supabasePatch(
  url,
  body,
  headers
) {

  const response =
    await fetch(
      url,
      {

        method:
          "PATCH",

        headers: {

          ...headers,

          "Content-Type":
            "application/json",

          Prefer:
            "return=minimal"

        },

        body:
          JSON.stringify(
            body
          )

      }
    );


  const text =
    await response.text();


  if (
    !response.ok
  ) {

    throw new Error(
      `Supabase PATCH failed: ${response.status} ${text}`
    );

  }

}


// ==========================================================
// MAIN VERCEL HANDLER
// ==========================================================

export default async function handler(
  req,
  res
) {

  res.setHeader(
    "Content-Type",
    "application/json; charset=utf-8"
  );

  res.setHeader(
    "Cache-Control",
    "no-store"
  );


  // ========================================================
  // METHODS
  // ========================================================

  if (
    req.method !== "GET" &&
    req.method !== "POST"
  ) {

    return res
      .status(405)
      .json({

        ok:
          false,

        error:
          "Method not allowed."

      });

  }


  try {

    // ======================================================
    // ENVIRONMENT
    // ======================================================

    const supabaseUrl =
      normalizeSupabaseUrl(
        process.env.SUPABASE_URL
      );


    const supabaseKey =
      String(
        process.env.SUPABASE_SECRET_KEY ||
        process.env.SUPABASE_SERVICE_ROLE_KEY ||
        ""
      ).trim();


    const unsubscribeSecret =
      String(
        process.env.UNSUBSCRIBE_SECRET ||
        ""
      ).trim();


    const appUrl =
      String(
        process.env.APP_URL ||
        "https://message-from-universe.vercel.app"
      )
        .trim()
        .replace(
          /\/+$/,
          ""
        );


    if (!supabaseUrl) {

      throw new Error(
        "SUPABASE_URL is not configured."
      );

    }


    if (!supabaseKey) {

      throw new Error(
        "SUPABASE_SECRET_KEY / SUPABASE_SERVICE_ROLE_KEY is not configured."
      );

    }


    if (!unsubscribeSecret) {

      throw new Error(
        "UNSUBSCRIBE_SECRET is not configured."
      );

    }


    // ======================================================
    // OPTIONAL CRON SECURITY
    // ======================================================

    const cronSecret =
      String(
        process.env.CRON_SECRET ||
        ""
      ).trim();


    if (
      cronSecret &&
      req.headers.authorization !==
        `Bearer ${cronSecret}`
    ) {

      return res
        .status(401)
        .json({

          ok:
            false,

          error:
            "Unauthorized."

        });

    }


    // ======================================================
    // VALIDATE MESSAGES
    // ======================================================

    validateMessageDatabase();


    // ======================================================
    // SUPABASE REST
    // ======================================================

    const tableUrl =
      `${supabaseUrl}/rest/v1/${TABLE_NAME}`;


    const headers = {

      apikey:
        supabaseKey,

      Authorization:
        `Bearer ${supabaseKey}`,

      Accept:
        "application/json"

    };


    // ======================================================
    // GET ACTIVE SUBSCRIBERS
    // ======================================================

    const subscribersUrl =
      `${tableUrl}` +
      `?select=id,email,language,timezone,active,message_order,message_position,last_sent_date` +
      `&active=eq.true`;


    const subscribers =
      await supabaseGet(
        subscribersUrl,
        headers
      );


    if (
      !Array.isArray(
        subscribers
      )
    ) {

      throw new Error(
        "Supabase subscriber result is not an array."
      );

    }


    // ======================================================
    // COUNTERS
    // ======================================================

    let sent =
      0;

    let skipped =
      0;

    let failed =
      0;


    const errors =
      [];


    // ======================================================
    // PROCESS SUBSCRIBERS
    // ======================================================

    for (
      const subscriber of
      subscribers
    ) {

      try {

        // --------------------------------------------------
        // EMAIL
        // --------------------------------------------------

        const email =
          String(
            subscriber.email ||
            ""
          )
            .trim()
            .toLowerCase();


        if (
          !email
        ) {

          throw new Error(
            "Subscriber has no email."
          );

        }


        // --------------------------------------------------
        // LANGUAGE
        // --------------------------------------------------

        const language =
          LANGUAGES.includes(
            subscriber.language
          )
            ? subscriber.language
            : "en";


        // --------------------------------------------------
        // TIMEZONE
        // --------------------------------------------------

        const timezone =
          String(
            subscriber.timezone ||
            "Europe/Tallinn"
          );


        // --------------------------------------------------
        // LOCAL DATE
        // --------------------------------------------------

        const today =
          getLocalDate(
            timezone
          );


        // --------------------------------------------------
        // DO NOT SEND TWICE IN SAME LOCAL DAY
        // --------------------------------------------------

        if (
          subscriber.last_sent_date ===
          today
        ) {

          skipped++;

          continue;

        }


        // --------------------------------------------------
        // MESSAGE ORDER
        // --------------------------------------------------

        let order =
          subscriber.message_order;


        if (
          typeof order ===
          "string"
        ) {

          try {

            order =
              JSON.parse(
                order
              );

          } catch {

            order =
              null;

          }

        }


        // --------------------------------------------------
        // REPAIR INVALID ORDER
        // --------------------------------------------------

        if (
          !Array.isArray(order) ||
          order.length !== 500
        ) {

          order =
            createMessageOrder();


          await supabasePatch(

            `${tableUrl}` +
            `?id=eq.${encodeURIComponent(
              subscriber.id
            )}`,

            {

              message_order:
                order,

              message_position:
                0

            },

            headers

          );

        }


        // --------------------------------------------------
        // POSITION
        // --------------------------------------------------

        let position =
          Number(
            subscriber.message_position
          );


        if (
          !Number.isInteger(
            position
          ) ||
          position < 0
        ) {

          position =
            0;

        }


        // --------------------------------------------------
        // START NEW CYCLE
        // --------------------------------------------------

        if (
          position >= 500
        ) {

          order =
            createMessageOrder();


          position =
            0;


          await supabasePatch(

            `${tableUrl}` +
            `?id=eq.${encodeURIComponent(
              subscriber.id
            )}`,

            {

              message_order:
                order,

              message_position:
                0,

              last_sent_date:
                null

            },

            headers

          );

        }


        // --------------------------------------------------
        // GET MESSAGE INDEX
        // --------------------------------------------------

        const messageIndex =
          Number(
            order[position]
          );


        if (
          !Number.isInteger(
            messageIndex
          ) ||
          messageIndex < 0 ||
          messageIndex >= 500
        ) {

          throw new Error(
            `Invalid message index: ${messageIndex}`
          );

        }


        // --------------------------------------------------
        // MESSAGE
        // --------------------------------------------------

        const message =
          messages[language][
            messageIndex
          ];


        if (
          typeof message !==
          "string" ||
          !message.trim()
        ) {

          throw new Error(
            `Message ${messageIndex} is empty for ${language}.`
          );

        }


        // ==================================================
        // UNSUBSCRIBE URL
        // ==================================================

        const unsubscribeToken =
          createUnsubscribeToken(
            email,
            unsubscribeSecret
          );


        const unsubscribeUrl =
          `${appUrl}/api/subscribe?action=unsubscribe` +
          `?email=${encodeURIComponent(
            email
          )}` +
          `&token=${encodeURIComponent(
            unsubscribeToken
          )}`;


        // ==================================================
        // EMAIL
        // ==================================================

        const copy =
          EMAIL_TEXT[language] ||
          EMAIL_TEXT.en;


        const html =
          buildEmailHtml({

            language:

              language,

            message:

              message,

            unsubscribeUrl:

              unsubscribeUrl

          });


        // ==================================================
        // SEND
        // ==================================================

        const emailResult =
          await sendEmail({

            to:
              email,

            subject:
              copy.subject,

            html:
              html

          });


        // ==================================================
        // ADVANCE MESSAGE POSITION
        //
        // ONLY AFTER EMAIL SUCCESS
        // ==================================================

        await supabasePatch(

          `${tableUrl}` +
          `?id=eq.${encodeURIComponent(
            subscriber.id
          )}`,

          {

            message_position:
              position + 1,

            last_sent_date:
              today,

            updated_at:
              new Date().toISOString()

          },

          headers

        );


        console.log(
          "Universe139 sent:",
          email,
          "message:",
          messageIndex,
          "language:",
          language,
          "date:",
          today,
          "emailId:",
          emailResult?.id ||
            "ok"
        );


        sent++;


      } catch (
        subscriberError
      ) {

        failed++;


        const errorMessage =
          subscriberError?.message ||
          "Unknown subscriber error.";


        errors.push({

          email:
            subscriber.email ||
            "",

          error:
            errorMessage

        });


        console.error(
          "Universe139 subscriber error:",
          subscriber.email,
          errorMessage
        );

      }

    }


    // ======================================================
    // SUCCESS RESPONSE
    // ======================================================

    return res
      .status(200)
      .json({

        ok:
          true,

        total:
          subscribers.length,

        sent:
          sent,

        skipped:
          skipped,

        failed:
          failed,

        errors:
          errors

      });


  } catch (
    error
  ) {

    console.error(
      "Universe139 daily sender fatal error:",
      error
    );


    return res
      .status(500)
      .json({

        ok:
          false,

        error:
          error?.message ||
          "Daily sender failed."

      });

  }

}
