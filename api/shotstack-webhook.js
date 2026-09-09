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
    console.error("BUFFER_API_KEY is missing");

    return res.status(500).json({
      success: false,
      error: "BUFFER_API_KEY is missing"
    });
  }

  if (!channelId) {
    console.error("BUFFER_TIKTOK_CHANNEL_ID is missing");

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

  /*
   * Shotstack can send different webhook events.
   *
   * We only want the completed EDIT render.
   *
   * type = edit
   * status = done
   */

  const isCompletedEdit =
    payload.type === "edit" &&
    payload.status === "done" &&
    payload.url;

  /*
   * Ignore other callbacks such as:
   *
   * type = serve
   * action = copy
   *
   * because they can be sent separately.
   */

  if (!isCompletedEdit) {
    return res.status(200).json({
      success: true,
      ignored: true,
      type: payload.type || null,
      status: payload.status || null,
      action: payload.action || null
    });
  }

  const videoUrl = String(payload.url).trim();

  if (!videoUrl.startsWith("http")) {
    return res.status(400).json({
      success: false,
      error: "Invalid video URL",
      videoUrl
    });
  }

  /*
   * TikTok caption
   */

  const caption =
    "✨ A message from the universe, just for you.\n\n" +
    "Today may bring a small sign that changes how you see everything.\n\n" +
    "Discover your personal message:\n" +
    "https://message-from-universe.vercel.app/\n\n" +
    "#Universe139 #MessageFromTheUniverse #DailyMessage #Universe #Motivation #DailyInspiration";

  /*
   * Current Buffer GraphQL mutation.
   */

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
    /*
     * IMPORTANT:
     * Build the Authorization header directly from the
     * Vercel secret. Do not include the GraphQL query
     * inside the header.
     */

    const authorization =
      "Bearer " + String(bufferApiKey).trim();

    const response = await fetch(
      "https://api.buffer.com",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": authorization
        },

        body: JSON.stringify({
          query: query
        })
      }
    );

    const data = await response.json();

    console.log(
      "BUFFER RESPONSE:",
      JSON.stringify(data, null, 2)
    );

    /*
     * GraphQL errors
     */

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
        error: "Buffer returned no createPost result",
        details: data
      });
    }

    /*
     * Buffer may return a typed MutationError.
     */

    if (result.message) {
      return res.status(500).json({
        success: false,
        error: result.message
      });
    }

    /*
     * SUCCESS
     */

    return res.status(200).json({
      success: true,
      message: "TikTok video added to Buffer queue",
      videoUrl: videoUrl,
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
