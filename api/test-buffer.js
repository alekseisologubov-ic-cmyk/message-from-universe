// api/test-buffer.js

export default async function handler(req, res) {
  const rawKey = process.env.BUFFER_API_KEY;
  const key = typeof rawKey === "string" ? rawKey.trim() : "";

  const diagnostic = {
    exists: Boolean(rawKey),
    length: key.length,
    startsWithMutation: key.startsWith("mutation"),
    startsWithBearer: key.startsWith("Bearer"),
    containsNewline: /[\r\n]/.test(key),
    prefix: key.substring(0, 6)
  };

  console.log("BUFFER KEY DIAGNOSTIC:", diagnostic);

  if (!key) {
    return res.status(500).json({
      success: false,
      error: "BUFFER_API_KEY is missing",
      diagnostic
    });
  }

  const query = `
    query {
      account {
        organizations {
          id
          name
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.buffer.com", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query
      })
    });

    const data = await response.json();

    console.log(
      "BUFFER TEST RESPONSE:",
      JSON.stringify(data, null, 2)
    );

    return res.status(response.ok ? 200 : 500).json({
      success: response.ok && !data.errors,
      diagnostic,
      buffer: data
    });

  } catch (error) {
    console.error("BUFFER TEST ERROR:", error);

    return res.status(500).json({
      success: false,
      diagnostic,
      error: error.message
    });
  }
}
