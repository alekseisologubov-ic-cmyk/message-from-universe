// ==========================================================
// TikTok Login Kit - OAuth callback
// Message From Universe
//
// Vercel Serverless Function
//
// Route:
// https://message-from-universe.vercel.app/api/tiktok/callback
//
// Flow:
// TikTok -> authorization code -> token exchange ->
// encrypted HttpOnly session cookie -> app
// ==========================================================

import crypto from "crypto";

const DEFAULT_REDIRECT_URI =
  "https://message-from-universe.vercel.app/api/tiktok/callback";

// ----------------------------------------------------------
// Parse cookies
// ----------------------------------------------------------

function parseCookies(req) {
  const header = req.headers.cookie || "";
  const result = {};

  header.split(";").forEach((part) => {
    const separator = part.indexOf("=");

    if (separator === -1) {
      return;
    }

    const name = part.slice(0, separator).trim();
    const value = part.slice(separator + 1).trim();

    if (!name) {
      return;
    }

    try {
      result[name] = decodeURIComponent(value);
    } catch {
      result[name] = value;
    }
  });

  return result;
}

// ----------------------------------------------------------
// Serialize cookie
// ----------------------------------------------------------

function serializeCookie(name, value, options = {}) {
  const parts = [
    `${name}=${encodeURIComponent(value)}`
  ];

  if (options.maxAge !== undefined) {
    parts.push(`Max-Age=${options.maxAge}`);
  }

  if (options.path) {
    parts.push(`Path=${options.path}`);
  }

  if (options.httpOnly) {
    parts.push("HttpOnly");
  }

  if (options.secure) {
    parts.push("Secure");
  }

  if (options.sameSite) {
    parts.push(`SameSite=${options.sameSite}`);
  }

  return parts.join("; ");
}

// ----------------------------------------------------------
// Encryption key
// ----------------------------------------------------------

function getEncryptionKey() {
  const secret =
    process.env.TIKTOK_SESSION_SECRET;

  if (!secret) {
    throw new Error(
      "TIKTOK_SESSION_SECRET is not configured in Vercel."
    );
  }

  return crypto
    .createHash("sha256")
    .update(secret)
    .digest();
}

// ----------------------------------------------------------
// Encrypt session
// ----------------------------------------------------------

function encryptSession(data) {
  const key =
    getEncryptionKey();

  const iv =
    crypto.randomBytes(12);

  const cipher =
    crypto.createCipheriv(
      "aes-256-gcm",
      key,
      iv
    );

  const plaintext =
    Buffer.from(
      JSON.stringify(data),
      "utf8"
    );

  const encrypted =
    Buffer.concat([
      cipher.update(plaintext),
      cipher.final()
    ]);

  const authTag =
    cipher.getAuthTag();

  return [
    iv.toString("base64url"),
    authTag.toString("base64url"),
    encrypted.toString("base64url")
  ].join(".");
}

// ----------------------------------------------------------
// Build application error redirect
// ----------------------------------------------------------

function redirectWithError(res, message) {
  return res.redirect(
    302,
    `/?tiktok=error&message=${encodeURIComponent(
      message
    )}`
  );
}

// ----------------------------------------------------------
// Main handler
// ----------------------------------------------------------

