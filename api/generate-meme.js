// Vercel/Netlify serverless function or Express route
// Place inside /api (Vercel) or /netlify/functions (Netlify)
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Only POST allowed" });

  const { prompt } = req.body || {};
  if (!prompt) return res.status(400).json({ error: "Prompt required" });

  const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
  const MODEL_VERSION =
    "b7f2dc8bfc2c4c1f8f7d9dcf8f4e5e6e1e7b1b4e9d2d0c7a6e3c6b1b1e3b9e6"; // Use actual memegpt version from Replicate

  // Call Replicate API
  const apiResp = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      version: MODEL_VERSION,
      input: { prompt }
    })
  });
  if (!apiResp.ok) {
    const err = await apiResp.text();
    return res.status(500).json({ error: err });
  }

  const prediction = await apiResp.json();

  // Wait for completion (polling)
  let outputUrl = "";
  let status = prediction.status;
  let pollUrl = prediction.urls.get;

  while (status !== "succeeded" && status !== "failed") {
    await new Promise(r => setTimeout(r, 2000));
    const pollResp = await fetch(pollUrl, {
      headers: { Authorization: `Token ${REPLICATE_API_TOKEN}` }
    });
    const pollData = await pollResp.json();
    status = pollData.status;
    if (status === "succeeded") outputUrl = pollData.output;
    if (status === "failed") return res.status(500).json({ error: "AI generation failed." });
  }

  res.status(200).json({ url: outputUrl });
}
