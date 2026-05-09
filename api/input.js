export default async function handler(req, res) {

	if(req.method !== "POST") {
		return res.status(200).send("input api working");
	}

	try {

		const { sessionId, inputs } = req.body;

		if(!sessionId || !inputs || !Array.isArray(inputs)) {
			return res.status(400).send("bad request");
		}

		const rows = inputs.map(i => ({
			session_id: sessionId,
			key: i.key,
			time_ms: i.time
		}));

		const response = await fetch(
			process.env.SUPABASE_URL + "/rest/v1/inputs",
			{
				method: "POST",
				headers: {
					apikey: process.env.SUPABASE_ANON_KEY,
					Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
					"Content-Type": "application/json"
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
