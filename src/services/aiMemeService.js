// Calls your backend proxy for meme generation (secure)
export async function generateMemeWithAI(prompt) {
  const resp = await fetch("/api/generate-meme", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });
  if (!resp.ok) throw new Error("AI meme image generation failed.");
  const data = await resp.json();
  return data.url;
}
