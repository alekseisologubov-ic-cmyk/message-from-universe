// api/daily-tiktoks.js

const TEMPLATE_ID =
  "6602ea2c-d887-4666-8bcd-feaac57de0c9";

const SHOTSTACK_ENDPOINT =
  "https://api.shotstack.io/edit/v1/templates/render";

const APP_URL =
  process.env.APP_URL ||
  "https://message-from-universe.vercel.app";

/*
 * Universe139 daily content.
 *
 * Each day gets exactly 3 messages:
 *   1 = Morning
 *   2 = Afternoon
 *   3 = Evening
 *
 * The messages are selected deterministically from separate pools,
 * so the same calendar day always produces the same 3 messages.
 */

const MORNING_MESSAGES = [
  "Something quiet is aligning for you. You may not see it yet, but the door is already opening.",
  "This morning carries a possibility you almost stopped believing in. Leave room for it.",
  "Before the world gets loud, remember this: not everything meant for you has arrived yet.",
  "A gentle change is beginning beneath the surface. Do not dismiss what feels different today.",
  "There is more ahead than what yesterday showed you. Start today without assuming you know the ending.",
  "Something is making its way toward you without asking for your attention. Notice the quiet signs.",
  "The next chapter may begin with something so small you almost overlook it. Stay awake to possibility.",
  "You do not need a perfect plan this morning. One honest step can change the direction of a day.",
  "A door can begin opening long before you hear the click. Trust what is quietly shifting.",
  "Today may feel ordinary at first. That does not mean something extraordinary is not moving underneath it.",
  "Your path is not as empty as it looks. Some answers are still traveling toward you.",
  "Begin gently today. What is meant to grow in your life does not need to arrive all at once.",
  "There is a reason you felt the need to pause. Something important may become clearer when you listen.",
  "You may be entering a season where less force creates more movement. Let today unfold differently.",
  "A possibility you thought had passed may be finding its way back to you in another form."
];

const AFTERNOON_MESSAGES = [
  "The answer may arrive from a direction you stopped watching. Stay open to the unexpected.",
  "If today took an unfamiliar turn, do not rush to call it a setback. The route may be changing for a reason.",
  "Something you were not looking for may matter more than what you were chasing. Pay attention to the interruption.",
  "The smallest conversation today could shift a decision you thought was already made.",
  "Not every closed door is a rejection. Some are simply redirecting you toward a better entrance.",
  "What looks like a delay in the middle of the day may be creating space for something more useful to arrive.",
  "A coincidence today may feel strangely precise. You do not have to explain it to notice it.",
  "Your next clue may not look like an answer. It may look like a person, a sentence, or a sudden change of plan.",
  "Sometimes the sign is not what appears, but what suddenly stops feeling right.",
  "You are allowed to change your mind when new information changes the path in front of you.",
  "A surprising opportunity can feel inconvenient at first. Give the unusual option a second look.",
  "What if the thing that interrupted your plans is exactly what needed your attention today?",
  "You may discover that the missing piece was never far away. You simply had not looked from this angle.",
  "The right moment does not always announce itself. Sometimes it arrives disguised as a small choice.",
  "Something unexpected may make sense later. For now, stay curious instead of certain."
];

const EVENING_MESSAGES = [
  "Tonight, release the question for a moment. What is meant for you does not need to be chased.",
  "You do not have to solve tomorrow tonight. Let your mind rest from what it cannot control yet.",
  "Some answers become visible only after the noise settles. Give yourself permission to be still.",
  "Leave one fear outside the door tonight. It does not need to follow you into the next chapter.",
  "The day did not need to be perfect to move you forward. Some progress happens quietly.",
  "What felt confusing this morning may look different after everything you learned today. Let that be enough for now.",
  "Not every unanswered question is a warning. Some are simply waiting for the right moment.",
  "Before you sleep, remember how much can change between one ordinary night and one unexpected morning.",
  "You can close this day without having every answer. Peace does not require certainty.",
  "Something you are worried about may already be moving toward resolution beyond what you can see.",
  "Tonight is not the end of the story. It is only the quiet space between chapters.",
  "Put down what you cannot carry any farther. Tomorrow deserves a little more room.",
  "The future does not need to be clear tonight. Let hope remain without demanding proof.",
  "There are things you will understand later that you cannot force yourself to understand now.",
  "Rest knowing that one difficult day does not get to decide what comes next."
];

function getLocalDateKey() {
  /*
   * Use Pacific Time for the Universe139 publishing day.
   * Vercel Cron itself runs in UTC, but content selection follows
   * America/Los_Angeles.
   */
  const now = new Date();

  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(now);

  const values = Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value])
  );

  return `${values.year}-${values.month}-${values.day}`;
}

function hashString(value) {
  let hash = 2166136261;

  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function getTodayMessages() {
  const dateKey = getLocalDateKey();
  const seed = hashString(dateKey);

  const morning =
    MORNING_MESSAGES[
      seed % MORNING_MESSAGES.length
    ];

  const afternoon =
    AFTERNOON_MESSAGES[
      Math.floor(seed / 7) %
        AFTERNOON_MESSAGES.length
    ];

  const evening =
    EVENING_MESSAGES[
      Math.floor(seed / 17) %
        EVENING_MESSAGES.length
    ];

  return [
    morning,
    afternoon,
    evening
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

  const slotName =
    slot === 1
      ? "morning"
      : slot === 2
        ? "afternoon"
        : "evening";

  /*
   * Pass message + slot information to webhook.
   */
  const callbackUrl =
    `${APP_URL}/api/shotstack-webhook` +
    `?message=${encodeURIComponent(message)}` +
    `&slot=${encodeURIComponent(slot)}` +
    `&slotName=${encodeURIComponent(slotName)}`;

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
    `SHOTSTACK REQUEST SLOT ${slot} (${slotName}):`,
    JSON.stringify(
      requestBody,
      null,
      2
    )
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

  const data =
    await response.json();

  console.log(
    `SHOTSTACK RESPONSE SLOT ${slot}:`,
    JSON.stringify(
      data,
      null,
      2
    )
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
    slotName,
    message,
    renderId,
    status: "queued"
  };
}

export default async function handler(
  req,
  res
) {
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
    const dateKey =
      getLocalDateKey();

    const messages =
      getTodayMessages();

    console.log(
      `GENERATING UNIVERSE139 TIKTOKS FOR ${dateKey}`
    );

    console.log(
      "TODAY'S MESSAGES:",
      JSON.stringify(
        messages,
        null,
        2
      )
    );

    /*
     * Create exactly 3 renders:
     *
     * 1 = Morning
     * 2 = Afternoon
     * 3 = Evening
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

            slotName:
              index === 0
                ? "morning"
                : index === 1
                  ? "afternoon"
                  : "evening",

            message:
              messages[index],

            status: "failed",

            error:
              result.reason?.message ||
              String(result.reason)
          };
        }
      );

    const created =
      videos.filter(
        (video) =>
          video.status ===
          "queued"
      ).length;

    /*
     * Do not report success if all 3
     * Shotstack renders failed.
     */
    if (created === 0) {
      return res.status(500).json({
        success: false,
        created: 0,
        total: 3,
        date: dateKey,
        templateId: TEMPLATE_ID,
        videos
      });
    }

    return res.status(200).json({
      success: true,
      created,
      total: 3,
      date: dateKey,
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
      error:
        error?.message ||
        String(error)
    });
  }
}
