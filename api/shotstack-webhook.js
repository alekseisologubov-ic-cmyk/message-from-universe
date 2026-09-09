// api/shotstack-webhook.js

export default async function handler(req, res) {
  // Shotstack sends POST requests.
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed"
    });
  }

  const BUFFER_API_KEY = process.env.BUFFER_API_KEY;
  const BUFFER_TIKTOK_CHANNEL_ID =
    process.env.BUFFER_TIKTOK_CHANNEL_ID;

  // Make sure Buffer is configured.
  if (!BUFFER_API_KEY) {
    console.error("Missing BUFFER_API_KEY");

    return res.status(500).json({
      success: false,
      error: "BUFFER_API_KEY is not configured in Vercel."
    });
  }

  if (!BUFFER_TIKTOK_CHANNEL_ID) {
    console.error(
      "Missing BUFFER_TIKTOK_CHANNEL_ID"
    );

    return res.status(500).json({
      success: false,
      error:
        "BUFFER_TIKTOK_CHANNEL_ID is not configured in Vercel."
    });
  }

  const payload = req.body || {};

  console.log(
    "Shotstack webhook received:",
    JSON.stringify(payload, null, 2)
  );

  /*
    Shotstack callback can contain the render status
    and the final video URL.

    We only continue when the render is finished.
  */

  const status = payload.status;

  if (status !== "done" && status !== "ready") {
    return res.status(200).json({
      success: true,
      received: true,
      ignored: true,
      reason: `Render status: ${status || "unknown"}`
    });
  }

  /*
    Different Shotstack responses can expose the URL
    in slightly different places, so check the common
    locations.
  */

  const videoUrl =
    payload.url ||
    payload.response?.url ||
    payload.response?.output?.url ||
    payload.data?.url ||
    payload.data?.response?.url ||
    null;

  if (!videoUrl) {
    console.error(
      "No MP4 URL found in Shotstack webhook."
    );

    return res.status(400).json({
      success: false,
      error: "Shotstack webhook did not contain a video URL.",
      payload
    });
  }

  /*
    Universe139 TikTok caption.
  */

  const caption = `
✨ A message from the universe, just for you.

Something in this message may be meant for you today.

Discover your personal message:
https://message-from-universe.vercel.app/

#Universe139
#MessageFromTheUniverse
#DailyMessage
#Universe
#SpiritualTok
#Motivation
#PositiveEnergy
#DailyInspiration
`.trim();

  /*
    Buffer GraphQL mutation.

    automatic = Buffer publishes automatically.
    addToQueue = use the next available Buffer
    publishing slot for the TikTok channel.
  */

  const mutation = `
    mutation CreatePost {
      createPost(
        input: {
          text: ${JSON.stringify(caption)}
          channelId: ${JSON.stringify(
            BUFFER_TIKTOK_CHANNEL_ID
          )}
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
    const bufferResponse = await fetch(
      "https://api.buffer.com",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${BUFFER_API_KEY}`
        },

        body: JSON.stringify({
          query: mutation
        })
      }
    );

    const bufferData =
      await bufferResponse.json();

    console.log(
      "Buffer response:",
      JSON.stringify(
        bufferData,
        null,
        2
      )
    );

    /*
      HTTP-level error.
    */

    if (!bufferResponse.ok) {
      return res.status(500).json({
        success: false,
        error: "Buffer API request failed.",
        details: bufferData
      });
    }

    /*
      GraphQL-level error.
    */

    if (bufferData.errors) {
      return res.status(500).json({
        success: false,
        error: "Buffer GraphQL error.",
        details: bufferData.errors
      });
    }

    /*
      MutationError can appear inside data even
      when the HTTP request itself succeeded.
    */

    const result =
      bufferData?.data?.createPost;

    if (!result) {
      return res.status(500).json({
        success: false,
        error: "Buffer returned no createPost result.",
        details: bufferData
      });
    }

    if (result.message) {
      return res.status(500).json({
        success: false,
        error: "Buffer could not create the post.",
        message: result.message
      });
    }

    /*
      Success.
    */

    const post = result.post;

    return res.status(200).json({
      success: true,
      message: "MP4 successfully added to Buffer.",
      videoUrl,
      bufferPost: post || null
    });

  } catch (error) {
    console.error(
      "Webhook processing error:",
      error
    );

    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
