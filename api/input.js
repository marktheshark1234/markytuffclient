export default async function handler(req, res) {

	if(req.method !== "POST") {
		return res.status(200).send("input ok");
	}

	const { sessionId, key, time } = req.body;

	const response = await fetch(
		process.env.SUPABASE_URL + "/rest/v1/inputs",
		{
			method: "POST",
			headers: {
				apikey: process.env.SUPABASE_ANON_KEY,
				Authorization:
					`Bearer ${process.env.SUPABASE_ANON_KEY}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				session_id: sessionId,
				key: key,
				time_ms: time
			})
		}
	);

	const text = await response.text();

	res.status(200).send(text);

}
