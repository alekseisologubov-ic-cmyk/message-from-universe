// ==========================================================
// TikTok Login Kit - OAuth callback
// Vercel Serverless Function
//
// Route:
// https://message-from-universe.vercel.app/api/tiktok/callback
//
// Receives the authorization code from TikTok,
// validates the OAuth state, exchanges the code for
// access_token + refresh_token, and stores an encrypted
// session in an HttpOnly cookie.
// ==========================================================

const crypto = require("crypto");

// ----------------------------------------------------------
// Environment / configuration
// ----------------------------------------------------------

const DEFAULT_REDIRECT_URI =
  "https://message-from-universe.vercel.app/api/tiktok/callback";

// ----------------------------------------------------------
// Cookie helpers
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
// Encryption
//
// We never put the TikTok client secret or raw access token
// into browser-visible JavaScript.
//
// The OAuth result is encrypted with AES-256-GCM and placed
// in an HttpOnly cookie.
// ----------------------------------------------------------

function getEncryptionKey() {
  const secret =
    process.env.TIKTOK_SESSION_SECRET;

  if (!secret) {
    throw new Error(
      "TIKTOK_SESSION_SECRET is not configured."
    );
  }

  return crypto
    .createHash("sha256")
    .update(secret)
    .digest();
}

function encryptSession(data) {
  const key = getEncryptionKey();

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
// Main handler
// ----------------------------------------------------------

module.exports = async function handler(req, res) {
  // --------------------------------------------------------
  // Only GET is valid for the OAuth callback
  // --------------------------------------------------------

  if (req.method !== "GET") {
    res.status(405).json({
      error: "Method not allowed"
    });

    return;
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
      process.env.TIKTOK_REDIRECT_URI ||
      DEFAULT_REDIRECT_URI;

    if (!clientKey) {
      throw new Error(
        "TIKTOK_CLIENT_KEY is not configured."
      );
    }

    if (!clientSecret) {
      throw new Error(
        "TIKTOK_CLIENT_SECRET is not configured."
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

    const error =
      typeof req.query.error === "string"
        ? req.query.error
        : "";

    const errorDescription =
      typeof req.query.error_description === "string"
        ? req.query.error_description
        : "";

    // ------------------------------------------------------
    // TikTok can return an authorization error
    // ------------------------------------------------------

    if (error) {
      console.error(
        "TikTok authorization error:",
        error,
        errorDescription
      );

      const message =
        errorDescription ||
        error ||
        "TikTok authorization was not completed.";

      res.redirect(
        `/?tiktok=error&message=${encodeURIComponent(
          message
        )}`
      );

      return;
    }

    // ------------------------------------------------------
    // Authorization code is required
    // ------------------------------------------------------

    if (!code) {
      res.redirect(
        "/?tiktok=error&message=No%20authorization%20code%20was%20returned%20by%20TikTok."
      );

      return;
    }

    // ------------------------------------------------------
    // Validate OAuth state
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

      res.status(400).send(`
        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>TikTok Authorization Error</title>
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
              <p>Please close this window and try connecting TikTok again.</p>
            </div>
          </body>
        </html>
      `);

      return;
    }

    // ------------------------------------------------------
    // Exchange authorization code for TikTok tokens
    //
    // TikTok current endpoint:
    // POST https://open.tiktokapis.com/v2/oauth/token/
    // ------------------------------------------------------

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
            new URLSearchParams({
              client_key: clientKey,
              client_secret: clientSecret,
              code: code,
              grant_type:
                "authorization_code",
              redirect_uri: redirectUri
            }).toString()
        }
      );

    const tokenData =
      await tokenResponse
        .json()
        .catch(() => ({}));

    // ------------------------------------------------------
    // TikTok token exchange failed
    // ------------------------------------------------------

    if (
      !tokenResponse.ok ||
      !tokenData.access_token
    ) {
      console.error(
        "TikTok token exchange failed:",
        tokenResponse.status,
        tokenData
      );

      const description =
        tokenData.error_description ||
        tokenData.error ||
        "TikTok token exchange failed.";

      res.redirect(
        `/?tiktok=error&message=${encodeURIComponent(
          description
        )}`
      );

      return;
    }

    // ------------------------------------------------------
    // Store only the information needed by our backend.
    //
    // IMPORTANT:
    // access_token and refresh_token remain inside the
    // encrypted HttpOnly cookie and are never exposed
    // to client-side JavaScript.
    // ------------------------------------------------------

    const session = {
      open_id:
        tokenData.open_id || "",

      access_token:
        tokenData.access_token,

      refresh_token:
        tokenData.refresh_token || "",

      expires_at:
        Date.now() +
        Number(
          tokenData.expires_in || 86400
        ) *
          1000,

      refresh_expires_at:
        Date.now() +
        Number(
          tokenData.refresh_expires_in ||
          31536000
        ) *
          1000,

      scope:
        tokenData.scope || "",

      token_type:
        tokenData.token_type || "Bearer"
    };

    const encryptedSession =
      encryptSession(session);

    // ------------------------------------------------------
    // Set session cookie
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
    // Clear the one-time OAuth state cookie
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
    // Return the user to the main application
    // ------------------------------------------------------

    res.redirect(
      "/?tiktok=connected"
    );

  } catch (error) {
    console.error(
      "TikTok callback error:",
      error
    );

    res.status(500).send(`
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
};
