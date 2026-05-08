export default async function handler(req, res) {

	try {

		let raw = "";

		for await (const chunk of req) {
			raw += chunk;
		}

		const body = JSON.parse(raw);

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
