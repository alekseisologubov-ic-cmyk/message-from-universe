// ==========================================================
// TikTok Creator Info
// Vercel Serverless Function
//
// Route:
// POST /api/tiktok/creator-info
//
// Returns the current authorized TikTok creator's information
// needed by the Direct Post UI.
// ==========================================================

const crypto = require("crypto");

// ----------------------------------------------------------
// Cookie parser
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
// MUST be the same key used by callback.js
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
//
// Format:
// base64url(iv).base64url(authTag).base64url(ciphertext)
// ----------------------------------------------------------

function decryptSession(value) {
  if (!value) {
    return null;
  }

  const parts =
    String(value).split(".");

  if (parts.length !== 3) {
    return null;
  }

  try {
    const iv =
      Buffer.from(
        parts[0],
        "base64url"
      );

    const authTag =
      Buffer.from(
        parts[1],
        "base64url"
      );

    const encrypted =
      Buffer.from(
        parts[2],
        "base64url"
      );

    const key =
      getEncryptionKey();

    const decipher =
      crypto.createDecipheriv(
        "aes-256-gcm",
        key,
        iv
      );

    decipher.setAuthTag(
      authTag
    );

    const decrypted =
      Buffer.concat([
        decipher.update(encrypted),
        decipher.final()
      ]);

    return JSON.parse(
      decrypted.toString("utf8")
    );

  } catch (error) {
    console.error(
      "TikTok session decryption error:",
      error
    );

    return null;
  }
}

// ----------------------------------------------------------
// Refresh access token
// ----------------------------------------------------------

async function refreshAccessToken(
  refreshToken
) {
  const clientKey =
    process.env.TIKTOK_CLIENT_KEY;

  const clientSecret =
    process.env.TIKTOK_CLIENT_SECRET;

  if (!clientKey || !clientSecret) {
    throw new Error(
      "TikTok client credentials are not configured."
    );
  }

  if (!refreshToken) {
    throw new Error(
      "TikTok refresh token is missing."
    );
  }

  const response =
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
            client_key:
              clientKey,

            client_secret:
              clientSecret,

            grant_type:
              "refresh_token",

            refresh_token:
              refreshToken
          }).toString()
      }
    );

  const data =
    await response
      .json()
      .catch(() => ({}));

  if (
    !response.ok ||
    !data.access_token
  ) {
    console.error(
      "TikTok refresh token request failed:",
      response.status,
      data
    );

    throw new Error(
      data.error_description ||
      data.error ||
      "Unable to refresh TikTok access token."
    );
  }

  return data;
}

// ----------------------------------------------------------
// Encrypt refreshed session
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
// Serialize cookie
// ----------------------------------------------------------

function serializeCookie(
  name,
  value,
  options = {}
) {
  const parts = [
    `${name}=${encodeURIComponent(value)}`
  ];

  if (
    options.maxAge !== undefined
  ) {
    parts.push(
      `Max-Age=${options.maxAge}`
    );
  }

  if (options.path) {
    parts.push(
      `Path=${options.path}`
    );
  }

  if (options.httpOnly) {
    parts.push("HttpOnly");
  }

  if (options.secure) {
    parts.push("Secure");
  }

  if (options.sameSite) {
    parts.push(
      `SameSite=${options.sameSite}`
    );
  }

  return parts.join("; ");
}

// ----------------------------------------------------------
// Main handler
// ----------------------------------------------------------

