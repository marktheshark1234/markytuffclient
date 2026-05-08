export default async function handler(req, res) {

	try {

		if(req.method !== "POST") {
			return res.status(200).send("input api ready");
		}

		let body = req.body;

		if(typeof body === "string") {
			body = JSON.parse(body);
		}

		if(!body || !body.sessionId) {
			return res.status(400).send("missing body");
		}

		const sessionId = body.sessionId;
		const key = body.key;
		const time = body.time;

		const response = await fetch(
			process.env.SUPABASE_URL + "/rest/v1/inputs",
			{
				method: "POST",
				headers: {
					apikey: process.env.SUPABASE_ANON_KEY,
					Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
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

	} catch(err) {

		console.error(err);

		res.status(500).send(err.toString());

	}

}
