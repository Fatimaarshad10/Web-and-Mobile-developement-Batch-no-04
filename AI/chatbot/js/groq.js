// Groq API wrapper (OpenAI-compatible chat completions).
// 👉 Get your key at https://console.groq.com/keys
const GROQ_API_KEY = "";

const API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

// System prompt — sets the bot's role for your store.
const SYSTEM_PROMPT =
  "You are Solea's friendly shopping assistant. Help customers find shoes, " +
  "answer questions about products, sizing, shipping, and returns. Keep replies short.";

/**
 * Send the conversation to Groq and return the assistant's reply text.
 * @param {{role: "user"|"assistant", content: string}[]} history
 * @returns {Promise<string>}
 */
export async function askGroq(history) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history],
    }),
  });

  if (!res.ok) throw new Error(`Groq API error: ${res.status}`);

  const data = await res.json();
  return data.choices[0].message.content.trim();
}
