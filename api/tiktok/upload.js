// ==========================================================
// TikTok Upload to Inbox
// Message From Universe
//
// Sandbox / video.upload
//
// Route:
// POST /api/tiktok/upload
// ==========================================================

import crypto from "crypto";

// ----------------------------------------------------------
// Parse cookies
// ----------------------------------------------------------

function parseCookies(req) {
  const header = req.headers.cookie || "";
  const cookies = {};

  header.split(";").forEach((part) => {
    const index = part.indexOf("=");

    if (index === -1) {
      return;
    }

    const name = part.slice(0, index).trim();
    const value = part.slice(index + 1).trim();

    if (!name) {
      return;
    }

    try {
      cookies[name] = decodeURIComponent(value);
    } catch {
      cookies[name] = value;
    }
  });

  return cookies;
}

// ----------------------------------------------------------
// Get encryption key
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
// Decrypt session
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

// ----------------------------------------------------------
// Main handler
// ----------------------------------------------------------

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed"
    });
  }

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
    // Session
    // ------------------------------------------------------

    const cookies =
      parseCookies(req);

    const encryptedSession =
      cookies.tiktok_session;

    if (!encryptedSession) {
      return res.status(401).json({
        success: false,
        connected: false,
        error:
          "TikTok session not found."
      });
    }

    const session =
      decryptSession(
        encryptedSession
      );

    if (!session) {
      return res.status(401).json({
        success: false,
        connected: false,
        error:
          "TikTok session could not be decrypted."
      });
    }

    if (!session.access_token) {
      return res.status(401).json({
        success: false,
        connected: false,
        error:
          "TikTok access token is missing."
      });
    }

    // ------------------------------------------------------
    // Request body
    // ------------------------------------------------------

    let body = {};

    if (req.body) {
      if (typeof req.body === "string") {
        try {
          body = JSON.parse(req.body);
        } catch {
          body = {};
        }
      } else {
        body = req.body;
      }
    }

    // ------------------------------------------------------
    // Video URL
    // ------------------------------------------------------

    const defaultVideoUrl =
      "https://message-from-universe.vercel.app/universe-background.mp4";

    const requestedVideoUrl =
      typeof body.videoUrl === "string" &&
      body.videoUrl.trim()
        ? body.videoUrl.trim()
        : defaultVideoUrl;

    let videoUrl;

    try {
      videoUrl =
        new URL(
          requestedVideoUrl
        );
    } catch {
      return res.status(400).json({
        success: false,
        error:
          "The supplied video URL is invalid."
      });
    }

    // ------------------------------------------------------
    // Only our verified HTTPS domain
    // ------------------------------------------------------

    if (
      videoUrl.protocol !== "https:" ||
      videoUrl.hostname !==
        "message-from-universe.vercel.app"
    ) {
      return res.status(400).json({
        success: false,
        error:
          "The video URL must use the verified Message From Universe domain."
      });
    }

    // ------------------------------------------------------
    // TikTok Inbox Upload
    //
    // Current TikTok endpoint:
    // POST /v2/post/publish/inbox/video/init/
    //
    // Scope:
    // video.upload
    // ------------------------------------------------------

    const response =
      await fetch(
        "https://open.tiktokapis.com/v2/post/publish/inbox/video/init/",
        {
          method: "POST",

          headers: {
            Authorization:
              `Bearer ${session.access_token}`,

            "Content-Type":
              "application/json; charset=UTF-8"
          },

          body: JSON.stringify({
            source_info: {
              source:
                "PULL_FROM_URL",

              video_url:
                videoUrl.toString()
            }
          })
        }
      );

    const rawText =
      await response.text();

    let data = {};

    try {
      data =
        JSON.parse(rawText);
    } catch {
      data = {
        raw_response:
          rawText
      };
    }

    // ------------------------------------------------------
    // Log everything EXCEPT access token
    // ------------------------------------------------------

    console.log(
      "TikTok upload response:",
      JSON.stringify(
        {
          httpStatus:
            response.status,
          data
        },
        null,
        2
      )
    );

    // ------------------------------------------------------
    // HTTP error
    // ------------------------------------------------------

    if (!response.ok) {
      return res.status(
        response.status
      ).json({
        success: false,
        step:
          "tiktok_upload_init",

        httpStatus:
          response.status,

        error:
          data?.error?.message ||
          "TikTok rejected the upload request.",

        tiktokError:
          data?.error?.code ||
          null,

        logId:
          data?.error?.log_id ||
          null,

        tiktok:
          data
      });
    }

    // ------------------------------------------------------
    // API-level error
    // ------------------------------------------------------

    if (
      data?.error?.code &&
      data.error.code !== "ok"
    ) {
      return res.status(400).json({
        success: false,
        step:
          "tiktok_upload_init",

        error:
          data.error.message ||
          "TikTok rejected the upload request.",

        tiktokError:
          data.error.code,

        logId:
          data.error.log_id ||
          null,

        tiktok:
          data
      });
    }

    // ------------------------------------------------------
    // Publish ID
    // ------------------------------------------------------

    const publishId =
      data?.data?.publish_id ||
      null;

    if (!publishId) {
      return res.status(502).json({
        success: false,
        step:
          "tiktok_upload_init",

        error:
          "TikTok accepted the request but did not return a publish ID.",

        tiktok:
          data
      });
    }

    // ------------------------------------------------------
    // Success
    // ------------------------------------------------------

    return res.status(200).json({
      success: true,
      connected: true,

      step:
        "tiktok_upload_init",

      message:
        "TikTok accepted the video upload.",

      publishId,

      videoUrl:
        videoUrl.toString(),

      tiktok:
        data
    });

  } catch (error) {

    console.error(
      "TikTok upload server error:",
      error
    );

    return res.status(500).json({
      success: false,
      step:
        "server",

      error:
        error?.message ||
        "Unexpected TikTok upload error."
    });
  }
}
