// api/shotstack-webhook.js

function getQueryParameter(req, name) {
  try {
    const url = new URL(
      req.url,
      "https://message-from-universe.vercel.app"
    );

    return url.searchParams.get(name);
  } catch {
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

  const bufferApiKey =
    process.env.BUFFER_API_KEY;

  const channelId =
    process.env.BUFFER_TIKTOK_CHANNEL_ID;

  if (!bufferApiKey) {
    return res.status(500).json({
      success: false,
      error: "BUFFER_API_KEY is missing"
    });
  }

  if (!channelId) {
    return res.status(500).json({
      success: false,
      error:
        "BUFFER_TIKTOK_CHANNEL_ID is missing"
    });
  }

  const payload = req.body || {};

  console.log(
    "SHOTSTACK WEBHOOK:",
    JSON.stringify(payload, null, 2)
  );

  /*
   * Shotstack edit callback:
   *
   * type = edit
   * status = done
   * url = finished MP4
   *
   * Ignore serve/copy callbacks.
   */
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

  const videoUrl =
    String(payload.url).trim();

  const message =
    getQueryParameter(req, "message") ||
    "A message from the universe, just for you.";

  const slot =
    getQueryParameter(req, "slot") || "1";

  const caption =
    `✨ ${message}\n\n` +
    `Your message from the universe today.\n\n` +
    `Discover your personal message:\n` +
    `https://message-from-universe.vercel.app/\n\n` +
    `#Universe139 ` +
    `#MessageFromTheUniverse ` +
    `#DailyMessage ` +
    `#Universe ` +
    `#Motivation ` +
    `#DailyInspiration`;

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
            assets {
              id
              mimeType
              source
            }
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
          "Authorization":
            `Bearer ${bufferApiKey.trim()}`,
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          query
        })
      }
    );

    const data = await response.json();

    console.log(
      `BUFFER RESPONSE SLOT ${slot}:`,
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

    const result =
      data?.data?.createPost;

    if (!result) {
      return res.status(500).json({
        success: false,
        error:
          "Buffer returned no createPost result"
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
      message:
        "TikTok video added to Buffer",
      slot,
      videoUrl,
      post: result.post || null
    });

  } catch (error) {
    console.error(
      "BUFFER REQUEST ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
