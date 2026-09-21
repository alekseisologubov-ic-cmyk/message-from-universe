// ==========================================================
// TikTok Login Kit - Start OAuth flow
// Vercel Serverless Function
//
// Route:
// https://message-from-universe.vercel.app/api/tiktok/login
// ==========================================================

import crypto from "crypto";

export default async function handler(req, res) {
  // Only GET is allowed
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed"
    });
  }

  // --------------------------------------------------------
  // Environment variables
  // --------------------------------------------------------

  const clientKey = process.env.TIKTOK_CLIENT_KEY;

  const redirectUri =
    process.env.TIKTOK_REDIRECT_URI ||
    "https://message-from-universe.vercel.app/api/tiktok/callback";

  if (!clientKey) {
    console.error(
      "TikTok login error: TIKTOK_CLIENT_KEY is missing."
    );

    return res.status(500).json({
      success: false,
      error:
        "TIKTOK_CLIENT_KEY is not configured in Vercel."
    });
  }

  // --------------------------------------------------------
  // Generate a secure state value
  // --------------------------------------------------------

  const state =
    crypto.randomBytes(32).toString("hex");

  // --------------------------------------------------------
  // Store state in secure HttpOnly cookie
  // --------------------------------------------------------

  res.setHeader(
    "Set-Cookie",
    [
      `tiktok_oauth_state=${encodeURIComponent(state)}`,
      "Path=/",
      "Max-Age=600",
      "HttpOnly",
      "Secure",
      "SameSite=Lax"
    ].join("; ")
  );

  // --------------------------------------------------------
  // Build TikTok OAuth authorization URL
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

  // --------------------------------------------------------
  // Redirect user to TikTok
  // --------------------------------------------------------

  return res.redirect(
    302,
    authUrl.toString()
  );
}
