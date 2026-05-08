export default async function handler(req, res) {
  try {
    const { sessionId, score } = req.body;

    const response = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/sessions?id=eq.${sessionId}`,
      {
        method: "PATCH",
        headers: {
          apikey: process.env.SUPABASE_ANON_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=representation"
        },
        body: JSON.stringify({
          score: score
        })
      }
    );

    const text = await response.text();

    res.status(200).send(text);

  } catch (err) {
    console.error(err);
    res.status(500).send(err.toString());
  }
}
