import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
// Note: In a real production app, ensure process.env.API_KEY is populated.
// If the key is missing, the service handles it gracefully by returning mock data for the demo.
const apiKey = process.env.API_KEY || '';
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateResponse = async (prompt: string, model: string = 'gemini-2.5-flash'): Promise<string> => {
  if (!ai) {
    console.warn("Gemini API Key missing. Returning simulation data.");
    return simulateResponse(prompt);
  }

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Neural Link Interrupted. Showing simulation data.";
  }
};

// Fallback for demo purposes if no API key is present
const simulateResponse = (prompt: string): string => {
  if (prompt.includes("audit")) {
    return `**Audit Complete.**\n\n- **Risk Detected:** High dependency on single-source vendors.\n- **Compliance:** 98% alignment with GDPR.\n- **Recommendation:** Diversify supply chain logic in Module 4.`;
  }
  if (prompt.includes("candidate")) {
    return `Subject: Leadership Opportunity at Acme Corp\n\nHi [Name], our Ares engine identified your proprietary work in Generative Adversarial Networks as a perfect match for our new AI Division. We aren't just looking for an engineer; we need an architect. Let's talk.`;
  }
  if (prompt.includes("market")) {
    return `Market sentiment is bearish on traditional assets but showing a 14% uptick in decentralized storage protocols. Recommend holding current positions and setting stop-loss at -5%.`;
  }
  return "System Acknowledged. Processing request via local heuristic engines. (API Key required for live LLM inference).";
};