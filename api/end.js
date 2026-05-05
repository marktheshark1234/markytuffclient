function endGame(score) {
  fetch("/api/end", {
    method: "POST",
    body: JSON.stringify({
      sessionId,
      score
    })
  });
}