// api/create-tiktok.js

export default async function handler(req, res) {
  // Allow GET for easy browser testing and POST for automation.
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed"
    });
  }

  const API_KEY = process.env.SHOTSTACK_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({
      success: false,
      error: "SHOTSTACK_API_KEY is not configured in Vercel."
    });
  }

  // You can change this later to generate dynamic messages.
  const messages = [
    "Something you have been waiting for is closer than you think.",
    "You do not need to have everything figured out. Take the next step.",
    "A new beginning is quietly making its way toward you.",
    "Trust what feels right, even when the path is not completely clear.",
    "What is meant for you does not need to be forced.",
    "Today may bring a small sign that changes how you see everything.",
    "Let go of what is no longer yours. Make room for what is coming.",
    "Your energy is shifting. Pay attention to the opportunities around you.",
    "The answer you are looking for may arrive in an unexpected form.",
    "You are closer to your breakthrough than you realize."
  ];

  // Select one message based on the current day.
  const today = new Date();
  const dayNumber = Math.floor(
    Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate()
    ) / 86400000
  );

  const message =
    messages[Math.abs(dayNumber) % messages.length];

  // Escape characters so the message is safe inside SVG.
  function escapeXml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  const safeMessage = escapeXml(message);

  /*
    1080 x 1920 = 9:16 vertical TikTok format.
  */

  const backgroundSvg = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1080"
      height="1920"
      viewBox="0 0 1080 1920"
    >
      <defs>
        <radialGradient
          id="bg"
          cx="50%"
          cy="10%"
          r="95%"
        >
          <stop
            offset="0%"
            stop-color="#4b3470"
          />
          <stop
            offset="28%"
            stop-color="#261541"
          />
          <stop
            offset="60%"
            stop-color="#11091e"
          />
          <stop
            offset="100%"
            stop-color="#050309"
          />
        </radialGradient>

        <radialGradient
          id="glow"
          cx="50%"
          cy="50%"
          r="50%"
        >
          <stop
            offset="0%"
            stop-color="#b276ff"
            stop-opacity="0.30"
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

      <!-- Background -->
      <rect
        width="1080"
        height="1920"
        fill="url(#bg)"
      />

      <!-- Central glow -->
      <circle
        cx="540"
        cy="680"
        r="400"
        fill="url(#glow)"
        filter="url(#blur)"
      />

      <!-- Stars -->
      <g fill="white">
        <circle cx="100" cy="160" r="3" opacity="0.75"/>
        <circle cx="220" cy="310" r="2" opacity="0.55"/>
        <circle cx="870" cy="180" r="3" opacity="0.80"/>
        <circle cx="970" cy="400" r="2" opacity="0.60"/>
        <circle cx="150" cy="620" r="2" opacity="0.75"/>
        <circle cx="920" cy="700" r="3" opacity="0.55"/>
        <circle cx="80" cy="1000" r="2" opacity="0.80"/>
        <circle cx="1000" cy="1120" r="3" opacity="0.65"/>
        <circle cx="180" cy="1350" r="3" opacity="0.60"/>
        <circle cx="850" cy="1420" r="2" opacity="0.75"/>
        <circle cx="300" cy="1640" r="2" opacity="0.60"/>
        <circle cx="760" cy="1740" r="3" opacity="0.70"/>
      </g>

      <!-- Decorative circle -->
      <circle
        cx="540"
        cy="640"
        r="210"
        fill="none"
        stroke="#ffffff"
        stroke-opacity="0.08"
        stroke-width="2"
      />

      <circle
        cx="540"
        cy="640"
        r="260"
        fill="none"
        stroke="#ffffff"
        stroke-opacity="0.05"
        stroke-width="2"
      />
    </svg>
  `;

  const logoSvg = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="900"
      height="160"
      viewBox="0 0 900 160"
    >
      <text
        x="450"
        y="92"
        text-anchor="middle"
        fill="white"
        fill-opacity="0.75"
        font-family="Arial, Helvetica, sans-serif"
        font-size="42"
        font-weight="700"
        letter-spacing="9"
      >
        UNIVERSE139
      </text>
    </svg>
  `;

  const titleSvg = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="900"
      height="180"
      viewBox="0 0 900 180"
    >
      <text
        x="450"
        y="105"
        text-anchor="middle"
        fill="white"
        fill-opacity="0.55"
        font-family="Arial, Helvetica, sans-serif"
        font-size="28"
        letter-spacing="5"
      >
        A MESSAGE FOR YOU
      </text>
    </svg>
  `;

  const messageSvg = `
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
            padding:60px;
          "
        >
          ${safeMessage}
        </div>
      </foreignObject>
    </svg>
  `;

  const footerSvg = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="900"
      height="180"
      viewBox="0 0 900 180"
    >
      <text
        x="450"
        y="75"
        text-anchor="middle"
        fill="white"
        fill-opacity="0.55"
        font-family="Arial, Helvetica, sans-serif"
        font-size="25"
        letter-spacing="3"
      >
        YOU WERE GUIDED HERE FOR A REASON
      </text>

      <text
        x="450"
        y="125"
        text-anchor="middle"
        fill="white"
        fill-opacity="0.35"
        font-family="Arial, Helvetica, sans-serif"
        font-size="21"
      >
        message-from-universe.vercel.app
      </text>
    </svg>
  `;

  const renderPayload = {
    timeline: {
      background: "#080512",

      tracks: [
        // Background
        {
          clips: [
            {
              asset: {
                type: "html",
                html: backgroundSvg,
                width: 1080,
                height: 1920
              },
              start: 0,
              length: 10
            }
          ]
        },

        // Logo
        {
          clips: [
            {
              asset: {
                type: "html",
                html: logoSvg,
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

        // Title
        {
          clips: [
            {
              asset: {
                type: "html",
                html: titleSvg,
                width: 900,
                height: 180
              },
              start: 0.5,
              length: 9
            }
          ]
        },

        // Message
        {
          clips: [
            {
              asset: {
                type: "html",
                html: messageSvg,
                width: 900,
                height: 900
              },
              start: 1,
              length: 8
            }
          ]
        },

        // Footer
        {
          clips: [
            {
              asset: {
                type: "html",
                html: footerSvg,
                width: 900,
                height: 180
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

    // Shotstack will notify this endpoint after rendering.
    callback:
      "https://message-from-universe.vercel.app/api/shotstack-webhook"
  };

  try {
    const response = await fetch(
  "https://api.shotstack.io/edit/v1/render",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY
        },

        body: JSON.stringify(renderPayload)
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(
        "Shotstack error:",
        JSON.stringify(data, null, 2)
      );

      return res.status(500).json({
        success: false,
        error: "Shotstack rejected the render request.",
        details: data
      });
    }

    return res.status(200).json({
      success: true,
      message,
      renderId:
        data?.response?.id ||
        data?.id ||
        null,
      status:
        data?.response?.status ||
        "queued",
      shotstack: data
    });

  } catch (error) {
    console.error(
      "Create TikTok error:",
      error
    );

    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
