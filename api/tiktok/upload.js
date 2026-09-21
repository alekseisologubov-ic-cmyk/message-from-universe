// ==========================================================
// TikTok Upload to Inbox
// Message From Universe
//
// Vercel Serverless Function
//
// Route:
// POST /api/tiktok/upload
//
// Uses:
// video.upload
//
// The video is sent to TikTok using PULL_FROM_URL.
// ==========================================================

import crypto from "crypto";

// ----------------------------------------------------------
// Cookie parser
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
// ----------------------------------------------------------

function decryptSession(value) {
  if (!value) {
    return null;
  }

  const parts = String(value).split(".");

  if (parts.length !== 3) {
    return null;
  }

  try {
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
  // --------------------------------------------------------
  // POST only
  // --------------------------------------------------------

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
    "no-store"
  );

  try {
    // ------------------------------------------------------
    // Read TikTok session
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
          "TikTok is not connected. Please connect TikTok first."
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
          "TikTok session is invalid. Please reconnect TikTok."
      });
    }

    if (!session.access_token) {
      return res.status(401).json({
        success: false,
        connected: false,
        error:
          "TikTok access token is missing. Please reconnect TikTok."
      });
    }

    // ------------------------------------------------------
    // Parse optional request body
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
    // Default verified video URL
    //
    // This file already exists in your project root and is
    // served from the verified message-from-universe domain.
    //
    // Later we can replace this with the completed
    // Shotstack-rendered video URL.
    // ------------------------------------------------------

    const defaultVideoUrl =
      "https://message-from-universe.vercel.app/universe-background.mp4";

    const requestedVideoUrl =
      typeof body.videoUrl === "string" &&
      body.videoUrl.trim()
        ? body.videoUrl.trim()
        : defaultVideoUrl;

    // ------------------------------------------------------
    // SECURITY:
    // Only allow URLs from our verified domain.
    // ------------------------------------------------------

    let videoUrl;

    try {
      videoUrl =
        new URL(requestedVideoUrl);
    } catch {
      return res.status(400).json({
        success: false,
        error: "Invalid video URL."
      });
    }

    if (
      videoUrl.protocol !== "https:" ||
      videoUrl.hostname !==
        "message-from-universe.vercel.app"
    ) {
      return res.status(400).json({
        success: false,
        error:
          "Video URL must use the verified Message From Universe domain."
      });
    }

    // ------------------------------------------------------
    // Initialize TikTok Inbox Upload
    //
    // TikTok endpoint:
    // POST
    // /v2/post/publish/inbox/video/init/
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

    const data =
      await response
        .json()
        .catch(() => ({}));

    // ------------------------------------------------------
    // TikTok HTTP error
    // ------------------------------------------------------

    if (!response.ok) {
      console.error(
        "TikTok upload initialization error:",
        response.status,
        data
      );

      return res
        .status(response.status)
        .json({
          success: false,
          error:
            data?.error?.message ||
            "TikTok rejected the video upload request.",

          tiktokError:
            data?.error?.code || null,

          logId:
            data?.error?.log_id || null
        });
    }

    // ------------------------------------------------------
    // TikTok API-level error
    // ------------------------------------------------------

    if (
      data?.error?.code &&
      data.error.code !== "ok"
    ) {
      console.error(
        "TikTok upload API error:",
        data
      );

      return res.status(400).json({
        success: false,
        error:
          data.error.message ||
          "TikTok rejected the video upload request.",

        tiktokError:
          data.error.code,

        logId:
          data.error.log_id || null
      });
    }

    // ------------------------------------------------------
    // publish_id should be returned for status checking
    // ------------------------------------------------------

    const publishId =
      data?.data?.publish_id || null;

    if (!publishId) {
      console.error(
        "TikTok did not return publish_id:",
        data
      );

      return res.status(502).json({
        success: false,
        error:
          "TikTok did not return a publish ID.",

        tiktok:
          data
      });
    }

    // ------------------------------------------------------
    // PULL_FROM_URL does not return an upload_url because
    // TikTok downloads the video itself.
    // ------------------------------------------------------

    return res.status(200).json({
      success: true,
      connected: true,

      message:
        "Video sent to TikTok successfully. Open the TikTok inbox notification to continue editing and posting.",

      publishId,

      videoUrl:
        videoUrl.toString(),

      tiktok:
        data
    });

  } catch (error) {
    console.error(
      "TikTok upload error:",
      error
    );

    return res.status(500).json({
      success: false,
      error:
        error?.message ||
        "Unable to upload video to TikTok."
    });
  }
}
