// ==========================================================
// TikTok Login Kit - Start OAuth flow
// Vercel Serverless Function
//
// Route:
// https://message-from-universe.vercel.app/api/tiktok/login
// ==========================================================

import crypto from "crypto";

export default async function handler(req, res) {
  // --------------------------------------------------------
  // Only allow GET
  // --------------------------------------------------------
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed"
    });
  }

  // --------------------------------------------------------
  // Environment variables
  // --------------------------------------------------------
  const clientKey =
    process.env.TIKTOK_CLIENT_KEY;

  const redirectUri =
    process.env.TIKTOK_REDIRECT_URI ||
    "https://message-from-universe.vercel.app/api/tiktok/callback";

  // --------------------------------------------------------
  // Check Client Key
  // --------------------------------------------------------
  if (!clientKey) {
    console.error(
      "TikTok: TIKTOK_CLIENT_KEY is missing."
    );

    return res.status(500).json({
      success: false,
      error:
        "TikTok Client Key is not configured in Vercel."
    });
  }

  // --------------------------------------------------------
  // Create secure OAuth state
  // --------------------------------------------------------
  const state =
    crypto.randomBytes(32).toString("hex");

  // --------------------------------------------------------
  // Save state in secure HttpOnly cookie
  // --------------------------------------------------------
  const cookie = [
    `tiktok_oauth_state=${encodeURIComponent(state)}`,
    "Path=/",
    "Max-Age=600",
    "HttpOnly",
    "Secure",
    "SameSite=Lax"
  ].join("; ");

  res.setHeader(
    "Set-Cookie",
    cookie
  );

  // --------------------------------------------------------
  // Build TikTok authorization URL
  // --------------------------------------------------------
  const authUrl =
    new URL(
      "https://www.tiktok.com/v2/auth/authorize/"
    );

  authUrl.searchParams.set(
    "client_key",
    clientKey
  );

  authUrl.searchParams.set(
    "response_type",
    "code"
  );

  authUrl.searchParams.set(
    "scope",
    "user.info.basic,video.publish,video.upload"
  );

  authUrl.searchParams.set(
    "redirect_uri",
    redirectUri
  );

  authUrl.searchParams.set(
    "state",
    state
  );

  console.log(
    "TikTok OAuth redirect:",
    authUrl.toString()
  );

  // --------------------------------------------------------
  // Send user to TikTok
  // --------------------------------------------------------
  return res.redirect(
    302,
    authUrl.toString()
  );
}
