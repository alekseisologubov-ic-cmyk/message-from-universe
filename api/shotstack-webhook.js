// api/shotstack-webhook.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed"
    });
  }

  const bufferApiKey = process.env.BUFFER_API_KEY;
  const channelId = process.env.BUFFER_TIKTOK_CHANNEL_ID;

  if (!bufferApiKey) {
    return res.status(500).json({
      success: false,
      error: "BUFFER_API_KEY is missing."
    });
  }

  if (!channelId) {
    return res.status(500).json({
      success: false,
      error: "BUFFER_TIKTOK_CHANNEL_ID is missing."
    });
  }

  const payload = req.body || {};

  console.log(
    "Shotstack webhook received:",
    JSON.stringify(payload, null, 2)
  );

  // We only want completed renders.
  if (payload.status !== "done") {
    return res.status(200).json({
      success: true,
      ignored: true,
      status: payload.status || "unknown"
    });
  }

  const videoUrl = payload.url;

  if (!videoUrl) {
    return res.status(400).json({
      success: false,
      error: "Completed render has no video URL.",
      payload
    });
  }

  const message =
    payload.customData?.message ||
    "A message from the universe, just for you. ✨";

  const caption = `${message}

✨ A message from the universe, just for you.

Discover your personal message:
https://message-from-universe.vercel.app/

#Universe139 #MessageFromTheUniverse #DailyMessage #Universe #Motivation #DailyInspiration`;

  const mutation = `
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
          "Content-Type": "application/json",
          Authorization: `Bearer ${bufferApiKey}`
        },
        body: JSON.stringify({
          query: mutation
        })
      }
    );

    const data = await response.json();

    console.log(
      "Buffer response:",
      JSON.stringify(data, null, 2)
    );

    if (!response.ok) {
      return res.status(500).json({
        success: false,
        error: "Buffer API request failed.",
        details: data
      });
    }

    if (data.errors) {
      return res.status(500).json({
        success: false,
        error: "Buffer GraphQL request failed.",
        details: data.errors
      });
    }

    const result = data?.data?.createPost;

    if (!result) {
      return res.status(500).json({
        success: false,
        error: "Buffer returned no createPost result.",
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
      message: "Video successfully added to Buffer.",
      videoUrl,
      post: result.post || null
    });

  } catch (error) {
    console.error(
      "Webhook error:",
      error
    );

    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
