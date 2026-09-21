export default async function handler(req, res) {

  res.setHeader(
    "Content-Type",
    "application/json"
  );

  const url =
    String(
      process.env.SUPABASE_URL || ""
    )
      .trim()
      .replace(/\/+$/, "");

  const key =
    String(
      process.env.SUPABASE_SECRET_KEY || ""
    ).trim();

  if (!url) {
    return res.status(500).json({
      ok: false,
      error: "SUPABASE_URL missing"
    });
  }

  if (!key) {
    return res.status(500).json({
      ok: false,
      error: "SUPABASE_SECRET_KEY missing"
    });
  }

  try {

    const response = await fetch(
      `${url}/rest/v1/universe139_subscribers?select=id&limit=1`,
      {
        method: "GET",
        headers: {
          apikey: key,
          Accept: "application/json"
        }
      }
    );

    const responseText =
      await response.text();

    return res.status(200).json({

      ok: response.ok,

      supabaseStatus:
        response.status,

      supabaseResponse:
        responseText

    });

  } catch (error) {

    return res.status(500).json({

      ok: false,

      error:
        error?.message ||
        String(error)

    });

  }

}
