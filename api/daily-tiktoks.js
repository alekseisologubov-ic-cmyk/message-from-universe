// api/daily-tiktoks.js

const SHOTSTACK_ENDPOINT =
  "https://api.shotstack.io/edit/v1/render";

const PEXELS_ENDPOINT =
  "https://api.pexels.com/v1/videos/search";

const APP_URL =
  process.env.APP_URL ||
  "https://message-from-universe.vercel.app";

/*
 * ============================================================
 * UNIVERSE139 DAILY TIKTOK
 * ============================================================
 *
 * Creates exactly 3 videos:
 *
 *   1 = Morning
 *   2 = Afternoon
 *   3 = Evening
 *
 * Each video gets:
 *
 *   - fresh Pexels portrait background
 *   - written GOOD MORNING / AFTERNOON / EVENING
 *   - Universe139 message
 *   - existing ElevenLabs voice
 *   - DON’T IGNORE THE SIGN
 *   - UNIVERSE139
 *   - GET YOUR MESSAGE / LINK IN BIO
 *
 * The Pexels video is NOT spoken.
 */

/*
 * ============================================================
 * MESSAGE POOLS
 * ============================================================
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

/*
 * ============================================================
 * VIDEO SEARCH THEMES
 * ============================================================
 */

const VIDEO_QUERIES = {
  morning: [
    "mysterious sunrise",
    "dreamy sunrise sky",
    "golden sunrise clouds",
    "cosmic sunrise",
    "morning sky stars"
  ],

  afternoon: [
    "mysterious clouds",
    "dramatic sky",
    "cosmic energy",
    "purple sky",
    "mysterious universe"
  ],

  evening: [
    "moon night sky",
    "stars night sky",
    "dreamy galaxy",
    "purple night sky",
    "mysterious moon"
  ]
};

/*
 * ============================================================
 * DATE
 * ============================================================
 */

function getLocalDateKey() {
  const now = new Date();

  const parts =
    new Intl.DateTimeFormat(
      "en-CA",
      {
        timeZone:
          "America/Los_Angeles",

        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }
    ).formatToParts(now);

  const values =
    Object.fromEntries(
      parts
        .filter(
          (part) =>
            part.type !==
            "literal"
        )
        .map(
          (part) => [
            part.type,
            part.value
          ]
        )
    );

  return (
    `${values.year}-` +
    `${values.month}-` +
    `${values.day}`
  );
}

/*
 * ============================================================
 * DETERMINISTIC HASH
 * ============================================================
 */

function hashString(value) {
  let hash = 2166136261;

  for (
    let i = 0;
    i < value.length;
    i += 1
  ) {
    hash ^= value.charCodeAt(i);

    hash = Math.imul(
      hash,
      16777619
    );
  }

  return hash >>> 0;
}

/*
 * ============================================================
 * TODAY'S 3 CONTENT ITEMS
 * ============================================================
 */

function getTodayVideos() {
  const dateKey =
    getLocalDateKey();

  const seed =
    hashString(dateKey);

  const morningIndex =
    seed %
    MORNING_MESSAGES.length;

  const afternoonIndex =
    Math.floor(seed / 7) %
    AFTERNOON_MESSAGES.length;

  const eveningIndex =
    Math.floor(seed / 17) %
    EVENING_MESSAGES.length;

  return [
    {
      slot: 1,
      slotName: "morning",
      greeting: "GOOD MORNING",
      message:
        MORNING_MESSAGES[
          morningIndex
        ]
    },

    {
      slot: 2,
      slotName: "afternoon",
      greeting: "GOOD AFTERNOON",
      message:
        AFTERNOON_MESSAGES[
          afternoonIndex
        ]
    },

    {
      slot: 3,
      slotName: "evening",
      greeting: "GOOD EVENING",
      message:
        EVENING_MESSAGES[
          eveningIndex
        ]
    }
  ];
}

/*
 * ============================================================
 * GET PEXELS VIDEO
 * ============================================================
 */

