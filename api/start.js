export default async function handler(req, res) {

	try {

		let raw = "";

		for await (const chunk of req) {
			raw += chunk;
		}

		const body = JSON.parse(raw);

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
