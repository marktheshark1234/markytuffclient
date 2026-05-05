document.addEventListener("keydown", (e) => {
  fetch("/api/input", {
    method: "POST",
    body: JSON.stringify({
      sessionId,
      key: e.key,
      time: Date.now() - startTime
    })
  });
});