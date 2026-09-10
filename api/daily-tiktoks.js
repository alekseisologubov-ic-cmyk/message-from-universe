// api/daily-tiktoks.js

const TEMPLATE_ID =
  "6602ea2c-d887-4666-8bcd-feaac57de0c9";

const SHOTSTACK_ENDPOINT =
  "https://api.shotstack.io/edit/v1/templates/render";

const APP_URL =
  process.env.APP_URL ||
  "https://message-from-universe.vercel.app";

const MESSAGES = [
  "Something you've been waiting for is closer than you think.",
  "The answer may arrive when you stop looking for it.",
  "A new beginning is already moving toward you.",
  "Trust what feels right, even when the path is not completely clear.",
  "What is meant for you does not need to be forced.",
  "Today may bring a small sign that changes how you see everything.",
  "Let go of what is no longer yours. Make room for what is coming.",
  "Your energy is shifting. Pay attention to what appears today.",
  "The answer you're looking for may arrive in an unexpected form.",
  "You are closer to your breakthrough than you realize.",
  "Something unexpected may open a door you thought was closed.",
  "Your next chapter does not need permission from your past.",
  "Slow progress is still progress. Keep moving.",
  "What feels like a delay may actually be preparation.",
  "Today, choose the path that gives you peace.",
  "A small decision today may create a much bigger change tomorrow.",
  "You are allowed to begin again.",
  "The right opportunity may appear when you stop chasing the wrong one.",
  "Your intuition knows more than your fear does.",
  "There is still more possibility ahead than you can see right now.",
  "What is coming may be better than what you were asking for.",
  "You do not need to know the whole path. Just take the next step.",
  "Something is quietly falling into place.",
  "The moment you stop forcing it may be the moment it arrives.",
  "Your story is changing, even if you cannot see it yet.",
  "A door may open where you least expect it.",
  "What you need may already be closer than you think.",
  "Your timing is not wrong. Your timing is your own.",
  "You may soon understand why things had to happen this way.",
  "The energy around you is changing. Stay open.",
  "Your patience is about to make sense.",
  "One small sign today may be enough.",
  "You are not behind. You are becoming.",
  "Something you've almost given up on may surprise you.",
  "Your next opportunity may look different from what you expected.",
  "What feels uncertain today may become clear very soon.",
  "There is a reason you are seeing this message now.",
  "Trust the quiet feeling inside you.",
  "The chapter ahead may be brighter than the one behind you."
];

function getDayNumber() {
  const start = Date.UTC(2026, 0, 1);

  const now = new Date();

  const today = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  );

  return Math.floor(
    (today - start) / 86400000
  );
}

function getTodayMessages() {
  const day = getDayNumber();

  const first =
    Math.abs(day * 3) % MESSAGES.length;

  return [
    MESSAGES[first],
    MESSAGES[(first + 1) % MESSAGES.length],
    MESSAGES[(first + 2) % MESSAGES.length]
  ];
}

async function renderTemplate(message, slot) {
  const apiKey =
    process.env.SHOTSTACK_API_KEY;

  if (!apiKey) {
    throw new Error(
      "SHOTSTACK_API_KEY is missing"
    );
  }

  /*
   * Pass the message through the callback URL
   * so the webhook knows exactly which message
   * belongs to this render.
   */
  const callbackUrl =
    `${APP_URL}/api/shotstack-webhook` +
    `?message=${encodeURIComponent(message)}` +
    `&slot=${encodeURIComponent(slot)}`;

  const requestBody = {
    id: TEMPLATE_ID,

    merge: [
      {
        find: "MESSAGE",
        replace: message
      }
    ],

    callback: callbackUrl
  };

  console.log(
    `SHOTSTACK REQUEST SLOT ${slot}:`,
    JSON.stringify(requestBody, null, 2)
  );

  const response = await fetch(
    SHOTSTACK_ENDPOINT,
    {
      method: "POST",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-api-key": apiKey.trim()
      },

      body: JSON.stringify(requestBody)
    }
  );

  const data = await response.json();

  console.log(
    `SHOTSTACK RESPONSE SLOT ${slot}:`,
    JSON.stringify(data, null, 2)
  );

  if (!response.ok) {
    throw new Error(
      `Shotstack HTTP ${response.status}: ` +
      JSON.stringify(data)
    );
  }

  if (!data?.success) {
    throw new Error(
      "Shotstack rejected the request: " +
      JSON.stringify(data)
    );
  }

  const renderId =
    data?.response?.id;

  if (!renderId) {
    throw new Error(
      "Shotstack returned no render ID: " +
      JSON.stringify(data)
    );
  }

  return {
    slot,
    message,
    renderId,
    status: "queued"
  };
}

export default async function handler(req, res) {
  if (
    req.method !== "GET" &&
    req.method !== "POST"
  ) {
    return res.status(405).json({
      success: false,
      error: "Method not allowed"
    });
  }

  /*
   * Vercel Cron authentication.
   */
  const cronSecret =
    process.env.CRON_SECRET;

  if (cronSecret) {
    const authorization =
      req.headers.authorization || "";

    if (
      authorization !==
      `Bearer ${cronSecret}`
    ) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized"
      });
    }
  }

  try {
    const messages =
      getTodayMessages();

    console.log(
      "TODAY'S MESSAGES:",
      JSON.stringify(messages, null, 2)
    );

    /*
     * Create exactly 3 renders.
     */
    const results =
      await Promise.allSettled(
        messages.map(
          (message, index) =>
            renderTemplate(
              message,
              index + 1
            )
        )
      );

    const videos =
      results.map(
        (result, index) => {
          if (
            result.status ===
            "fulfilled"
          ) {
            return result.value;
          }

          return {
            slot: index + 1,
            message: messages[index],
            status: "failed",
            error:
              result.reason?.message ||
              String(result.reason)
          };
        }
      );

    const created =
      videos.filter(
        video =>
          video.status === "queued"
      ).length;

    /*
     * Do not return a fake success if all
     * three Shotstack renders failed.
     */
    if (created === 0) {
      return res.status(500).json({
        success: false,
        created: 0,
        total: 3,
        templateId: TEMPLATE_ID,
        videos
      });
    }

    return res.status(200).json({
      success: true,
      created,
      total: 3,
      templateId: TEMPLATE_ID,
      videos
    });

  } catch (error) {
    console.error(
      "DAILY TIKTOK ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