async function getPexelsVideo(
  slotName,
  seed
) {
  const apiKey =
    process.env.PEXELS_API_KEY;

  if (!apiKey) {
    throw new Error(
      "PEXELS_API_KEY is missing"
    );
  }

  const queries =
    VIDEO_QUERIES[
      slotName
    ] || [];

  if (!queries.length) {
    throw new Error(
      `No Pexels queries configured for ${slotName}`
    );
  }

  /*
   * Change search query by day/slot.
   */
  const query =
    queries[
      seed % queries.length
    ];

  const url =
    new URL(
      PEXELS_ENDPOINT
    );

  url.searchParams.set(
    "query",
    query
  );

  url.searchParams.set(
    "orientation",
    "portrait"
  );

  url.searchParams.set(
    "size",
    "large"
  );

  url.searchParams.set(
    "page",
    String(
      (Math.floor(seed / 5) %
        5) + 1
    )
  );

  url.searchParams.set(
    "per_page",
    "40"
  );

  console.log(
    `PEXELS SEARCH ${slotName}: ${query}`
  );

  const response =
    await fetch(
      url.toString(),
      {
        method: "GET",

        headers: {
          Authorization:
            apiKey.trim()
        }
      }
    );

  let data;

  try {
    data =
      await response.json();
  } catch {
    throw new Error(
      `Pexels returned invalid JSON. HTTP ${response.status}`
    );
  }

  if (!response.ok) {
    throw new Error(
      `Pexels HTTP ${response.status}: ` +
      JSON.stringify(data)
    );
  }

  if (
    !Array.isArray(
      data?.videos
    ) ||
    data.videos.length === 0
  ) {
    throw new Error(
      `No Pexels videos found for "${query}"`
    );
  }

  /*
   * Prefer portrait videos long enough
   * for the Universe139 timeline.
   */
  const suitable =
    data.videos.filter(
      (video) => {
        const portrait =
          Number(
            video.width
          ) <
          Number(
            video.height
          );

        const longEnough =
          Number(
            video.duration || 0
          ) >= 14;

        return (
          portrait &&
          longEnough &&
          Array.isArray(
            video.video_files
          ) &&
          video.video_files.length >
            0
        );
      }
    );

  const candidates =
    suitable.length
      ? suitable
      : data.videos;

  const selected =
    candidates[
      seed % candidates.length
    ];

  /*
   * Prefer HD portrait MP4.
   */
  const files =
    Array.isArray(
      selected.video_files
    )
      ? selected.video_files
      : [];

  const mp4Files =
    files.filter(
      (file) =>
        file.file_type ===
          "video/mp4" &&
        file.link
    );

  /*
   * Prefer a reasonably large
   * portrait source without choosing
   * an unnecessarily huge 4K file.
   */
  const sortedFiles =
    mp4Files.sort(
      (a, b) => {
        const aWidth =
          Number(
            a.width || 0
          );

        const bWidth =
          Number(
            b.width || 0
          );

        const aPortrait =
          aWidth <
          Number(
            a.height || 0
          );

        const bPortrait =
          bWidth <
          Number(
            b.height || 0
          );

        if (
          aPortrait !==
          bPortrait
        ) {
          return aPortrait
            ? -1
            : 1;
        }

        return (
          Math.abs(
            aWidth - 1080
          ) -
          Math.abs(
            bWidth - 1080
          )
        );
      }
    );

  const selectedFile =
    sortedFiles[0];

  if (
    !selectedFile?.link
  ) {
    throw new Error(
      "Pexels video has no usable MP4 URL"
    );
  }

  console.log(
    `PEXELS VIDEO SELECTED ${slotName}:`,
    selected.id
  );

  return {
    id:
      selected.id,

    url:
      selectedFile.link,

    duration:
      selected.duration,

    width:
      selectedFile.width,

    height:
      selectedFile.height,

    photographer:
      selected.user?.name ||
      "",

    pexelsUrl:
      selected.url || ""
  };
}

/*
 * ============================================================
 * SHOTSTACK TIMELINE
 * ============================================================
 */

