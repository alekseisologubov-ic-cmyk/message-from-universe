// ==========================================================
// UNIVERSE139 - SUBSCRIBE + UNSUBSCRIBE API
//
// FILE:
// api/subscribe.js
//
// POST /api/subscribe
//     Subscribe / reactivate subscriber
//
// GET /api/subscribe?action=unsubscribe&email=...&token=...
//     Unsubscribe subscriber
//
// REQUIRED VERCEL ENVIRONMENT VARIABLES:
//
// SUPABASE_URL
// SUPABASE_SECRET_KEY
// UNSUBSCRIBE_SECRET
//
// ==========================================================

import crypto from "crypto";


// ==========================================================
// CONFIG
// ==========================================================

const TABLE_NAME =
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
// SUPABASE URL
// ==========================================================

function normalizeSupabaseUrl(value) {

  return String(value || "")
    .trim()
    .replace(/\/+$/, "")
    .replace(/\/rest\/v1$/, "");

}


// ==========================================================
// EMAIL VALIDATION
// ==========================================================

function isValidEmail(email) {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email
  );

}


// ==========================================================
// TIMEZONE
// ==========================================================

function normalizeTimezone(value) {

  const timezone =
    String(
      value ||
      "Europe/Tallinn"
    ).trim();

  try {

    new Intl.DateTimeFormat(
      "en-US",
      {
        timeZone:
          timezone
      }
    ).format(
      new Date()
    );

    return timezone;

  } catch {

    return "Europe/Tallinn";

  }

}


// ==========================================================
// CREATE RANDOM 500 MESSAGE ORDER
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
    let i = order.length - 1;
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
// CREATE UNSUBSCRIBE TOKEN
//
// SAME METHOD USED EVERYWHERE
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
// HASH TOKEN
// ==========================================================

