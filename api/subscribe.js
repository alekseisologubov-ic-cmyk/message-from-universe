// ==========================================================
// UNIVERSE139
// DAILY MESSAGE SUBSCRIPTION API
//
// Route:
// POST /api/subscribe
//
// Database:
// public.universe139_subscribers
//
// Message database:
// ../lib/universe-messages.js
//
// Required Vercel variables:
//
// SUPABASE_URL
// SUPABASE_SERVICE_ROLE_KEY
//
// RESEND_API_KEY
// RESEND_FROM_EMAIL
//
// Optional:
//
// SUPABASE_SECRET_KEY
// APP_URL
//
// ==========================================================

const crypto = require("crypto");


// ==========================================================
// CONFIG
// ==========================================================

const APP_URL =
  (
    process.env.APP_URL ||
    "https://message-from-universe.vercel.app"
  ).replace(/\/+$/, "");


const TABLE =
  "universe139_subscribers";


const ALLOWED_LANGUAGES = [
  "en",
  "es",
  "zh",
  "ru",
  "hi",
  "th"
];


// ==========================================================
// LOAD MESSAGE DATABASE
//
// IMPORTANT:
// File is in:
// lib/universe-messages.js
//
// NOT:
// api/universe-messages.js
//
// This prevents Vercel Hobby from counting it as another
// Serverless Function.
// ==========================================================

let messageDatabase;


try {

  messageDatabase =
    require(
      "../lib/universe-messages"
    );

} catch (error) {

  console.error(
    "Universe139 message database load error:",
    error
  );

}


// ==========================================================
// SUPABASE
// ==========================================================

function getSupabaseConfig() {

  const url =
    String(
      process.env.SUPABASE_URL ||
      ""
    ).replace(
      /\/+$/,
      ""
    );


  const key =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    "";


  if (!url) {

    throw new Error(
      "SUPABASE_URL is not configured."
    );

  }


  if (!key) {

    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SECRET_KEY is not configured."
    );

  }


  return {
    url,
    key
  };

}


// ==========================================================
// SUPABASE HEADERS
// ==========================================================

function getSupabaseHeaders(
  key,
  extra = {}
) {

  return {

    apikey:
      key,

    Authorization:
      `Bearer ${key}`,

    "Content-Type":
      "application/json",

    Accept:
      "application/json",

    ...extra

  };

}


// ==========================================================
// SUPABASE REQUEST
// ==========================================================

async function supabaseRequest(
  path,
  options = {}
) {

  const {
    url,
    key
  } =
    getSupabaseConfig();


  const response =
    await fetch(
      `${url}/rest/v1/${path}`,
      {

        ...options,

        headers:
          getSupabaseHeaders(
            key,
            options.headers || {}
          )

      }
    );


  const text =
    await response.text();


  let data = null;


  try {

    data =
      text
        ? JSON.parse(text)
        : null;

  } catch {

    data =
      text;

  }


  if (!response.ok) {

    const message =
      data?.message ||
      data?.error_description ||
      data?.details ||
      data?.hint ||
      (
        typeof data === "string"
          ? data
          : null
      ) ||
      `Supabase returned HTTP ${response.status}.`;


    const error =
      new Error(
        message
      );


    error.status =
      response.status;


    error.supabase =
      data;


    throw error;

  }


  return data;

}


// ==========================================================
// EMAIL VALIDATION
// ==========================================================

function isValidEmail(
  email
) {

  return (
    typeof email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email
    )
  );

}


// ==========================================================
// TIMEZONE VALIDATION
// ==========================================================

function getValidTimezone(
  timezone
) {

  const value =
    String(
      timezone ||
      "UTC"
    ).trim();


  if (!value) {
    return "UTC";
  }


  try {

    new Intl.DateTimeFormat(
      "en-US",
      {
        timeZone: value
      }
    ).format(
      new Date()
    );


    return value;

  } catch {

    return "UTC";

  }

}


// ==========================================================
// LOCAL DATE FOR SUBSCRIBER
// ==========================================================