function buildTimeline(
  message,
  greeting,
  videoUrl
) {
  return {
    background: "#0a0514",

    tracks: [
      /*
       * ======================================================
       * AUDIO
       * ======================================================
       */

      {
        clips: [
          {
            asset: {
              type: "audio",

              prompt:
                "Wait... this message may be for you.",

              model:
                "elevenlabs-multilingual-v2"
            },

            start: 0,

            length: "auto"
          },

          {
            asset: {
              type: "audio",

              prompt:
                message,

              model:
                "elevenlabs-multilingual-v2"
            },

            start: 2.6,

            length: "auto"
          }
        ]
      },

      /*
       * ======================================================
       * MAIN TEXT
       * ======================================================
       */

      {
        clips: [
          /*
           * GREETING
           *
           * Visual only.
           * No audio.
           */

          {
            asset: {
              type: "rich-text",

              text:
                greeting,

              font: {
                family:
                  "1Ptgg87LROyAm0K08i4gS7lu",

                size: 62,

                weight: "400",

                color:
                  "#e9d8ff"
              },

              style: {
                letterSpacing: 1,

                textTransform:
                  "uppercase",

                lineHeight: 1.05
              },

              shadow: {
                offsetX: 0,

                offsetY: 3,

                blur: 14,

                color:
                  "#000000",

                opacity: 0.45
              },

              align: {
                horizontal:
                  "center",

                vertical:
                  "middle"
              },

              animation: {
                preset:
                  "fadeIn",

                duration:
                  0.3
              }
            },

            start:
              0.892,

            length:
              2.108,

            width:
              940,

            height:
              320,

            offset: {
              x: 0,

              y: 0.12
            },

            transition: {
              in:
                "fade",

              out:
                "fade"
            }
          },

          /*
           * MAIN MESSAGE
           */

          {
            asset: {
              type: "rich-text",

              text:
                message,

              font: {
                family:
                  "pxiEyp8kv8JHgFVrFJDUc1NECPY",

                size:
                  72,

                weight:
                  "400",

                color:
                  "#ffffff"
              },

              style: {
                lineHeight:
                  1.15
              },

              shadow: {
                offsetX: 0,

                offsetY: 4,

                blur: 24,

                color:
                  "#000000",

                opacity: 0.5
              },

              align: {
                horizontal:
                  "center",

                vertical:
                  "middle"
              },

              animation: {
                preset:
                  "fadeIn",

                duration:
                  0.8
              }
            },

            start:
              0.892,

            length:
              7.608,

            width:
              880,

            height:
              700,

            offset: {
              x: 0,

              y: 0
            },

            effect:
              "zoomInSlow",

            transition: {
              in:
                "fade",

              out:
                "fade"
            }
          },

          /*
           * SIGN
           */

          {
            asset: {
              type:
                "rich-text",

              text:
                "DON'T IGNORE THE SIGN ✨",

              font: {
                family:
                  "1Ptgg87LROyAm0K08i4gS7lu",

                size:
                  68,

                weight:
                  "400",

                color:
                  "#ffffff"
              },

              style: {
                letterSpacing:
                  1,

                textTransform:
                  "none",

                lineHeight:
                  1.05
              },

              shadow: {
                offsetX: 0,

                offsetY: 3,

                blur: 16,

                color:
                  "#000000",

                opacity:
                  0.5
              },

              align: {
                horizontal:
                  "center",

                vertical:
                  "middle"
              },

              animation: {
                preset:
                  "fadeIn",

                duration:
                  0.5
              }
            },

            start:
              8.5,

            length:
              2,

            width:
              940,

            height:
              300,

            offset: {
              x: 0,

              y: 0.16
            },

            effect:
              "zoomInSlow",

            transition: {
              in:
                "fade",

              out:
                "fade"
            }
          },

          /*
           * UNIVERSE139
           */

          {
            asset: {
              type:
                "rich-text",

              text:
                "UNIVERSE139",

              font: {
                family:
                  "pxiEyp8kv8JHgFVrFJDUc1NECPY",

                size:
                  36,

                weight:
                  "600",

                color:
                  "#c9a7ff"
              },

              style: {
                letterSpacing:
                  3,

                textTransform:
                  "uppercase"
              },

              align: {
                horizontal:
                  "center",

                vertical:
                  "middle"
              },

              animation: {
                preset:
                  "fadeIn",

                duration:
                  0.5
              }
            },

            start:
              10.5,

            length:
              1.5,

            width:
              700,

            height:
              150,

            offset: {
              x: 0,

              y: -0.22
            },

            transition: {
              in:
                "fade",

              out:
                "fade"
            }
          },

          /*
           * CTA
           */

          {
            asset: {
              type:
                "rich-text",

              text:
                "GET YOUR MESSAGE\nLINK IN BIO",

              font: {
                family:
                  "1Ptgg87LROyAm0K08i4gS7lu",

                size:
                  46,

                weight:
                  "400",

                color:
                  "#ffffff"
              },

              style: {
                letterSpacing:
                  1,

                textTransform:
                  "uppercase",

                lineHeight:
                  1.1
              },

              shadow: {
                offsetX: 0,

                offsetY: 3,

                blur: 14,

                color:
                  "#000000",

                opacity:
                  0.5
              },

              align: {
                horizontal:
                  "center",

                vertical:
                  "middle"
              },

              animation: {
                preset:
                  "fadeIn",

                duration:
                  0.4
              }
            },

            start:
              10.5,

            length:
              3.26,

            width:
              900,

            height:
              260,

            offset: {
              x: 0,

              y: 0.06
            },

            transition: {
              in:
                "fade",

              out:
                "fade"
            },

            effect:
              "zoomInSlow"
          }
        ]
      },

      /*
       * ======================================================
       * WAIT
       * ======================================================
       */

      {
        clips: [
          {
            asset: {
              type:
                "rich-text",

              text:
                "WAIT...",

              font: {
                family:
                  "1Ptgg87LROyAm0K08i4gS7lu",

                size:
                  110,

                weight:
                  "400",

                color:
                  "#ffffff"
              },

              style: {
                letterSpacing:
                  2,

                textTransform:
                  "uppercase"
              },

              shadow: {
                offsetX: 0,

                offsetY: 4,

                blur: 20,

                color:
                  "#000000",

                opacity:
                  0.5
              },

              align: {
                horizontal:
                  "center",

                vertical:
                  "middle"
              },

              animation: {
                preset:
                  "fadeIn",

                duration:
                  0.2
              }
            },

            start:
              0,

            length:
              1.5,

            width:
              900,

            height:
              300,

            offset: {
              x: 0,

              y: 0.28
            },

            transition: {
              in:
                "zoom",

              out:
                "fade"
            }
          }
        ]
      },

      /*
       * ======================================================
       * PURPLE COSMIC GLOW
       * ======================================================
       *
       * This stays on top of the Pexels video.
       */

      {
        clips: [
          {
            asset: {
              type:
                "html5",

              html:
                "<div class=\"glow\"></div>",

              css:
                "html,body{margin:0;padding:0;width:900px;height:900px;overflow:hidden;background:transparent}.glow{width:900px;height:900px;border-radius:50%;background:radial-gradient(circle, rgba(180,110,255,0.85) 0%, rgba(160,90,255,0.4) 35%, rgba(140,70,255,0) 68%);filter:blur(4px)}",

              js:
                "gsap.to('.glow',{scale:1.15,opacity:0.85,duration:3,yoyo:true,repeat:-1,ease:'sine.inOut',transformOrigin:'50% 50%'})"
            },

            start:
              2.5,

            length:
              6,

            width:
              900,

            height:
              900,

            offset: {
              x: 0,

              y: 0
            },

            effect:
              "zoomInSlow",

            transition: {
              in:
                "fade",

              out:
                "fade"
            }
          }
        ]
      },

      /*
       * ======================================================
       * PEXELS VIDEO BACKGROUND
       * ======================================================
       *
       * This replaces the old full-screen HTML5 sky.
       *
       * The video URL comes from Pexels at runtime.
       */

      {
        clips: [
          {
            asset: {
              type:
                "video",

              src:
                videoUrl,

              volume:
                0,

              fit:
                "cover"
            },

            start:
              0,

            length:
              13.8,

            width:
              1080,

            height:
              1920,

            transition: {
              in:
                "fade",

              out:
                "fade"
            }
          }
        ]
      }
    ]
  };
}

