// api/render-status.js

export default async function handler(req, res) {
  const apiKey = process.env.SHOTSTACK_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      success: false,
      error: "SHOTSTACK_API_KEY is missing."
    });
  }

  const renderId =
    req.query?.id ||
    new URL(req.url, "https://message-from-universe.vercel.app")
      .searchParams
      .get("id");

  if (!renderId) {
    return res.status(400).json({
      success: false,
      error: "Missing render ID."
    });
  }

  try {
    const response = await fetch(
      `https://api.shotstack.io/edit/v1/render/${renderId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "x-api-key": apiKey
        }
      }
    );

    const data = await response.json();

    return res.status(response.status).json(data);

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