export default async function handler(req, res) {
  // --------------------------------------------------------
  // OAuth callback is GET
  // --------------------------------------------------------

  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed"
    });
  }

  try {
    // ------------------------------------------------------
    // Environment variables
    // ------------------------------------------------------

    const clientKey =
      process.env.TIKTOK_CLIENT_KEY;

    const clientSecret =
      process.env.TIKTOK_CLIENT_SECRET;

    const redirectUri =
      (
        process.env.TIKTOK_REDIRECT_URI ||
        DEFAULT_REDIRECT_URI
      ).trim();

    if (!clientKey) {
      console.error(
        "TikTok callback: TIKTOK_CLIENT_KEY missing."
      );

      return redirectWithError(
        res,
        "TikTok Client Key is not configured."
      );
    }

    if (!clientSecret) {
      console.error(
        "TikTok callback: TIKTOK_CLIENT_SECRET missing."
      );

      return redirectWithError(
        res,
        "TikTok Client Secret is not configured."
      );
    }

    // ------------------------------------------------------
    // Read TikTok callback parameters
    // ------------------------------------------------------

    const code =
      typeof req.query.code === "string"
        ? req.query.code
        : "";

    const returnedState =
      typeof req.query.state === "string"
        ? req.query.state
        : "";

    const returnedScopes =
      typeof req.query.scopes === "string"
        ? req.query.scopes
        : "";

    const oauthError =
      typeof req.query.error === "string"
        ? req.query.error
        : "";

    const oauthErrorDescription =
      typeof req.query.error_description === "string"
        ? req.query.error_description
        : "";

    // ------------------------------------------------------
    // TikTok authorization was denied / failed
    // ------------------------------------------------------

    if (oauthError) {
      console.error(
        "TikTok authorization error:",
        {
          error: oauthError,
          error_description:
            oauthErrorDescription
        }
      );

      return redirectWithError(
        res,
        oauthErrorDescription ||
          oauthError ||
          "TikTok authorization was not completed."
      );
    }

    // ------------------------------------------------------
    // Authorization code required
    // ------------------------------------------------------

    if (!code) {
      return redirectWithError(
        res,
        "TikTok did not return an authorization code."
      );
    }

    // ------------------------------------------------------
    // Validate state
    // ------------------------------------------------------

    const cookies =
      parseCookies(req);

    const savedState =
      cookies.tiktok_oauth_state || "";

    if (
      !savedState ||
      !returnedState ||
      savedState !== returnedState
    ) {
      console.error(
        "TikTok OAuth state validation failed."
      );

      return res.status(400).send(`
        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>TikTok Connection Error</title>
          </head>

          <body style="
            margin:0;
            min-height:100vh;
            display:flex;
            align-items:center;
            justify-content:center;
            background:#090613;
            color:white;
            font-family:Arial,sans-serif;
            text-align:center;
            padding:30px;
            box-sizing:border-box;
          ">

            <div>
              <h2>TikTok connection could not be verified.</h2>
              <p>
                Please return to Message From The Universe
                and try connecting TikTok again.
              </p>
            </div>

          </body>
        </html>
      `);
    }

    // ------------------------------------------------------
    // Exchange authorization code for access token
    // ------------------------------------------------------

    const tokenBody =
      new URLSearchParams();

    tokenBody.set(
      "client_key",
      clientKey
    );

    tokenBody.set(
      "client_secret",
      clientSecret
    );

    tokenBody.set(
      "code",
      code
    );

    tokenBody.set(
      "grant_type",
      "authorization_code"
    );

    tokenBody.set(
      "redirect_uri",
      redirectUri
    );

    console.log(
      "TikTok token exchange starting."
    );

    const tokenResponse =
      await fetch(
        "https://open.tiktokapis.com/v2/oauth/token/",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded"
          },

          body:
            tokenBody.toString()
        }
      );

    const tokenData =
      await tokenResponse
        .json()
        .catch(() => ({}));

    // ------------------------------------------------------
    // Token exchange failed
    // ------------------------------------------------------

    if (
      !tokenResponse.ok ||
      !tokenData.access_token
    ) {
      console.error(
        "TikTok token exchange failed:",
        {
          httpStatus:
            tokenResponse.status,
          data:
            tokenData
        }
      );

      const description =
        tokenData.error_description ||
        tokenData.error ||
        "TikTok token exchange failed.";

      return redirectWithError(
        res,
        description
      );
    }

    // ------------------------------------------------------
    // Create encrypted session
    // ------------------------------------------------------

    const expiresIn =
      Number(
        tokenData.expires_in || 86400
      );

    const refreshExpiresIn =
      Number(
        tokenData.refresh_expires_in ||
        31536000
      );

    const session = {
      open_id:
        tokenData.open_id || "",

      access_token:
        tokenData.access_token,

      refresh_token:
        tokenData.refresh_token || "",

      expires_at:
        Date.now() +
        expiresIn * 1000,

      refresh_expires_at:
        Date.now() +
        refreshExpiresIn * 1000,

      scope:
        tokenData.scope ||
        returnedScopes ||
        "",

      token_type:
        tokenData.token_type ||
        "Bearer"
    };

    const encryptedSession =
      encryptSession(session);

    // ------------------------------------------------------
    // Session cookie
    // ------------------------------------------------------

    const sessionCookie =
      serializeCookie(
        "tiktok_session",
        encryptedSession,
        {
          maxAge: 31536000,
          path: "/",
          httpOnly: true,
          secure: true,
          sameSite: "Lax"
        }
      );

    // ------------------------------------------------------
    // Clear OAuth state cookie
    // ------------------------------------------------------

    const clearStateCookie =
      serializeCookie(
        "tiktok_oauth_state",
        "",
        {
          maxAge: 0,
          path: "/",
          httpOnly: true,
          secure: true,
          sameSite: "Lax"
        }
      );

    res.setHeader(
      "Set-Cookie",
      [
        sessionCookie,
        clearStateCookie
      ]
    );

    // ------------------------------------------------------
    // Successful connection
    // ------------------------------------------------------

    console.log(
      "TikTok OAuth connection successful.",
      {
        openId:
          session.open_id,
        scope:
          session.scope
      }
    );

    return res.redirect(
      302,
      "/?tiktok=connected"
    );

  } catch (error) {
    console.error(
      "TikTok callback unexpected error:",
      error
    );

    return res.status(500).send(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>TikTok Connection Error</title>
        </head>

        <body style="
          margin:0;
          min-height:100vh;
          display:flex;
          align-items:center;
          justify-content:center;
          background:#090613;
          color:white;
          font-family:Arial,sans-serif;
          text-align:center;
          padding:30px;
          box-sizing:border-box;
        ">

          <div style="max-width:600px;">
            <h2>TikTok connection failed.</h2>

            <p>
              Please return to Message From The Universe
              and try connecting TikTok again.
            </p>
          </div>

        </body>
      </html>
    `);
  }
}