/*
 * ============================================================
 * RENDER ONE VIDEO
 * ============================================================
 */

async function renderVideo(
  video,
  background,
  dateKey,
  seed
) {
  const apiKey =
    process.env.SHOTSTACK_API_KEY;

  if (!apiKey) {
    throw new Error(
      "SHOTSTACK_API_KEY is missing"
    );
  }

  const callbackUrl =
    `${APP_URL}/api/shotstack-webhook` +
    `?message=${encodeURIComponent(
      video.message
    )}` +
    `&slot=${encodeURIComponent(
      video.slot
    )}` +
    `&slotName=${encodeURIComponent(
      video.slotName
    )}` +
    `&greeting=${encodeURIComponent(
      video.greeting
    )}` +
    `&date=${encodeURIComponent(
      dateKey
    )}` +
    `&pexelsId=${encodeURIComponent(
      background.id
    )}`;

  const edit = {
    timeline:
      buildTimeline(
        video.message,
        video.greeting,
        background.url
      ),

    output: {
      size: {
        width:
          1080,

        height:
          1920
      },

      format:
        "mp4",

      fps:
        30
    },

    callback:
      callbackUrl
  };

  console.log(
    `SHOTSTACK SLOT ${video.slot} (${video.slotName})`
  );

  console.log(
    JSON.stringify(
      {
        date:
          dateKey,

        greeting:
          video.greeting,

        message:
          video.message,

        pexelsId:
          background.id
      },
      null,
      2
    )
  );

  const response =
    await fetch(
      SHOTSTACK_ENDPOINT,
      {
        method:
          "POST",

        headers: {
          Accept:
            "application/json",

          "Content-Type":
            "application/json",

          "x-api-key":
            apiKey.trim()
        },

        body:
          JSON.stringify(
            edit
          )
      }
    );

  let data;

  try {
    data =
      await response.json();
  } catch {
    throw new Error(
      `Shotstack returned invalid JSON. HTTP ${response.status}`
    );
  }

  console.log(
    `SHOTSTACK RESPONSE SLOT ${video.slot}:`,
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
    slot:
      video.slot,

    slotName:
      video.slotName,

    greeting:
      video.greeting,

    message:
      video.message,

    pexelsId:
      background.id,

    pexelsUrl:
      background.pexelsUrl,

    renderId,

    status:
      "queued"
  };
}

