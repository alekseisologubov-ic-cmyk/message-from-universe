// ==========================================================
// UNIVERSE139 - SUBSCRIBE API
//
// Route:
// POST /api/subscribe
//
// What this does:
//
// 1. Validates the email address.
// 2. Saves the subscriber in:
//      public.universe139_subscribers
// 3. Saves the selected language.
// 4. Saves the visitor timezone.
// 5. Creates a private unsubscribe token.
// 6. Creates a random order of 500 messages.
// 7. Sends the FIRST daily message immediately using Resend.
// 8. Marks that first message as sent.
//
// Required Vercel Environment Variables:
//
//   SUPABASE_URL
//
//   SUPABASE_SERVICE_ROLE_KEY
//   OR
//   SUPABASE_SECRET_KEY
//
//   RESEND_API_KEY
//   RESEND_FROM_EMAIL
//
// Optional:
//
//   APP_URL
//
// ==========================================================

const crypto = require("crypto");


// ==========================================================
// CONFIGURATION
// ==========================================================

const APP_URL = (
  process.env.APP_URL ||
  "https://message-from-universe.vercel.app"
).replace(/\/$/, "");

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
// SUPABASE CONFIG
// ==========================================================

function getSupabaseConfig() {

  const url =
    String(
      process.env.SUPABASE_URL || ""
    ).replace(/\/$/, "");

  const key =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    "";

  if (!url) {

    throw new Error(
      "SUPABASE_URL is not configured in Vercel."
    );

  }

  if (!key) {

    throw new Error(
      "SUPABASE_SECRET_KEY or SUPABASE_SERVICE_ROLE_KEY is not configured in Vercel."
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

function supabaseHeaders(
  key,
  extra = {}
) {

  return {
    apikey: key,

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
// SUPABASE REQUEST HELPER
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
          supabaseHeaders(
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
      data?.hint ||
      data?.details ||
      (
        typeof data === "string"
          ? data
          : null
      ) ||
      `Supabase returned HTTP ${response.status}.`;

    throw new Error(
      message
    );

  }


  return data;

}


// ==========================================================
// EMAIL VALIDATION
// ==========================================================

function isValidEmail(
  email
) {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email
  );

}


// ==========================================================
// RANDOM 500 MESSAGE ORDER
//
// Each subscriber gets their own random sequence.
// There are exactly 500 indexes: 0-499.
//
// The actual message content lives in:
// api/universe-messages.js
//
// ==========================================================

function createRandomOrder() {

  const order =
    Array.from(
      {
        length: 500
      },
      (_, index) =>
        index
    );


  // Fisher-Yates shuffle using
  // cryptographically strong randomness.

  for (
    let i = order.length - 1;
    i > 0;
    i--
  ) {

    const randomBytes =
      crypto.randomBytes(4);

    const randomNumber =
      randomBytes.readUInt32BE(0);

    const j =
      randomNumber %
      (i + 1);

    [
      order[i],
      order[j]
    ] =
      [
        order[j],
        order[i]
      ];

  }


  return order;

}


// ==========================================================
// UNSUBSCRIBE TOKEN
// ==========================================================

function createUnsubscribeToken() {

  return crypto
    .randomBytes(32)
    .toString("hex");

}


function hashToken(
  token
) {

  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

}


// ==========================================================
// TIMEZONE
// ==========================================================

function validateTimezone(
  timezone
) {

  try {

    new Intl.DateTimeFormat(
      "en-US",
      {
        timeZone: timezone
      }
    ).format(
      new Date()
    );

    return timezone;

  } catch {

    return "Europe/Tallinn";

  }

}


function getDateForTimezone(
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
      .slice(0, 10);

  }

}


// ==========================================================
// ESCAPE HTML
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
// RESEND
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

    throw new Error(
      data?.message ||
      data?.error ||
      `Resend returned HTTP ${response.status}.`
    );

  }


  return data;

}


