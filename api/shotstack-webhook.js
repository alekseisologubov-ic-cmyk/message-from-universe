// api/shotstack-webhook.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed"
    });
  }

  const rawKey = process.env.BUFFER_API_KEY;

  // NEVER log the actual secret.
  const key = typeof rawKey === "string"
    ? rawKey.trim()
    : "";

  console.log("BUFFER KEY CHECK:", {
    exists: Boolean(rawKey),
    length: key.length,
    startsWithMutation: key.startsWith("mutation"),
    startsWithBearer: key.startsWith("Bearer"),
    containsNewline: /\r|\n/.test(rawKey || ""),
    prefix: key.substring(0, 6)
  });

  if (!key) {
    return res.status(500).json({
      success: false,
      error: "BUFFER_API_KEY is missing"
    });
  }

  const channelId =
    process.env.BUFFER_TIKTOK_CHANNEL_ID;

  if (!channelId) {
    return res.status(500).json({
      success: false,
      error: "BUFFER_TIKTOK_CHANNEL_ID is missing"
    });
  }

  const payload = req.body || {};

  console.log(
    "SHOTSTACK WEBHOOK:",
    JSON.stringify(payload, null, 2)
  );

  // Only process completed edit renders.
  if (
    payload.type !== "edit" ||
    payload.status !== "done" ||
    !payload.url
  ) {
    return res.status(200).json({
      success: true,
      ignored: true,
      type: payload.type || null,
      status: payload.status || null
    });
  }

  const videoUrl = String(payload.url).trim();

  const caption = [
    "✨ A message from the universe, just for you.",
    "",
    "Something in this message may be meant for you today.",
    "",
    "Discover your personal message:",
    "https://message-from-universe.vercel.app/",
    "",
    "#Universe139",
    "#MessageFromTheUniverse",
    "#DailyMessage",
    "#Universe",
    "#Motivation",
    "#DailyInspiration"
  ].join("\n");

  const query = `
    mutation CreatePost {
      createPost(
        input: {
          text: ${JSON.stringify(caption)}
          channelId: ${JSON.stringify(channelId)}
          schedulingType: automatic
          mode: addToQueue
          assets: [
            {
              video: {
                url: ${JSON.stringify(videoUrl)}
                metadata: {
                  thumbnailOffset: 3000
                }
              }
            }
          ]
        }
      ) {
        ... on PostActionSuccess {
          post {
            id
            text
            dueAt
            status
          }
        }

        ... on MutationError {
          message
        }
      }
    }
  `;

  try {
    const response = await fetch(
      "https://api.buffer.com",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${key}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query
        })
      }
    );

    const data = await response.json();

    console.log(
      "BUFFER RESPONSE:",
      JSON.stringify(data, null, 2)
    );

    if (!response.ok) {
      return res.status(500).json({
        success: false,
        error: "Buffer HTTP error",
        status: response.status,
        details: data
      });
    }

    if (data.errors) {
      return res.status(500).json({
        success: false,
        error: "Buffer GraphQL error",
        details: data.errors
      });
    }

    const result = data?.data?.createPost;

    if (!result) {
      return res.status(500).json({
        success: false,
        error: "No createPost result",
        details: data
      });
    }

    if (result.message) {
      return res.status(500).json({
        success: false,
        error: result.message
      });
    }

    return res.status(200).json({
      success: true,
      message: "TikTok post added to Buffer",
      videoUrl,
      post: result.post || null
    });

  } catch (error) {
    console.error("BUFFER REQUEST ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
