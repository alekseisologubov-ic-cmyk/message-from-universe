// ==========================================================
// TikTok Connection Status
// Vercel Serverless Function
//
// Route:
// https://message-from-universe.vercel.app/api/tiktok/status
//
// Reads the encrypted TikTok session cookie and tells the
// browser whether a TikTok account is connected.
// ==========================================================

const crypto = require("crypto");

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
// Encryption key
// Must match callback.js
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

// ----------------------------------------------------------
// Decrypt TikTok session
// Format:
//
// base64url(iv).base64url(authTag).base64url(ciphertext)
// ----------------------------------------------------------

function decryptSession(value) {
  if (!value) {
    return null;
  }

  const parts = String(value).split(".");

  if (parts.length !== 3) {
    return null;
  }

  const iv =
    Buffer.from(parts[0], "base64url");

  const authTag =
    Buffer.from(parts[1], "base64url");

  const encrypted =
    Buffer.from(parts[2], "base64url");

  const key =
    getEncryptionKey();

  const decipher =
    crypto.createDecipheriv(
      "aes-256-gcm",
      key,
      iv
    );

  decipher.setAuthTag(authTag);

  const decrypted =
    Buffer.concat([
      decipher.update(encrypted),
      decipher.final()
    ]);

  return JSON.parse(
    decrypted.toString("utf8")
  );
}

// ----------------------------------------------------------
// Main handler
// ----------------------------------------------------------

module.exports = async function handler(req, res) {
  // --------------------------------------------------------
  // Only GET
  // --------------------------------------------------------

  if (req.method !== "GET") {
    res.status(405).json({
      connected: false,
      error: "Method not allowed"
    });

    return;
  }

  // --------------------------------------------------------
  // Always return JSON
  // --------------------------------------------------------

  res.setHeader(
    "Content-Type",
    "application/json; charset=utf-8"
  );

  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );

  try {
    // ------------------------------------------------------
    // Read session cookie
    // ------------------------------------------------------

    const cookies =
      parseCookies(req);

    const encryptedSession =
      cookies.tiktok_session;

    if (!encryptedSession) {
      res.status(200).json({
        connected: false
      });

      return;
    }

    // ------------------------------------------------------
    // Decrypt session
    // ------------------------------------------------------

    const session =
      decryptSession(encryptedSession);

    if (!session) {
      res.status(200).json({
        connected: false
      });

      return;
    }

    // ------------------------------------------------------
    // Check token expiry
    // ------------------------------------------------------

    const now =
      Date.now();

    if (
      session.expires_at &&
      Number(session.expires_at) <= now
    ) {
      // The access token has expired.
      // creator-info / publish will handle refreshing it.
      res.status(200).json({
        connected: true,
        accessTokenExpired: true,
        openId: session.open_id || null
      });

      return;
    }

    // ------------------------------------------------------
    // Return safe information only.
    //
    // NEVER return:
    // - access_token
    // - refresh_token
    // - client_secret
    // ------------------------------------------------------

    res.status(200).json({
      connected: true,
      accessTokenExpired: false,
      openId: session.open_id || null,
      scope: session.scope || "",
      tokenType: session.token_type || "Bearer"
    });

  } catch (error) {
    console.error(
      "TikTok status error:",
      error
    );

    res.status(200).json({
      connected: false,
      error: "Unable to read TikTok connection."
    });
  }
};