// ==========================================================
// EMAIL COPY
// ==========================================================

const COPY = {

  en: {

    subject:
      "Your first message from the Universe ✨",

    heading:
      "Your Daily Message",

    intro:
      "Welcome. Your first message from the Universe is here.",

    footer:
      "You will receive one new message each day.",

    unsubscribe:
      "Unsubscribe"

  },


  es: {

    subject:
      "Tu primer mensaje del Universo ✨",

    heading:
      "Tu mensaje diario",

    intro:
      "Bienvenido. Tu primer mensaje del Universo ya está aquí.",

    footer:
      "Recibirás un nuevo mensaje cada día.",

    unsubscribe:
      "Cancelar suscripción"

  },


  zh: {

    subject:
      "来自宇宙的第一条讯息 ✨",

    heading:
      "你的每日讯息",

    intro:
      "欢迎你。来自宇宙的第一条讯息已经到达。",

    footer:
      "你每天都会收到一条新的讯息。",

    unsubscribe:
      "取消订阅"

  },


  ru: {

    subject:
      "Твоё первое послание от Вселенной ✨",

    heading:
      "Твоё ежедневное послание",

    intro:
      "Добро пожаловать. Твоё первое послание от Вселенной уже здесь.",

    footer:
      "Каждый день ты будешь получать новое послание.",

    unsubscribe:
      "Отписаться"

  },


  hi: {

    subject:
      "ब्रह्मांड का आपका पहला संदेश ✨",

    heading:
      "आपका दैनिक संदेश",

    intro:
      "स्वागत है। ब्रह्मांड की ओर से आपका पहला संदेश यहां है।",

    footer:
      "आपको हर दिन एक नया संदेश मिलेगा।",

    unsubscribe:
      "सदस्यता समाप्त करें"

  },


  th: {

    subject:
      "ข้อความแรกจากจักรวาลของคุณ ✨",

    heading:
      "ข้อความประจำวันของคุณ",

    intro:
      "ยินดีต้อนรับ ข้อความแรกจากจักรวาลของคุณมาถึงแล้ว",

    footer:
      "คุณจะได้รับข้อความใหม่หนึ่งข้อความทุกวัน",

    unsubscribe:
      "ยกเลิกการสมัคร"

  }

};


// ==========================================================
// BUILD EMAIL HTML
// ==========================================================

function buildEmailHtml({
  copy,
  date,
  message,
  unsubscribeUrl
}) {

  return `
<!doctype html>

<html>

<head>

  <meta charset="utf-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1"
  >

  <title>
    ${escapeHtml(copy.heading)}
  </title>

</head>

<body
  style="
    margin:0;
    padding:0;
    background:#080313;
    color:#ffffff;
    font-family:Arial,Helvetica,sans-serif;
  "
>

  <div
    style="
      max-width:620px;
      margin:0 auto;
      padding:34px 20px;
    "
  >

    <div
      style="
        text-align:center;
        font-size:13px;
        letter-spacing:4px;
        color:#caa9ff;
        margin-bottom:22px;
      "
    >
      UNIVERSE139
    </div>


    <div
      style="
        border:1px solid rgba(255,255,255,.16);
        border-radius:24px;
        background:
          linear-gradient(
            145deg,
            #24103d,
            #10051f
          );
        padding:30px 24px;
      "
    >

      <div
        style="
          text-align:center;
          font-size:24px;
          font-weight:700;
          margin-bottom:10px;
        "
      >
        ${escapeHtml(copy.heading)}
      </div>


      <div
        style="
          text-align:center;
          color:rgba(255,255,255,.65);
          font-size:13px;
          margin-bottom:24px;
        "
      >
        ${escapeHtml(date)}
      </div>


      <p
        style="
          text-align:center;
          color:rgba(255,255,255,.76);
          font-size:15px;
          line-height:1.6;
          margin:0 0 24px;
        "
      >
        ${escapeHtml(copy.intro)}
      </p>


      <div
        style="
          font-family:Georgia,serif;
          font-size:22px;
          line-height:1.65;
          text-align:center;
          color:#ffffff;
        "
      >
        ${escapeHtml(message)}
      </div>


      <div
        style="
          text-align:center;
          margin-top:28px;
          color:rgba(255,255,255,.62);
          font-size:13px;
          line-height:1.6;
        "
      >
        ${escapeHtml(copy.footer)}
      </div>

    </div>


    <div
      style="
        text-align:center;
        margin-top:24px;
        font-size:12px;
        color:rgba(255,255,255,.48);
      "
    >

      <a
        href="${escapeHtml(unsubscribeUrl)}"
        style="
          color:#caa9ff;
          text-decoration:none;
        "
      >
        ${escapeHtml(copy.unsubscribe)}
      </a>

    </div>

  </div>

</body>

</html>
`;

}


