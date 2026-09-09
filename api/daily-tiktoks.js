// api/daily-tiktoks.js

const MESSAGES = [
  "Something you have been waiting for is closer than you think.",
  "You do not need to have everything figured out. Take the next step.",
  "A new beginning is quietly making its way toward you.",
  "Trust what feels right, even when the path is not completely clear.",
  "What is meant for you does not need to be forced.",
  "Today may bring a small sign that changes how you see everything.",
  "Let go of what is no longer yours. Make room for what is coming.",
  "Your energy is shifting. Pay attention to the opportunities around you.",
  "The answer you are looking for may arrive in an unexpected form.",
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
  "There is still more possibility ahead than you can see right now."
];

const THEMES = [
  "new beginning",
  "trust",
  "timing"
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

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function createBackgroundSvg() {
  return `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="1080"
  height="1920"
  viewBox="0 0 1080 1920"
>
  <defs>
    <radialGradient id="bg" cx="50%" cy="10%" r="95%">
      <stop offset="0%" stop-color="#4b3470"/>
      <stop offset="28%" stop-color="#261541"/>
      <stop offset="60%" stop-color="#11091e"/>
      <stop offset="100%" stop-color="#050309"/>
    </radialGradient>

    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop
        offset="0%"
        stop-color="#b276ff"
        stop-opacity="0.28"
      />
      <stop
        offset="100%"
        stop-color="#b276ff"
        stop-opacity="0"
      />
    </radialGradient>

    <filter
      id="blur"
      x="-100%"
      y="-100%"
      width="300%"
      height="300%"
    >
      <feGaussianBlur stdDeviation="45"/>
    </filter>
  </defs>

  <rect
    width="1080"
    height="1920"
    fill="url(#bg)"
  />

  <circle
    cx="540"
    cy="650"
    r="420"
    fill="url(#glow)"
    filter="url(#blur)"
  />

  <g fill="white">
    <circle cx="95" cy="150" r="3" opacity="0.8"/>
    <circle cx="220" cy="280" r="2" opacity="0.6"/>
    <circle cx="870" cy="190" r="3" opacity="0.75"/>
    <circle cx="980" cy="390" r="2" opacity="0.6"/>
    <circle cx="140" cy="600" r="2" opacity="0.7"/>
    <circle cx="920" cy="690" r="3" opacity="0.5"/>
    <circle cx="85" cy="1030" r="2" opacity="0.7"/>
    <circle cx="1000" cy="1150" r="3" opacity="0.65"/>
    <circle cx="170" cy="1370" r="3" opacity="0.55"/>
    <circle cx="860" cy="1450" r="2" opacity="0.7"/>
    <circle cx="300" cy="1640" r="2" opacity="0.6"/>
    <circle cx="760" cy="1750" r="3" opacity="0.7"/>
  </g>

  <circle
    cx="540"
    cy="650"
    r="220"
    fill="none"
    stroke="white"
    stroke-opacity="0.07"
    stroke-width="2"
  />

  <circle
    cx="540"
    cy="650"
    r="275"
    fill="none"
    stroke="white"
    stroke-opacity="0.04"
    stroke-width="2"
  />
</svg>
`;
}

function createLogoSvg() {
  return `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="900"
  height="160"
  viewBox="0 0 900 160"
>
  <text
    x="450"
    y="90"
    text-anchor="middle"
    fill="white"
    fill-opacity="0.78"
    font-family="Arial, Helvetica, sans-serif"
    font-size="42"
    font-weight="700"
    letter-spacing="9"
  >
    UNIVERSE139
  </text>
</svg>
`;
}

function createTitleSvg() {
  return `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="900"
  height="160"
  viewBox="0 0 900 160"
>
  <text
    x="450"
    y="90"
    text-anchor="middle"
    fill="white"
    fill-opacity="0.55"
    font-family="Arial, Helvetica, sans-serif"
    font-size="27"
    letter-spacing="5"
  >
    A MESSAGE FOR YOU
  </text>
</svg>
`;
}

function createMessageSvg(message) {
  return `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="900"
  height="900"
  viewBox="0 0 900 900"
>
  <foreignObject
    x="40"
    y="40"
    width="820"
    height="820"
  >
    <div
      xmlns="http://www.w3.org/1999/xhtml"
      style="
        width:820px;
        height:820px;
        display:flex;
        align-items:center;
        justify-content:center;
        text-align:center;
        font-family:Arial,Helvetica,sans-serif;
        color:white;
        font-size:56px;
        line-height:1.35;
        font-weight:500;
        padding:70px;
      "
    >
      ${escapeXml(message)}
    </div>
  </foreignObject>
</svg>
`;
}

function createFooterSvg() {
  return `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="900"
  height="190"
  viewBox="0 0 900 190"
>
  <text
    x="450"
    y="70"
    text-anchor="middle"
    fill="white"
    fill-opacity="0.55"
    font-family="Arial, Helvetica, sans-serif"
    font-size="24"
    letter-spacing="3"
  >
    YOU WERE GUIDED HERE FOR A REASON
  </text>

  <text
    x="450"
    y="125"
    text-anchor="middle"
    fill="white"
    fill-opacity="0.36"
    font-family="Arial, Helvetica, sans-serif"
    font-size="20"
  >
    MESSAGE FROM THE UNIVERSE
  </text>
</svg>
`;
}

function buildRenderPayload(message, slot) {
  const appUrl =
    process.env.APP_URL ||
    "https://message-from-universe.vercel.app";

  const callbackUrl =
    `${appUrl}/api/shotstack-webhook` +
    `?message=${encodeURIComponent(message)}` +
    `&slot=${slot}`;

  return {
    timeline: {
      background: "#080512",
      tracks: [
        {
          clips: [
            {
              asset: {
                type: "html",
                html: createBackgroundSvg(),
                width: 1080,
                height: 1920
              },
              start: 0,
              length: 10
            }
          ]
        },
        {
          clips: [
            {
              asset: {
                type: "html",
                html: createLogoSvg(),
                width: 900,
                height: 160
              },
              start: 0,
              length: 10,
              position: "top",
              offset: {
                x: 0,
                y: 0.08
              }
            }
          ]
        },
        {
          clips: [
            {
              asset: {
                type: "html",
                html: createTitleSvg(),
                width: 900,
                height: 160
              },
              start: 0.5,
              length: 9
            }
          ]
        },
        {
          clips: [
            {
              asset: {
                type: "html",
                html: createMessageSvg(message),
                width: 900,
                height: 900
              },
              start: 1,
              length: 8
            }
          ]
        },
        {
          clips: [
            {
              asset: {
                type: "html",
                html: createFooterSvg(),
                width: 900,
                height: 190
              },
              start: 8,
              length: 2
            }
          ]
        }
      ]
    },

    output: {
      format: "mp4",
      resolution: "hd",
      aspectRatio: "9:16",
      fps: 30,
      quality: "high",
      size: {
        width: 1080,
        height: 1920
      }
    },

    callback: callbackUrl
  };
}

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed"
    });
  }

  const cronSecret = process.env.CRON_SECRET;

  /*
   * Allow manual testing only when no CRON_SECRET exists.
   * Once CRON_SECRET is configured, the endpoint requires it.
   */
  if (cronSecret) {
    const authorization =
      req.headers.authorization || "";

    const expected =
      `Bearer ${cronSecret}`;

    if (authorization !== expected) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized"
      });
    }
  }

  const shotstackKey =
    process.env.SHOTSTACK_API_KEY;

  if (!shotstackKey) {
    return res.status(500).json({
      success: false,
      error: "SHOTSTACK_API_KEY is missing"
    });
  }

  const day = getDayNumber();

  /*
   * Create three different messages every day.
   */
  const selected = [
    MESSAGES[(day * 3) % MESSAGES.length],
    MESSAGES[(day * 3 + 1) % MESSAGES.length],
    MESSAGES[(day * 3 + 2) % MESSAGES.length]
  ];

  const results = [];

  for (let i = 0; i < 3; i++) {
    try {
      const renderPayload =
        buildRenderPayload(
          selected[i],
          i + 1
        );

      const response = await fetch(
        "https://api.shotstack.io/edit/v1/render",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": shotstackKey
          },
          body: JSON.stringify(renderPayload)
        }
      );

      const data = await response.json();

      results.push({
        slot: i + 1,
        message: selected[i],
        success: response.ok,
        renderId:
          data?.response?.id || null,
        status:
          data?.response?.status ||
          null,
        error:
          response.ok
            ? null
            : data
      });

    } catch (error) {
      results.push({
        slot: i + 1,
        message: selected[i],
        success: false,
        error: error.message
      });
    }
  }

  return res.status(200).json({
    success: results.some(
      item => item.success
    ),
    created: results.filter(
      item => item.success
    ).length,
    total: 3,
    videos: results
  });
}
