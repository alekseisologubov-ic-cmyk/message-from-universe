// ==========================================================
// TikTok Login Kit - Start OAuth flow
// Message From Universe
//
// Vercel Serverless Function
//
// Route:
// https://message-from-universe.vercel.app/api/tiktok/login
// ==========================================================

import crypto from "crypto";

export default async function handler(req, res) {
  // --------------------------------------------------------
  // Only GET is allowed
  // --------------------------------------------------------

  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed"
    });
  }

  // --------------------------------------------------------
  // Get environment variables
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
      "TikTok login error: TIKTOK_CLIENT_KEY is missing."
    );

    return res.status(500).json({
      success: false,
      error:
        "TIKTOK_CLIENT_KEY is not configured in Vercel."
    });
  }

  // --------------------------------------------------------
  // Create secure OAuth state
  // --------------------------------------------------------

  const state =
    crypto.randomBytes(32).toString("hex");

  // --------------------------------------------------------
  // Store OAuth state in HttpOnly cookie
  // --------------------------------------------------------

  const stateCookie = [
    `tiktok_oauth_state=${encodeURIComponent(state)}`,
    "Path=/",
    "Max-Age=600",
    "HttpOnly",
    "Secure",
    "SameSite=Lax"
  ].join("; ");

  res.setHeader(
    "Set-Cookie",
    stateCookie
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

  // --------------------------------------------------------
  // SANDBOX SCOPES
  //
  // Your current Sandbox has:
  // - user.info.basic
  // - video.upload
  //
  // Do NOT request video.publish here because it is
  // currently not available in your Sandbox configuration.
  // --------------------------------------------------------

  authUrl.searchParams.set(
    "scope",
    "user.info.basic,video.upload"
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
  // Redirect the user to TikTok
  // --------------------------------------------------------

  return res.redirect(
    302,
    authUrl.toString()
  );
}
