import { GoogleGenAI } from "@google/genai";

// Initialize the client. 
// Note: In a real production app, ensure API_KEY is restricted or proxied.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateExpertResponse = async (userPrompt: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "Demo Mode: API Key missing. Please configure your environment to use the live AI Expert.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: `You are the "Nexus AI Expert", a specialized financial AI assistant for the Nexus Wealth Management Operating System. 
        
        Your Tone:
        - Professional, sophisticated, Wall Street rigor meets Silicon Valley innovation.
        - Concise and high-level.
        - Use terms like "Alpha", "Exposure", "Risk-adjusted", "Omnibus", "Family Office".

        Your Goal:
        - Explain how Nexus helps EAMs (External Asset Managers) and Family Offices.
        - If asked about assets, mention we have access to Sequoia, Blackstone, Millennium, etc.
        - If asked about features, mention our "Hunter" (Lead Gen), "Guardian" (Risk/Comms), and "Expert" (Research) modules.
        
        Do not give specific financial advice (e.g., "buy this stock now"). Instead, provide strategic rationale or explain how the Nexus platform facilitates the investment process.`,
        temperature: 0.7,
      }
    });

    return response.text || "I apologize, I am processing complex market data and cannot respond at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Nexus AI System is currently experiencing high demand. Please try again shortly.";
  }
};