// ==========================================================
// TikTok Login Kit - Start OAuth flow
// Vercel Serverless Function
// Route:
// https://message-from-universe.vercel.app/api/tiktok/login
// ==========================================================

const crypto = require("crypto");

module.exports = async function handler(req, res) {
  // --------------------------------------------------------
  // Only allow GET
  // --------------------------------------------------------
  if (req.method !== "GET") {
    res.status(405).json({
      error: "Method not allowed"
    });
    return;
  }

  // --------------------------------------------------------
  // Required environment variables
  // --------------------------------------------------------
  const clientKey = process.env.TIKTOK_CLIENT_KEY;

  const redirectUri =
    process.env.TIKTOK_REDIRECT_URI ||
    "https://message-from-universe.vercel.app/api/tiktok/callback";

  if (!clientKey) {
    console.error("TikTok: TIKTOK_CLIENT_KEY is missing.");
    res.status(500).json({
      error: "TikTok client key is not configured."
    });
    return;
  }

  // --------------------------------------------------------
  // Create secure anti-forgery state
  // TikTok requires state validation on callback.
  // --------------------------------------------------------
  const state = crypto.randomBytes(32).toString("hex");

  // --------------------------------------------------------
  // Store state in an HttpOnly cookie.
  // SameSite=Lax works with the top-level redirect
  // from TikTok back to our callback URL.
  // --------------------------------------------------------
  const cookie =
    [
      `tiktok_oauth_state=${encodeURIComponent(state)}`,
      "HttpOnly",
      "Secure",
      "SameSite=Lax",
      "Path=/",
      "Max-Age=600"
    ].join("; ");

  res.setHeader("Set-Cookie", cookie);

  // --------------------------------------------------------
  // TikTok OAuth authorization URL
  // --------------------------------------------------------
  const authUrl =
    new URL("https://www.tiktok.com/v2/auth/authorize/");

  authUrl.searchParams.set(
    "client_key",
    clientKey
  );

  authUrl.searchParams.set(
    "response_type",
    "code"
  );

  // Request the scopes configured for your app.
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
  // Redirect the user to TikTok
  // --------------------------------------------------------
  res.statusCode = 302;
  res.setHeader(
    "Location",
    authUrl.toString()
  );

  res.end();
};
