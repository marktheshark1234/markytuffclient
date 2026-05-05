let sessionId = crypto.randomUUID();
let startTime = Date.now();

fetch("/api/start", {
  method: "POST",
  body: JSON.stringify({ sessionId })
});