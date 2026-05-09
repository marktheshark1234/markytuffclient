export default async function handler(req, res) {

	if(req.method !== "POST") {
		return res.status(200).send("input api working");
	}

	try {

		let body = req.body;

		// handle string body
		if(typeof body === "string") {
			body = JSON.parse(body);
		}

		console.log("BODY:", body);

		const sessionId = String(body.sessionId);

		const inputs = body.inputs;

		if(!sessionId || !Array.isArray(inputs)) {
			return res.status(400).send("bad request");
		}

		const rows = [];

		for(const input of inputs) {

			rows.push({
				session_id: sessionId,
				key: String(input.key),
				time_ms: Number(input.time)
			});

		}

		console.log("ROWS:", rows);

		const response = await fetch(
			process.env.SUPABASE_URL + "/rest/v1/inputs",
			{
				method: "POST",
				headers: {
					apikey: process.env.SUPABASE_ANON_KEY,
					Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
					"Content-Type": "application/json",
					Prefer: "return=representation"
				},
				body: JSON.stringify(rows)
			}
		);

		const text = await response.text();

		console.log("SUPABASE:", text);

		res.status(200).send(text);

	} catch(err) {

		console.error(err);

		res.status(500).send(err.toString());

	}

}
