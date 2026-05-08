export default async function handler(req, res) {
  try {
    const { sessionId } = JSON.parse(req.body);

    console.log("SESSION:", sessionId);

    const response = await fetch(
      process.env.SUPABASE_URL + "/rest/v1/sessions",
      {
        method: "POST",
        headers: {
          apikey: process.env.SUPABASE_ANON_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=representation"
        },
        body: JSON.stringify({
          id: sessionId
        })
      }
    );

    const text = await response.text();

    console.log("SUPABASE RESPONSE:", text);

    res.status(200).send(text);

  } catch (err) {
    console.error(err);
    res.status(500).send(err.toString());
  }
}
