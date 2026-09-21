// ==========================================================
// UNIVERSE139 - DAILY MESSAGE EMAIL SENDER
//
// File:
// api/send-daily.js
//
// Purpose:
// Send one new message per active subscriber each day.
//
// Required Vercel variables:
//
// SUPABASE_URL
// SUPABASE_SERVICE_ROLE_KEY
// RESEND_API_KEY
// RESEND_FROM_EMAIL
// UNSUBSCRIBE_SECRET
// CRON_SECRET              optional
// APP_URL                   optional
//
// Message database:
//
// lib/universe-messages.js
//
// Expected export:
//
// export default {
//   en: [500 messages],
//   es: [500 messages],
//   zh: [500 messages],
//   ru: [500 messages],
//   hi: [500 messages],
//   th: [500 messages]
// };
//
// ==========================================================

import crypto from "crypto";
import messages from "../lib/universe-messages.js";


// ==========================================================
// CONFIG
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
// GET LOCAL DATE
// ==========================================================

function getLocalDate(timezone) {

  try {

    const parts =
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
      ).formatToParts(
        new Date()
      );

    const values = {};

    for (const part of parts) {

      if (
        part.type !==
        "literal"
      ) {

        values[part.type] =
          part.value;

      }

    }

    return (
      `${values.year}-${values.month}-${values.day}`
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
// CREATE A RANDOM 500-MESSAGE ORDER
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

  if (
    !messages ||
    typeof messages !==
      "object"
  ) {

    throw new Error(
      "Universe139 message database could not be loaded."
    );

  }


  for (
    const language of
    LANGUAGES
  ) {

    const list =
      messages[language];


    if (
      !Array.isArray(list)
    ) {

      throw new Error(
        `Universe139 message database is missing language: ${language}`
      );

    }


    if (
      list.length !== 500
    ) {

      throw new Error(
        `Universe139 ${language} must contain exactly 500 messages. Found ${list.length}.`
      );

    }


    const unique =
      new Set(list);


    if (
      unique.size !== 500
    ) {

      throw new Error(
        `Universe139 ${language} must contain 500 unique messages. Found ${unique.size}.`
      );

    }


    for (
      let i = 0;
      i < list.length;
      i++
    ) {

      if (
        typeof list[i] !==
        "string" ||
        !list[i].trim()
      ) {

        throw new Error(
          `Universe139 ${language} message ${i} is empty.`
        );

      }

    }

  }

}


// ==========================================================
// CREATE DETERMINISTIC UNSUBSCRIBE TOKEN
//
// IMPORTANT:
//
// subscribe.js must create the SAME token from the same
// email + UNSUBSCRIBE_SECRET and store its SHA-256 hash.
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
// EMAIL TRANSLATIONS
// ==========================================================

const emailCopy = {

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
// BUILD EMAIL
// ==========================================================

function buildEmail({

  language,
  message,
  unsubscribeUrl

}) {

  const copy =
    emailCopy[language] ||
    emailCopy.en;


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
border:1px solid rgba(255,255,255,.14);
border-radius:24px;
padding:36px 26px;
text-align:center;
">

<div style="
font-size:38px;
margin-bottom:20px;
">
✨
</div>

<h1 style="
margin:0 0 16px;
font-size:28px;
line-height:1.3;
color:#ffffff;
">
${escapeHtml(copy.title)}
</h1>

<p style="
margin:0 0 26px;
font-size:16px;
line-height:1.6;
color:rgba(255,255,255,.72);
">
${escapeHtml(copy.intro)}
</p>

<div style="
background:rgba(255,255,255,.07);
border-radius:18px;
padding:24px 20px;
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
color:rgba(255,255,255,.62);
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
// SEND EMAIL THROUGH RESEND
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


  const text =
    await response.text();


  if (
    !response.ok
  ) {

    throw new Error(
      `Resend error ${response.status}: ${text}`
    );

  }


  try {

    return JSON.parse(
      text
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

        headers

      }
    );


  const text =
    await response.text();


  if (
    !response.ok
  ) {

    throw new Error(
      `Supabase GET ${response.status}: ${text}`
    );

  }


  try {

    return text
      ? JSON.parse(text)
      : [];

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
      `Supabase PATCH ${response.status}: ${text}`
    );

  }

}


// ==========================================================
// MAIN HANDLER
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
  // ALLOW GET AND POST
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
        process.env.SUPABASE_SERVICE_ROLE_KEY ||
        ""
      ).trim();


    const unsubscribeSecret =
      String(
        process.env.UNSUBSCRIBE_SECRET ||
        ""
      ).trim();


    if (!supabaseUrl) {

      return res
        .status(500)
        .json({

          ok:
            false,

          error:
            "SUPABASE_URL is not configured."

        });

    }


    if (!supabaseKey) {

      return res
        .status(500)
        .json({

          ok:
            false,

          error:
            "SUPABASE_SERVICE_ROLE_KEY is not configured."

        });

    }


    if (!unsubscribeSecret) {

      return res
        .status(500)
        .json({

          ok:
            false,

          error:
            "UNSUBSCRIBE_SECRET is not configured."

        });

    }


    // ======================================================
    // CRON SECURITY
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
    // VALIDATE MESSAGE DATABASE
    // ======================================================

    validateMessageDatabase();


    // ======================================================
    // SUPABASE
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
    // LOAD ACTIVE SUBSCRIBERS
    //
    // Only fields actually present in your table.
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
        "Supabase subscriber response is not an array."
      );

    }


    // ======================================================
    // PROCESSING
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
    // EACH SUBSCRIBER
    // ======================================================

    for (
      const subscriber of
      subscribers
    ) {

      try {

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
            "Subscriber email is empty."
          );

        }


        const language =
          LANGUAGES.includes(
            subscriber.language
          )
            ? subscriber.language
            : "en";


        const timezone =
          String(
            subscriber.timezone ||
            "Europe/Tallinn"
          );


        const today =
          getLocalDate(
            timezone
          );


        // --------------------------------------------------
        // Prevent duplicate daily emails.
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
        // Repair invalid message order.
        // --------------------------------------------------

        if (
          !Array.isArray(order) ||
          order.length !== 500
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
                0

            },

            headers

          );

        }


        // --------------------------------------------------
        // Start new cycle after 500.
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
        // Validate selected index.
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
            `Invalid message index ${messageIndex}.`
          );

        }


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
            `Message ${messageIndex} is missing for ${language}.`
          );

        }


        // ==================================================
        // UNSUBSCRIBE TOKEN
        //
        // MUST MATCH subscribe.js
        // ==================================================

        const unsubscribeToken =
          createUnsubscribeToken(
            email,
            unsubscribeSecret
          );


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


        const unsubscribeUrl =
          `${appUrl}/api/unsubscribe` +
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
          emailCopy[language] ||
          emailCopy.en;


        const html =
          buildEmail({

            language,

            message,

            unsubscribeUrl

          });


        // ==================================================
        // SEND EMAIL
        // ==================================================

        const result =
          await sendEmail({

            to:
              email,

            subject:
              copy.subject,

            html

          });


        // ==================================================
        // ONLY ADVANCE AFTER SUCCESS
        // ==================================================

        const nextPosition =
          position + 1;


        await supabasePatch(

          `${tableUrl}` +
          `?id=eq.${encodeURIComponent(
            subscriber.id
          )}`,

          {

            message_position:
              nextPosition,

            last_sent_date:
              today,

            updated_at:
              new Date().toISOString()

          },

          headers

        );


        console.log(
          "Universe139 daily email sent:",
          email,
          "message:",
          messageIndex,
          "language:",
          language,
          "date:",
          today,
          "resend:",
          result?.id ||
            "ok"
        );


        sent++;


      } catch (
        subscriberError
      ) {

        failed++;


        errors.push({

          email:
            subscriber.email,

          error:
            subscriberError?.message ||
            "Unknown error."

        });


        console.error(
          "Universe139 daily email failed:",
          subscriber.email,
          subscriberError
        );

      }

    }


    // ======================================================
    // RESULT
    // ======================================================

    return res
      .status(200)
      .json({

        ok:
          true,

        total:
          subscribers.length,

        sent,

        skipped,

        failed,

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