function hashToken(token) {

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
// HTML PAGE FOR UNSUBSCRIBE
// ==========================================================

function htmlPage(
  title,
  message
) {

  return `<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<meta
  name="viewport"
  content="width=device-width,initial-scale=1.0"
>

<title>${escapeHtml(title)}</title>

</head>

<body style="
margin:0;
padding:0;
background:#080314;
color:#ffffff;
font-family:Arial,Helvetica,sans-serif;
">

<div style="
min-height:100vh;
display:flex;
align-items:center;
justify-content:center;
padding:24px;
box-sizing:border-box;
">

<div style="
width:100%;
max-width:560px;
background:#241044;
border:1px solid rgba(255,255,255,.15);
border-radius:24px;
padding:40px 28px;
text-align:center;
box-sizing:border-box;
">

<div style="
font-size:42px;
margin-bottom:18px;
">
✨
</div>

<h1 style="
margin:0 0 18px;
font-size:28px;
line-height:1.3;
">
${escapeHtml(title)}
</h1>

<p style="
margin:0;
font-size:17px;
line-height:1.7;
color:rgba(255,255,255,.78);
">
${escapeHtml(message)}
</p>

</div>

</div>

</body>

</html>`;

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


  // ========================================================
  // UNSUBSCRIBE GET
  // ========================================================

  if (
    req.method === "GET" &&
    req.query?.action === "unsubscribe"
  ) {

    return handleUnsubscribe(
      req,
      res
    );

  }


  // ========================================================
  // SUBSCRIBE POST
  // ========================================================

  if (
    req.method === "POST"
  ) {

    return handleSubscribe(
      req,
      res
    );

  }


  // ========================================================
  // INVALID METHOD
  // ========================================================

  res.setHeader(
    "Content-Type",
    "application/json; charset=utf-8"
  );

  return res
    .status(405)
    .json({

      ok:
        false,

      error:
        "Method not allowed. Use POST."

    });

}


// ==========================================================
// SUBSCRIBE
// ==========================================================

async function handleSubscribe(
  req,
  res
) {

  res.setHeader(
    "Content-Type",
    "application/json; charset=utf-8"
  );


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


    // ======================================================
    // CONFIGURATION CHECK
    // ======================================================

    if (
      !supabaseUrl
    ) {

      return res
        .status(500)
        .json({

          ok:
            false,

          error:
            "SUPABASE_URL is not configured."

        });

    }


    if (
      !supabaseKey
    ) {

      return res
        .status(500)
        .json({

          ok:
            false,

          error:
            "SUPABASE_SECRET_KEY / SUPABASE_SERVICE_ROLE_KEY is not configured."

        });

    }


    if (
      !unsubscribeSecret
    ) {

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
    // REQUEST BODY
    // ======================================================

    let body =
      req.body || {};


    if (
      typeof body === "string"
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

            ok:
              false,

            error:
              "Invalid JSON request."

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

          ok:
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
      normalizeTimezone(
        body.timezone
      );


    // ======================================================
    // TOKEN
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
    // MESSAGE ORDER
    // ======================================================

    const messageOrder =
      createMessageOrder();


    // ======================================================
    // TABLE URL
    // ======================================================

    const tableUrl =
      `${supabaseUrl}/rest/v1/${TABLE_NAME}`;


    // ======================================================
    // SUPABASE REQUEST
    //
    // IMPORTANT:
    // This uses ONLY the server-side secret key.
    //
    // The browser never sees this key.
    //
    // Therefore the anon/public RLS INSERT policy is no
    // longer required for this subscription request.
    // ======================================================

    const response =
      await fetch(
        tableUrl,
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

            Accept:
              "application/json",

            Prefer:
              "return=representation"

          },

          body:
            JSON.stringify({

              email:

                email,

              language:

                language,

              timezone:

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
    // SUCCESS
    // ======================================================

    if (
      response.ok
    ) {

      console.log(
        "Universe139 subscription created:",
        email
      );


      return res
        .status(200)
        .json({

          ok:
            true,

          subscribed:
            true,

          alreadySubscribed:
            false,

          message:
            "You are subscribed. Your daily messages will begin soon."

        });

    }


    // ======================================================
    // DUPLICATE EMAIL
    //
    // We check the error text only for duplicate/unique
    // errors. No preliminary SELECT is performed.
    // ======================================================

    if (
      response.status === 409 ||
      /duplicate|unique/i.test(
        responseText
      )
    ) {

      console.log(
        "Universe139 duplicate subscription:",
        email
      );


      return res
        .status(200)
        .json({

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

    console.error(
      "Universe139 Supabase subscription error:",
      response.status,
      responseText
    );


    return res
      .status(502)
      .json({

        ok:
          false,

        error:
          "Supabase rejected the subscription.",

        supabaseStatus:
          response.status,

        supabaseResponse:
          responseText

      });


  } catch (error) {

    console.error(
      "Universe139 subscribe error:",
      error
    );


    return res
      .status(500)
      .json({

        ok:
          false,

        error:
          error?.message ||
          "Unable to save the subscription."

      });

  }

}


// ==========================================================
// UNSUBSCRIBE
// ==========================================================

async function handleUnsubscribe(
  req,
  res
) {

  res.setHeader(
    "Content-Type",
    "text/html; charset=utf-8"
  );


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


    if (
      !supabaseUrl
    ) {

      return res
        .status(500)
        .send(
          htmlPage(
            "Configuration Error",
            "SUPABASE_URL is not configured."
          )
        );

    }


    if (
      !supabaseKey
    ) {

      return res
        .status(500)
        .send(
          htmlPage(
            "Configuration Error",
            "SUPABASE_SECRET_KEY / SUPABASE_SERVICE_ROLE_KEY is not configured."
          )
        );

    }


    if (
      !unsubscribeSecret
    ) {

      return res
        .status(500)
        .send(
          htmlPage(
            "Configuration Error",
            "UNSUBSCRIBE_SECRET is not configured."
          )
        );

    }


    // ======================================================
    // PARAMETERS
    // ======================================================

    const email =
      String(
        req.query?.email ||
        ""
      )
        .trim()
        .toLowerCase();


    const token =
      String(
        req.query?.token ||
        ""
      ).trim();


    if (
      !email ||
      !token
    ) {

      return res
        .status(400)
        .send(
          htmlPage(
            "Invalid Link",
            "This unsubscribe link is incomplete."
          )
        );

    }


    if (
      !isValidEmail(
        email
      )
    ) {

      return res
        .status(400)
        .send(
          htmlPage(
            "Invalid Link",
            "This unsubscribe link is invalid."
          )
        );

    }


    // ======================================================
    // VERIFY TOKEN
    // ======================================================

    const expectedToken =
      createUnsubscribeToken(
        email,
        unsubscribeSecret
      );


    const receivedBuffer =
      Buffer.from(
        token,
        "utf8"
      );


    const expectedBuffer =
      Buffer.from(
        expectedToken,
        "utf8"
      );


    let tokenValid =
      false;


    if (
      receivedBuffer.length ===
      expectedBuffer.length
    ) {

      tokenValid =
        crypto.timingSafeEqual(
          receivedBuffer,
          expectedBuffer
        );

    }


    if (
      !tokenValid
    ) {

      return res
        .status(403)
        .send(
          htmlPage(
            "Invalid Link",
            "This unsubscribe link is not valid."
          )
        );

    }


    // ======================================================
    // HASH
    // ======================================================

    const tokenHash =
      hashToken(
        token
      );


    // ======================================================
    // TABLE
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
    // FIND MATCHING SUBSCRIBER
    // ======================================================

    const lookupUrl =
      `${tableUrl}` +
      `?select=id,email,active` +
      `&email=eq.${encodeURIComponent(
        email
      )}` +
      `&unsubscribe_token_hash=eq.${encodeURIComponent(
        tokenHash
      )}` +
      `&limit=1`;


    const lookupResponse =
      await fetch(
        lookupUrl,
        {

          method:
            "GET",

          headers:
            headers

        }
      );


    const lookupText =
      await lookupResponse.text();


    if (
      !lookupResponse.ok
    ) {

      console.error(
        "Universe139 unsubscribe lookup error:",
        lookupResponse.status,
        lookupText
      );


      return res
        .status(502)
        .send(
          htmlPage(
            "Something Went Wrong",
            "We could not access your subscription."
          )
        );

    }


    let rows =
      [];


    try {

      rows =
        lookupText
          ? JSON.parse(
              lookupText
            )
          : [];

    } catch {

      rows =
        [];

    }


    // ======================================================
    // NOT FOUND
    // ======================================================

    if (
      !Array.isArray(rows) ||
      rows.length === 0
    ) {

      return res
        .status(404)
        .send(
          htmlPage(
            "Subscription Not Found",
            "This subscription could not be found."
          )
        );

    }


    const subscriber =
      rows[0];


    // ======================================================
    // DISABLE
    // ======================================================

    const updateUrl =
      `${tableUrl}` +
      `?id=eq.${encodeURIComponent(
        subscriber.id
      )}`;


    const updateResponse =
      await fetch(
        updateUrl,
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
            JSON.stringify({

              active:
                false

            })

        }
      );


    const updateText =
      await updateResponse.text();


    if (
      !updateResponse.ok
    ) {

      console.error(
        "Universe139 unsubscribe update error:",
        updateResponse.status,
        updateText
      );


      return res
        .status(502)
        .send(
          htmlPage(
            "Something Went Wrong",
            "We could not complete your unsubscribe request."
          )
        );

    }


    // ======================================================
    // SUCCESS
    // ======================================================

    console.log(
      "Universe139 unsubscribed:",
      email
    );


    return res
      .status(200)
      .send(
        htmlPage(
          "You Are Unsubscribed",
          "You will no longer receive daily messages from Universe139."
        )
      );


  } catch (error) {

    console.error(
      "Universe139 unsubscribe error:",
      error
    );


    return res
      .status(500)
      .send(
        htmlPage(
          "Something Went Wrong",
          "We could not complete your unsubscribe request."
        )
      );

  }

}