/*
 * ============================================================
 * VERCEL HANDLER
 * ============================================================
 */

export default async function handler(
  req,
  res
) {
  if (
    req.method !== "GET" &&
    req.method !== "POST"
  ) {
    return res.status(405).json({
      success:
        false,

      error:
        "Method not allowed"
    });
  }

  /*
   * Vercel Cron authentication.
   */
  const cronSecret =
    process.env.CRON_SECRET;

  if (cronSecret) {
    const authorization =
      req.headers.authorization ||
      "";

    if (
      authorization !==
      `Bearer ${cronSecret}`
    ) {
      return res.status(401).json({
        success:
          false,

        error:
          "Unauthorized"
      });
    }
  }

  try {
    const dateKey =
      getLocalDateKey();

    const videos =
      getTodayVideos();

    const baseSeed =
      hashString(
        dateKey
      );

    console.log(
      `UNIVERSE139 DAILY TIKTOKS: ${dateKey}`
    );

    /*
     * Get one Pexels background
     * for each slot.
     */
    const prepared =
      await Promise.all(
        videos.map(
          async (video) => {
            const slotSeed =
              baseSeed +
              video.slot * 1009;

            const background =
              await getPexelsVideo(
                video.slotName,
                slotSeed
              );

            return {
              video,
              background,
              seed:
                slotSeed
            };
          }
        )
      );

    /*
     * Create exactly 3 Shotstack jobs.
     */
    const results =
      await Promise.allSettled(
        prepared.map(
          ({
            video,
            background,
            seed
          }) =>
            renderVideo(
              video,
              background,
              dateKey,
              seed
            )
        )
      );

    const output =
      results.map(
        (
          result,
          index
        ) => {
          if (
            result.status ===
            "fulfilled"
          ) {
            return result.value;
          }

          return {
            slot:
              prepared[index]
                .video.slot,

            slotName:
              prepared[index]
                .video.slotName,

            greeting:
              prepared[index]
                .video.greeting,

            message:
              prepared[index]
                .video.message,

            pexelsId:
              prepared[index]
                .background.id,

            status:
              "failed",

            error:
              result.reason
                ?.message ||
              String(
                result.reason
              )
          };
        }
      );

    const created =
      output.filter(
        (video) =>
          video.status ===
          "queued"
      ).length;

    /*
     * If all three failed,
     * return HTTP 500.
     */
    if (created === 0) {
      return res.status(500).json({
        success:
          false,

        created:
          0,

        total:
          3,

        date:
          dateKey,

        videos:
          output
      });
    }

    return res.status(200).json({
      success:
        true,

      created,

      total:
        3,

      date:
        dateKey,

      videos:
        output
    });

  } catch (error) {
    console.error(
      "DAILY TIKTOK ERROR:",
      error
    );

    return res.status(500).json({
      success:
        false,

      error:
        error?.message ||
        String(error)
    });
  }
}