function getLocalDate(
  timezone
) {

  try {

    return new Intl.DateTimeFormat(
      "en-CA",
      {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }
    ).format(
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
// RANDOM ORDER
//
// Every subscriber receives the 500 actual messages in a
// private randomized order.
// ==========================================================

function createMessageOrder() {

  const values =
    Array.from(
      {
        length: 500
      },
      (_, index) =>
        index
    );


  for (
    let i =
      values.length - 1;

    i > 0;

    i--
  ) {

    const random =
      crypto.randomInt(
        0,
        i + 1
      );


    const temporary =
      values[i];


    values[i] =
      values[random];


    values[random] =
      temporary;

  }


  return values;

}


// ==========================================================
// UNSUBSCRIBE TOKEN
// ==========================================================

function createUnsubscribeToken() {

  return crypto
    .randomBytes(
      32
    )
    .toString(
      "hex"
    );

}


function hashUnsubscribeToken(
  token
) {

  return crypto
    .createHash(
      "sha256"
    )
    .update(
      token
    )
    .digest(
      "hex"
    );

}


// ==========================================================
// HTML ESCAPE
// ==========================================================

function escapeHtml(
  value
) {

  return String(
    value
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
      "&#39;"
    );

}


// ==========================================================
// EMAIL COPY
// ==========================================================

const EMAIL_COPY = {

  en: {

    subject:
      "Your Message From The Universe ✨",

    title:
      "Your Daily Message",

    intro:
      "Here is your first message from the Universe.",

    footer:
      "A new message will arrive each day.",

    unsubscribe:
      "Unsubscribe"

  },


  es: {

    subject:
      "Tu mensaje del Universo ✨",

    title:
      "Tu mensaje diario",

    intro:
      "Aquí está tu primer mensaje del Universo.",

    footer:
      "Recibirás un nuevo mensaje cada día.",

    unsubscribe:
      "Cancelar suscripción"

  },


  zh: {

    subject:
      "来自宇宙的讯息 ✨",

    title:
      "你的每日讯息",

    intro:
      "这是来自宇宙的第一条讯息。",

    footer:
      "你每天都会收到一条新的讯息。",

    unsubscribe:
      "取消订阅"

  },


  ru: {

    subject:
      "Твоё послание от Вселенной ✨",

    title:
      "Твоё ежедневное послание",

    intro:
      "Вот твоё первое послание от Вселенной.",

    footer:
      "Каждый день ты будешь получать новое послание.",

    unsubscribe:
      "Отписаться"

  },


  hi: {

    subject:
      "ब्रह्मांड से आपका संदेश ✨",

    title:
      "आपका दैनिक संदेश",

    intro:
      "यह ब्रह्मांड की ओर से आपका पहला संदेश है।",

    footer:
      "आपको हर दिन एक नया संदेश मिलेगा।",

    unsubscribe:
      "सदस्यता समाप्त करें"

  },


  th: {

    subject:
      "ข้อความจากจักรวาลของคุณ ✨",

    title:
      "ข้อความประจำวันของคุณ",

    intro:
      "นี่คือข้อความแรกจากจักรวาลสำหรับคุณ",

    footer:
      "คุณจะได้รับข้อความใหม่ทุกวัน",

    unsubscribe:
      "ยกเลิกการสมัคร"

  }

};


// ==========================================================
// BUILD EMAIL
// ==========================================================

function buildEmail({
  language,
  date,
  message,
  unsubscribeUrl
}) {

  const copy =
    EMAIL_COPY[
      language
    ] ||
    EMAIL_COPY.en;


  return `
<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0"
>

<title>
  ${escapeHtml(copy.title)}
</title>

</head>


<body
  style="
    margin:0;
    padding:0;
    background:#07020f;
    color:#ffffff;
    font-family:Arial,Helvetica,sans-serif;
  "
>


<div
  style="
    width:100%;
    padding:40px 16px;
    box-sizing:border-box;
  "
>


<div
  style="
    max-width:620px;
    margin:0 auto;
  "
>


<div
  style="
    text-align:center;
    font-size:13px;
    letter-spacing:4px;
    color:#c9a7ff;
    margin-bottom:22px;
  "
>
  UNIVERSE139
</div>


<div
  style="
    border-radius:26px;
    padding:34px 26px;
    background:
      linear-gradient(
        145deg,
        #29104a 0%,
        #12051f 100%
      );
    border:1px solid rgba(255,255,255,.14);
    box-shadow:
      0 20px 70px rgba(0,0,0,.35);
  "
>


<h1
  style="
    margin:0;
    text-align:center;
    font-size:27px;
    line-height:1.3;
    color:#ffffff;
  "
>
  ${escapeHtml(copy.title)}
</h1>


<div
  style="
    text-align:center;
    margin-top:10px;
    font-size:13px;
    color:rgba(255,255,255,.58);
  "
>
  ${escapeHtml(date)}
</div>


<p
  style="
    margin:24px 0 20px;
    text-align:center;
    color:rgba(255,255,255,.75);
    font-size:15px;
    line-height:1.6;
  "
>
  ${escapeHtml(copy.intro)}
</p>


<div
  style="
    margin:25px 0;
    padding:25px 20px;
    border-radius:18px;
    background:rgba(255,255,255,.055);
    border:1px solid rgba(255,255,255,.10);
    font-family:Georgia,'Times New Roman',serif;
    font-size:21px;
    line-height:1.7;
    text-align:center;
    color:#ffffff;
  "
>
  ${escapeHtml(message)}
</div>


<p
  style="
    margin:22px 0 0;
    text-align:center;
    font-size:13px;
    line-height:1.6;
    color:rgba(255,255,255,.55);
  "
>
  ${escapeHtml(copy.footer)}
</p>


</div>


<div
  style="
    text-align:center;
    margin-top:22px;
  "
>

<a
  href="${escapeHtml(unsubscribeUrl)}"
  style="
    color:#caa5ff;
    text-decoration:none;
    font-size:12px;
  "
>
  ${escapeHtml(copy.unsubscribe)}
</a>

</div>


</div>


</div>

</body>

</html>
`;

}


// ==========================================================
// SEND EMAIL WITH RESEND
// ==========================================================

async function sendEmail({
  to,
  subject,
  html
}) {

  const apiKey =
    process.env.RESEND_API_KEY;


  const from =
    process.env.RESEND_FROM_EMAIL;


  if (!apiKey) {

    throw new Error(
      "RESEND_API_KEY is not configured in Vercel."
    );

  }


  if (!from) {

    throw new Error(
      "RESEND_FROM_EMAIL is not configured in Vercel."
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

            from,

            to: [
              to
            ],

            subject,

            html

          })

      }
    );


  const text =
    await response.text();


  let data = {};


  try {

    data =
      text
        ? JSON.parse(text)
        : {};

  } catch {

    data = {
      raw: text
    };

  }


  if (!response.ok) {

    const error =
      new Error(
        data?.message ||
        data?.error ||
        `Resend returned HTTP ${response.status}.`
      );


    error.status =
      response.status;


    error.resend =
      data;


    throw error;

  }


  return data;

}


// ==========================================================
// GET MESSAGE DATABASE
// ==========================================================

function getMessages(
  language
) {

  const database =
    messageDatabase;


  if (!database) {

    throw new Error(
      "Universe139 message database could not be loaded."
    );

  }


  const messages =
    database.messages;


  if (!messages) {

    throw new Error(
      "Universe139 message database does not export messages."
    );

  }


  const list =
    messages[
      language
    ];


  if (!Array.isArray(list)) {

    throw new Error(
      `No message list exists for language "${language}".`
    );

  }


  if (list.length !== 500) {

    throw new Error(
      `Language "${language}" must contain exactly 500 messages. Found ${list.length}.`
    );

  }


  const uniqueCount =
    new Set(
      list
    ).size;


  if (
    uniqueCount !== 500
  ) {

    throw new Error(
      `Language "${language}" contains duplicate messages.`
    );

  }


  return list;

}


// ==========================================================
// MAIN HANDLER
// ==========================================================

export default async function handler(
  req,
  res
) {

  // --------------------------------------------------------
  // Headers
  // --------------------------------------------------------

  res.setHeader(
    "Content-Type",
    "application/json; charset=utf-8"
  );


  res.setHeader(
    "Cache-Control",
    "no-store"
  );


  // --------------------------------------------------------
  // POST only
  // --------------------------------------------------------

  if (
    req.method !== "POST"
  ) {

    return res
      .status(405)
      .json({

        success:
          false,

        error:
          "Method not allowed."

      });

  }


  try {

    // ======================================================
    // BODY
    // ======================================================

    let body =
      req.body ||
      {};


    if (
      typeof body ===
      "string"
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

            success:
              false,

            error:
              "Invalid JSON request body."

          });

      }

    }


    // ======================================================
    // EMAIL
    // ======================================================

    const email =
      String(
        body.email ||
        ""
      )
        .trim()
        .toLowerCase();


    if (
      !isValidEmail(
        email
      )
    ) {

      return res
        .status(400)
        .json({

          success:
            false,

          error:
            "Please enter a valid email address."

        });

    }


    // ======================================================
    // LANGUAGE
    // ======================================================

    const requestedLanguage =
      String(
        body.language ||
        "en"
      )
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
      getValidTimezone(
        body.timezone
      );


    // ======================================================
    // GET 500 REAL MESSAGES
    // ======================================================

    const messages =
      getMessages(
        language
      );


    // ======================================================
    // CREATE PRIVATE MESSAGE ORDER
    // ======================================================

    const messageOrder =
      createMessageOrder();


    // First message is real message # from the
    // subscriber's randomized 500-message sequence.

    const firstMessageIndex =
      messageOrder[0];


    const firstMessage =
      messages[
        firstMessageIndex
      ];


    // ======================================================
    // CREATE UNSUBSCRIBE TOKEN
    // ======================================================

    const unsubscribeToken =
      createUnsubscribeToken();


    const unsubscribeHash =
      hashUnsubscribeToken(
        unsubscribeToken
      );


    const unsubscribeUrl =
      `${APP_URL}/api/unsubscribe?token=${encodeURIComponent(
        unsubscribeToken
      )}`;


    // ======================================================
    // CURRENT LOCAL DATE
    // ======================================================

    const today =
      getLocalDate(
        timezone
      );


    // ======================================================
    // CHECK EXISTING SUBSCRIBER
    // ======================================================

    const existing =
      await supabaseRequest(

        `${TABLE}` +
        `?select=*` +
        `&email=eq.${encodeURIComponent(email)}` +
        `&limit=1`,

        {
          method:
            "GET"
        }

      );


    // ======================================================
    // EXISTING SUBSCRIBER
    // ======================================================

    if (
      Array.isArray(existing) &&
      existing.length > 0
    ) {

      const subscriber =
        existing[0];


      // --------------------------------------------
      // Already active
      // --------------------------------------------

      if (
        subscriber.active === true
      ) {

        return res
          .status(200)
          .json({

            success:
              true,

            alreadySubscribed:
              true,

            subscribed:
              true,

            message:
              "You are already subscribed."

          });

      }


      // --------------------------------------------
      // Reactivate
      // --------------------------------------------

      await supabaseRequest(

        `${TABLE}` +
        `?id=eq.${encodeURIComponent(
          subscriber.id
        )}`,

        {

          method:
            "PATCH",

          headers: {

            Prefer:
              "return=minimal"

          },

          body:
            JSON.stringify({

              email,

              language,

              timezone,

              active:
                true,

              unsubscribe_token_hash:
                unsubscribeHash,

              message_order:
                messageOrder,

              message_position:
                0,

              last_sent_date:
                null,

              updated_at:
                new Date()
                  .toISOString()

            })

        }

      );


    } else {


      // ==================================================
      // NEW SUBSCRIBER
      // ==================================================

      await supabaseRequest(

        TABLE,

        {

          method:
            "POST",

          headers: {

            Prefer:
              "return=minimal"

          },

          body:
            JSON.stringify({

              email,

              language,

              timezone,

              active:
                true,

              unsubscribe_token_hash:
                unsubscribeHash,

              message_order:
                messageOrder,

              message_position:
                0,

              last_sent_date:
                null

            })

        }

      );

    }


    // ======================================================
    // SEND FIRST EMAIL
    // ======================================================

    const copy =
      EMAIL_COPY[
        language
      ] ||
      EMAIL_COPY.en;


    let resendResult;


    try {

      resendResult =
        await sendEmail({

          to:
            email,

          subject:
            copy.subject,

          html:
            buildEmail({

              language,

              date:
                today,

              message:
                firstMessage,

              unsubscribeUrl

            })

        });


    } catch (emailError) {

      console.error(
        "Universe139 first email failed:",
        emailError
      );


      // --------------------------------------------
      // Deactivate because first email was not sent
      // --------------------------------------------

      try {

        await supabaseRequest(

          `${TABLE}` +
          `?email=eq.${encodeURIComponent(email)}`,

          {

            method:
              "PATCH",

            headers: {

              Prefer:
                "return=minimal"

            },

            body:
              JSON.stringify({

                active:
                  false,

                updated_at:
                  new Date()
                    .toISOString()

              })

          }

        );

      } catch (
        rollbackError
      ) {

        console.error(
          "Universe139 subscription rollback failed:",
          rollbackError
        );

      }


      return res
        .status(502)
        .json({

          success:
            false,

          subscribed:
            false,

          error:
            emailError?.message ||
            "Unable to send the first daily message."

        });

    }


    // ======================================================
    // MARK FIRST MESSAGE AS SENT
    // ======================================================

    await supabaseRequest(

      `${TABLE}` +
      `?email=eq.${encodeURIComponent(email)}`,

      {

        method:
          "PATCH",

        headers: {

          Prefer:
            "return=minimal"

        },

        body:
          JSON.stringify({

            message_position:
              1,

            last_sent_date:
              today,

            updated_at:
              new Date()
                .toISOString()

          })

        }

      );


    // ======================================================
    // SUCCESS
    // ======================================================

    return res
      .status(200)
      .json({

        success:
          true,

        subscribed:
          true,

        alreadySubscribed:
          false,

        firstMessageSent:
          true,

        message:
          "You are subscribed and your first daily message has been sent.",

        emailId:
          resendResult?.id ||
          null

      });


  } catch (error) {

    // ======================================================
    // FINAL ERROR
    // ======================================================

    console.error(
      "Universe139 subscribe API error:",
      error
    );


    return res
      .status(
        error?.status >= 400 &&
        error?.status < 600
          ? error.status
          : 500
      )
      .json({

        success:
          false,

        subscribed:
          false,

        error:
          error?.message ||
          "Unable to complete your subscription."

      });

  }

}
