// ==========================================================
// TikTok Post Status
// Message From Universe
//
// Route:
// POST /api/tiktok/post-status
//
// Checks the status of a TikTok Upload API publish_id.
// ==========================================================

import crypto from "crypto";

function parseCookies(req) {
  const header = req.headers.cookie || "";
  const cookies = {};

  header.split(";").forEach((part) => {
    const index = part.indexOf("=");

    if (index === -1) return;

    const name = part.slice(0, index).trim();
    const value = part.slice(index + 1).trim();

    if (!name) return;

    try {
      cookies[name] = decodeURIComponent(value);
    } catch {
      cookies[name] = value;
    }
  });

  return cookies;
}

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

function decryptSession(value) {
  if (!value) return null;

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

    const decipher =
      crypto.createDecipheriv(
        "aes-256-gcm",
        getEncryptionKey(),
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

  } catch (error) {
    console.error(
      "TikTok session decrypt error:",
      error
    );

    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed"
    });
  }

  try {
    const cookies =
      parseCookies(req);

    const session =
      decryptSession(
        cookies.tiktok_session
      );

    if (!session?.access_token) {
      return res.status(401).json({
        success: false,
        connected: false,
        error:
          "TikTok is not connected."
      });
    }

    let body = req.body || {};

    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    }

    const publishId =
      typeof body.publishId === "string"
        ? body.publishId.trim()
        : "";

    if (!publishId) {
      return res.status(400).json({
        success: false,
        error:
          "publishId is required."
      });
    }

    const response =
      await fetch(
        "https://open.tiktokapis.com/v2/post/publish/status/fetch/",
        {
          method: "POST",

          headers: {
            Authorization:
              `Bearer ${session.access_token}`,

            "Content-Type":
              "application/json; charset=UTF-8"
          },

          body: JSON.stringify({
            publish_id:
              publishId
          })
        }
      );

    const data =
      await response
        .json()
        .catch(() => ({}));

    console.log(
      "TikTok post status:",
      JSON.stringify(data)
    );

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error:
          data?.error?.message ||
          "TikTok status request failed.",

        tiktokError:
          data?.error?.code ||
          null,

        logId:
          data?.error?.log_id ||
          null
      });
    }

    if (
      data?.error?.code &&
      data.error.code !== "ok"
    ) {
      return res.status(400).json({
        success: false,
        error:
          data.error.message ||
          "TikTok returned an error.",

        tiktokError:
          data.error.code,

        logId:
          data.error.log_id ||
          null
      });
    }

    const status =
      data?.data?.status || "";

    return res.status(200).json({
      success: true,
      publishId,
      status,

      details:
        data?.data || null,

      tiktok:
        data
    });

  } catch (error) {
    console.error(
      "TikTok post-status error:",
      error
    );

    return res.status(500).json({
      success: false,
      error:
        error?.message ||
        "Unable to check TikTok post status."
    });
  }
}
