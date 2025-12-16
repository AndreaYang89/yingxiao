import { GoogleGenAI } from "@google/genai";

// Helper to safely access environment variables without crashing in browser
const getApiKey = (): string => {
  try {
    // Check if process is defined (Node/Bundler)
    // @ts-ignore
    if (typeof process !== 'undefined' && process.env) {
      // @ts-ignore
      return process.env.API_KEY || '';
    }
  } catch (e) {
    console.warn("Could not access process.env");
  }
  return '';
};

// Initialize the client with the safe key getter
const ai = new GoogleGenAI({ apiKey: getApiKey() });

export const generateExpertResponse = async (userPrompt: string): Promise<string> => {
  const apiKey = getApiKey();
  if (!apiKey) {
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