// ==========================================================
// MAIN HANDLER
// ==========================================================

export default async function handler(
  req,
  res
) {

  res.setHeader(
    "Cache-Control",
    "no-store"
  );

  res.setHeader(
    "Content-Type",
    "application/json; charset=utf-8"
  );


  // --------------------------------------------------------
  // POST ONLY
  // --------------------------------------------------------

  if (
    req.method !== "POST"
  ) {

    return res
      .status(405)
      .json({

        success: false,

        error:
          "Method not allowed."

      });

  }


  try {

    // ------------------------------------------------------
    // REQUEST BODY
    // ------------------------------------------------------

    let body =
      req.body || {};


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

        body = {};

      }

    }


    // ------------------------------------------------------
    // EMAIL
    // ------------------------------------------------------

    const email =
      String(
        body.email || ""
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

          success: false,

          error:
            "Please enter a valid email address."

        });

    }


    // ------------------------------------------------------
    // LANGUAGE
    // ------------------------------------------------------

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


    // ------------------------------------------------------
    // TIMEZONE
    // ------------------------------------------------------

    const requestedTimezone =
      typeof body.timezone ===
        "string" &&
      body.timezone.trim()
        ? body.timezone.trim()
        : "Europe/Tallinn";


    const timezone =
      validateTimezone(
        requestedTimezone
      );


    // ------------------------------------------------------
    // LOAD MESSAGE DATABASE
    // ------------------------------------------------------

    const {
      messages
    } =
      require(
        "./universe-messages"
      );


    if (
      !messages ||
      !Array.isArray(
        messages[language]
      ) ||
      messages[language].length !== 500
    ) {

      throw new Error(
        `The 500-message database for "${language}" is not available.`
      );

    }


    // ------------------------------------------------------
    // CHECK EXISTING SUBSCRIBER
    // ------------------------------------------------------

    const encodedEmail =
      encodeURIComponent(
        email
      );


    const existing =
      await supabaseRequest(

        `${TABLE}` +
        `?select=id,email,language,timezone,active,message_order,message_position,last_sent_date` +
        `&email=eq.${encodedEmail}` +
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
      Array.isArray(
        existing
      ) &&
      existing.length > 0
    ) {

      const subscriber =
        existing[0];


      // ----------------------------------------------------
      // ALREADY ACTIVE
      // ----------------------------------------------------

      if (
        subscriber.active
      ) {

        return res
          .status(200)
          .json({

            success: true,

            alreadySubscribed:
              true,

            message:
              "You are already subscribed."

          });

      }


      // ----------------------------------------------------
      // REACTIVATE SUBSCRIBER
      // ----------------------------------------------------

      const unsubscribeToken =
        createUnsubscribeToken();

      const unsubscribeHash =
        hashToken(
          unsubscribeToken
        );

      const randomOrder =
        createRandomOrder();


      const today =
        getDateForTimezone(
          timezone
        );


      const firstMessageIndex =
        randomOrder[0];


      const firstMessage =
        messages[
          language
        ][
          firstMessageIndex
        ];


      const copy =
        COPY[
          language
        ];


      const unsubscribeUrl =
        `${APP_URL}/api/unsubscribe?token=${encodeURIComponent(
          unsubscribeToken
        )}`;


      // ----------------------------------------------------
      // Update database first
      // ----------------------------------------------------

      await supabaseRequest(

        `${TABLE}` +
        `?email=eq.${encodedEmail}`,

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
                true,

              language,

              timezone,

              unsubscribe_token_hash:
                unsubscribeHash,

              message_order:
                randomOrder,

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


      // ----------------------------------------------------
      // Send first email
      // ----------------------------------------------------

      try {

        await sendEmail({

          to:
            email,

          subject:
            copy.subject,

          html:
            buildEmailHtml({

              copy,

              date:
                today,

              message:
                firstMessage,

              unsubscribeUrl

            })

        });

      } catch (emailError) {

        console.error(
          "Universe139 reactivation email failed:",
          emailError
        );


        // Revert subscription so the
        // visitor can try again.

        try {

          await supabaseRequest(

            `${TABLE}` +
            `?email=eq.${encodedEmail}`,

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
            "Universe139 rollback failed:",
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
              `We could not send your first message. ${emailError.message}`

          });

      }


      // ----------------------------------------------------
      // Mark first message as sent
      // ----------------------------------------------------

      await supabaseRequest(

        `${TABLE}` +
        `?email=eq.${encodedEmail}`,

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


      return res
        .status(200)
        .json({

          success:
            true,

          alreadySubscribed:
            false,

          message:
            "Subscription reactivated and the first daily message was sent."

        });

    }


    // ======================================================
    // NEW SUBSCRIBER
    // ======================================================

    const unsubscribeToken =
      createUnsubscribeToken();

    const unsubscribeHash =
      hashToken(
        unsubscribeToken
      );


    const randomOrder =
      createRandomOrder();


    const today =
      getDateForTimezone(
        timezone
      );


    const firstMessageIndex =
      randomOrder[0];


    const firstMessage =
      messages[
        language
      ][
        firstMessageIndex
      ];


    const copy =
      COPY[
        language
      ];


    const unsubscribeUrl =
      `${APP_URL}/api/unsubscribe?token=${encodeURIComponent(
        unsubscribeToken
      )}`;


    // ------------------------------------------------------
    // Insert subscriber
    // ------------------------------------------------------

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
              randomOrder,

            message_position:
              0,

            last_sent_date:
              null

          })

      }

    );


    // ------------------------------------------------------
    // SEND FIRST DAILY MESSAGE
    // ------------------------------------------------------

    try {

      await sendEmail({

        to:
          email,

        subject:
          copy.subject,

        html:
          buildEmailHtml({

            copy,

            date:
              today,

            message:
              firstMessage,

            unsubscribeUrl

          })

      });

    } catch (emailError) {

      console.error(
        "Universe139 welcome email failed:",
        emailError
      );


      // ----------------------------------------------------
      // If email sending fails, deactivate the subscription.
      // The visitor can try again after the email problem
      // is corrected.
      // ----------------------------------------------------

      try {

        await supabaseRequest(

          `${TABLE}` +
          `?email=eq.${encodedEmail}`,

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
            `We saved your request, but could not send the first message. ${emailError.message}`

        });

    }


    // ------------------------------------------------------
    // MARK FIRST MESSAGE AS SENT
    // ------------------------------------------------------

    await supabaseRequest(

      `${TABLE}` +
      `?email=eq.${encodedEmail}`,

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

        alreadySubscribed:
          false,

        message:
          "Subscription created and the first daily message was sent."

      });


  } catch (error) {

    console.error(
      "Universe139 subscription API error:",
      error
    );


    return res
      .status(500)
      .json({

        success:
          false,

        error:
          error?.message ||
          "Unable to complete the subscription."

      });

  }

}
