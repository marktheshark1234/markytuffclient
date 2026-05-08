export default async function handler(req, res) {

	if(req.method !== "POST") {
		return res.status(200).send("start api working");
	}

	try {

		const { sessionId } = req.body;

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
