// ==========================================================
// UNIVERSE139 - UNSUBSCRIBE API
// ==========================================================
//
// File:
// api/unsubscribe.js
//
// URL:
// /api/unsubscribe?email=...&token=...
//
// Required Vercel variables:
//
// SUPABASE_URL
// SUPABASE_SERVICE_ROLE_KEY
// UNSUBSCRIBE_SECRET
//
// ==========================================================

import crypto from "crypto";

const TABLE_NAME =
  "universe139_subscribers";


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
// TOKEN
//
// MUST MATCH subscribe.js and send-daily.js
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
// SHA-256 HASH
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
// HTML PAGE
// ==========================================================

function page(
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

<title>${title}</title>

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
${title}
</h1>

<p style="
margin:0;
font-size:17px;
line-height:1.7;
color:rgba(255,255,255,.78);
">
${message}
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
    "Content-Type",
    "text/html; charset=utf-8"
  );

  res.setHeader(
    "Cache-Control",
    "no-store"
  );


  // ========================================================
  // GET ONLY
  // ========================================================

  if (
    req.method !== "GET"
  ) {

    return res
      .status(405)
      .send(
        page(
          "Method Not Allowed",
          "Please use the unsubscribe link from your email."
        )
      );

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
        .send(
          page(
            "Configuration Error",
            "SUPABASE_URL is not configured."
          )
        );

    }


    if (!supabaseKey) {

      return res
        .status(500)
        .send(
          page(
            "Configuration Error",
            "SUPABASE_SERVICE_ROLE_KEY is not configured."
          )
        );

    }


    if (!unsubscribeSecret) {

      return res
        .status(500)
        .send(
          page(
            "Configuration Error",
            "UNSUBSCRIBE_SECRET is not configured."
          )
        );

    }


    // ======================================================
    // QUERY PARAMETERS
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
          page(
            "Invalid Link",
            "This unsubscribe link is incomplete."
          )
        );

    }


    // ======================================================
    // REBUILD EXPECTED TOKEN
    //
    // EXACTLY THE SAME AS subscribe.js
    // AND send-daily.js
    // ======================================================

    const expectedToken =
      createUnsubscribeToken(
        email,
        unsubscribeSecret
      );


    // ======================================================
    // SECURE TOKEN COMPARISON
    // ======================================================

    const received =
      Buffer.from(
        token,
        "utf8"
      );


    const expected =
      Buffer.from(
        expectedToken,
        "utf8"
      );


    let valid =
      false;


    if (
      received.length ===
      expected.length
    ) {

      valid =
        crypto.timingSafeEqual(
          received,
          expected
        );

    }


    if (!valid) {

      return res
        .status(403)
        .send(
          page(
            "Invalid Link",
            "This unsubscribe link is not valid."
          )
        );

    }


    // ======================================================
    // HASH TOKEN
    // ======================================================

    const tokenHash =
      hashToken(
        token
      );


    // ======================================================
    // TABLE URL
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
    // FIND SUBSCRIBER
    //
    // Match email + stored token hash
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
        "Universe139 unsubscribe lookup:",
        lookupResponse.status,
        lookupText
      );


      return res
        .status(502)
        .send(
          page(
            "Something Went Wrong",
            "We could not access the subscription database."
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
          page(
            "Subscription Not Found",
            "This subscription could not be found."
          )
        );

    }


    const subscriber =
      rows[0];


    // ======================================================
    // DEACTIVATE
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
                false,

              updated_at:
                new Date().toISOString()

            })

        }
      );


    const updateText =
      await updateResponse.text();


    if (
      !updateResponse.ok
    ) {

      console.error(
        "Universe139 unsubscribe update:",
        updateResponse.status,
        updateText
      );


      return res
        .status(502)
        .send(
          page(
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
        page(
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
        page(
          "Something Went Wrong",
          "We could not complete your unsubscribe request."
        )
      );

  }

}
