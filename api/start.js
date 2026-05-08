export default async function handler(req, res) {

	try {

		// only allow POST
		if(req.method !== "POST") {
			return res.status(200).send("start api ready");
		}

		let body = req.body;

		// handle raw string body
		if(typeof body === "string") {
			body = JSON.parse(body);
		}

		// fallback if undefined
		if(!body || !body.sessionId) {
			return res.status(400).send("missing sessionId");
		}

		const sessionId = body.sessionId;

		const response = await fetch(
			process.env.SUPABASE_URL + "/rest/v1/sessions",
			{
				method: "POST",
				headers: {
					apikey: process.env.SUPABASE_ANON_KEY,
					Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					id: sessionId
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
