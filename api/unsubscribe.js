// ==========================================================
// UNIVERSE139 - UNSUBSCRIBE API
//
// File:
// api/unsubscribe.js
//
// Endpoint:
// GET /api/unsubscribe?email=...&token=...
//
// Required Vercel environment variables:
//
// SUPABASE_URL
// SUPABASE_SERVICE_ROLE_KEY
// UNSUBSCRIBE_SECRET
// ==========================================================

import crypto from "crypto";


// ==========================================================
// CONFIG
// ==========================================================

const TABLE_NAME =
  "universe139_subscribers";


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
// CREATE HASH
// ==========================================================

function hashToken(token) {

  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

}


// ==========================================================
// SAFE STRING
// ==========================================================

function safeString(value) {

  return String(
    value || ""
  ).trim();

}


// ==========================================================
// HTML RESPONSE
// ==========================================================

function htmlPage(
  title,
  message
) {

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport"
      content="width=device-width, initial-scale=1.0">
<title>${title}</title>
</head>

<body style="
margin:0;
padding:0;
background:#080314;
color:white;
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
font-size:40px;
margin-bottom:20px;
">
✨
</div>

<h1 style="
margin:0 0 18px;
font-size:28px;
line-height:1.25;
">
${title}
</h1>

<p style="
margin:0;
font-size:17px;
line-height:1.65;
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
// HANDLER
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
        htmlPage(
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
      safeString(
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );


    const unsubscribeSecret =
      safeString(
        process.env.UNSUBSCRIBE_SECRET
      );


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
            "SUPABASE_SERVICE_ROLE_KEY is not configured."
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
    // READ QUERY
    // ======================================================

    const email =
      safeString(
        req.query?.email
      ).toLowerCase();


    const token =
      safeString(
        req.query?.token
      );


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


    // ======================================================
    // BUILD EXPECTED SIGNED TOKEN
    //
    // The token is reproducible from:
    //
    // email + UNSUBSCRIBE_SECRET
    //
    // This allows the daily sender to create the same
    // unsubscribe link without storing a raw token.
    // ======================================================

    const expectedToken =
      crypto
        .createHmac(
          "sha256",
          unsubscribeSecret
        )
        .update(
          email
        )
        .digest(
          "hex"
        );


    // ======================================================
    // CONSTANT-TIME TOKEN COMPARISON
    // ======================================================

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
            "This unsubscribe link is not valid or has expired."
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
    // SUPABASE URL
    // ======================================================

    const tableUrl =
      `${supabaseUrl}/rest/v1/${TABLE_NAME}`;


    const headers = {

      apikey:
        supabaseKey,

      Authorization:
        `Bearer ${supabaseKey}`,

      "Content-Type":
        "application/json",

      Accept:
        "application/json"

    };


    // ======================================================
    // FIND SUBSCRIBER
    //
    // Match BOTH email and token hash.
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

          headers

        }
      );


    const lookupText =
      await lookupResponse.text();


    if (
      !lookupResponse.ok
    ) {

      console.error(
        "Universe139 unsubscribe lookup failed:",
        lookupResponse.status,
        lookupText
      );


      return res
        .status(502)
        .send(
          htmlPage(
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
    // SUBSCRIBER NOT FOUND
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
            "This subscription could not be found or the unsubscribe link is no longer valid."
          )
        );

    }


    const subscriber =
      rows[0];


    // ======================================================
    // DISABLE SUBSCRIPTION
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
        "Universe139 unsubscribe update failed:",
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


  } catch (
    error
  ) {

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