module.exports = async function handler(
  req,
  res
) {
  // --------------------------------------------------------
  // TikTok creator info requires POST
  // --------------------------------------------------------

  if (req.method !== "POST") {
    res.status(405).json({
      ok: false,
      error: "Method not allowed"
    });

    return;
  }

  // --------------------------------------------------------
  // JSON response
  // --------------------------------------------------------

  res.setHeader(
    "Content-Type",
    "application/json; charset=utf-8"
  );

  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate"
  );

  try {
    // ------------------------------------------------------
    // Read encrypted session cookie
    // ------------------------------------------------------

    const cookies =
      parseCookies(req);

    const encryptedSession =
      cookies.tiktok_session;

    if (!encryptedSession) {
      res.status(401).json({
        ok: false,
        connected: false,
        error:
          "TikTok account is not connected."
      });

      return;
    }

    let session =
      decryptSession(
        encryptedSession
      );

    if (!session) {
      res.status(401).json({
        ok: false,
        connected: false,
        error:
          "TikTok session is invalid."
      });

      return;
    }

    // ------------------------------------------------------
    // Refresh expired access token
    // ------------------------------------------------------

    let tokenWasRefreshed =
      false;

    const now =
      Date.now();

    if (
      session.expires_at &&
      Number(session.expires_at) <= now
    ) {
      if (!session.refresh_token) {
        res.status(401).json({
          ok: false,
          connected: false,
          error:
            "TikTok access token expired. Please reconnect TikTok."
        });

        return;
      }

      const refreshed =
        await refreshAccessToken(
          session.refresh_token
        );

      session = {
        ...session,

        access_token:
          refreshed.access_token,

        // TikTok may return a new refresh token.
        refresh_token:
          refreshed.refresh_token ||
          session.refresh_token,

        expires_at:
          Date.now() +
          Number(
            refreshed.expires_in ||
            86400
          ) *
            1000,

        refresh_expires_at:
          refreshed.refresh_expires_in
            ? Date.now() +
              Number(
                refreshed.refresh_expires_in
              ) *
                1000
            : session.refresh_expires_at,

        scope:
          refreshed.scope ||
          session.scope ||
          "",

        token_type:
          refreshed.token_type ||
          session.token_type ||
          "Bearer"
      };

      tokenWasRefreshed =
        true;
    }

    // ------------------------------------------------------
    // Access token must exist
    // ------------------------------------------------------

    if (!session.access_token) {
      res.status(401).json({
        ok: false,
        connected: false,
        error:
          "TikTok access token is missing."
      });

      return;
    }

    // ------------------------------------------------------
    // Query TikTok creator information
    //
    // TikTok endpoint:
    // POST
    // /v2/post/publish/creator_info/query/
    //
    // Scope:
    // video.publish
    // ------------------------------------------------------

    const creatorResponse =
      await fetch(
        "https://open.tiktokapis.com/v2/post/publish/creator_info/query/",
        {
          method: "POST",

          headers: {
            "Authorization":
              `Bearer ${session.access_token}`,

            "Content-Type":
              "application/json; charset=UTF-8"
          },

          body: JSON.stringify({})
        }
      );

    const creatorData =
      await creatorResponse
        .json()
        .catch(() => ({}));

    // ------------------------------------------------------
    // TikTok returned an error
    // ------------------------------------------------------

    if (!creatorResponse.ok) {
      console.error(
        "TikTok creator info HTTP error:",
        creatorResponse.status,
        creatorData
      );

      // If token became invalid, require reconnection.
      if (
        creatorResponse.status === 401
      ) {
        res.status(401).json({
          ok: false,
          connected: false,
          error:
            creatorData?.error?.message ||
            "TikTok authorization is no longer valid. Please reconnect TikTok."
        });

        return;
      }

      res.status(
        creatorResponse.status
      ).json({
        ok: false,
        connected: true,
        error:
          creatorData?.error?.message ||
          "TikTok creator information request failed."
      });

      return;
    }

    // ------------------------------------------------------
    // TikTok can return HTTP 200 while the API-level error
    // code is not "ok".
    // ------------------------------------------------------

    if (
      creatorData?.error?.code &&
      creatorData.error.code !== "ok"
    ) {
      console.error(
        "TikTok creator info API error:",
        creatorData
      );

      res.status(400).json({
        ok: false,
        connected: true,
        error:
          creatorData.error.message ||
          "TikTok creator information is unavailable.",
        tiktokError:
          creatorData.error.code
      });

      return;
    }

    const creator =
      creatorData?.data || {};

    // ------------------------------------------------------
    // Require the creator information TikTok expects
    // for the Direct Post UI.
    // ------------------------------------------------------

    if (
      !creator.creator_username &&
      !creator.creator_nickname
    ) {
      res.status(502).json({
        ok: false,
        connected: true,
        error:
          "TikTok did not return creator information."
      });

      return;
    }

    // ------------------------------------------------------
    // Save refreshed token session if required
    // ------------------------------------------------------

    if (tokenWasRefreshed) {
      const encrypted =
        encryptSession(session);

      const cookie =
        serializeCookie(
          "tiktok_session",
          encrypted,
          {
            maxAge: 31536000,
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "Lax"
          }
        );

      res.setHeader(
        "Set-Cookie",
        cookie
      );
    }

    // ------------------------------------------------------
    // IMPORTANT:
    // We return creator information but NEVER return
    // access_token or refresh_token to the browser.
    // ------------------------------------------------------

    res.status(200).json({
      ok: true,
      connected: true,

      creator: {
        avatarUrl:
          creator.creator_avatar_url ||
          "",

        username:
          creator.creator_username ||
          "",

        nickname:
          creator.creator_nickname ||
          "",

        privacyLevelOptions:
          Array.isArray(
            creator.privacy_level_options
          )
            ? creator.privacy_level_options
            : [],

        commentDisabled:
          Boolean(
            creator.comment_disabled
          ),

        duetDisabled:
          Boolean(
            creator.duet_disabled
          ),

        stitchDisabled:
          Boolean(
            creator.stitch_disabled
          ),

        maxVideoPostDurationSec:
          Number(
            creator.max_video_post_duration_sec ||
            0
          )
      }
    });

  } catch (error) {
    console.error(
      "TikTok creator-info error:",
      error
    );

    res.status(500).json({
      ok: false,
      connected: false,
      error:
        "Unable to retrieve TikTok creator information."
    });
  }
};
