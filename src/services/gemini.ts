import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface Trend {
  topic: string;
  volume: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  platform: 'X' | 'TikTok' | 'Reddit' | 'YouTube';
  description: string;
  region: string;
}

export async function fetchGlobalTrends(): Promise<Trend[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Analyze current global social media trends across X, TikTok, Reddit, and YouTube. Provide a list of 8-10 trending topics with volume estimates, sentiment, and a brief description. Focus on diverse regions.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              topic: { type: Type.STRING },
              volume: { type: Type.STRING },
              sentiment: { type: Type.STRING, enum: ['positive', 'neutral', 'negative'] },
              platform: { type: Type.STRING, enum: ['X', 'TikTok', 'Reddit', 'YouTube'] },
              description: { type: Type.STRING },
              region: { type: Type.STRING }
            },
            required: ['topic', 'volume', 'sentiment', 'platform', 'description', 'region']
          }
        }
      }
    });

    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Error fetching trends:", error);
    return [];
  }
}

export async function analyzeTopic(topic: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a deep dive analysis into the trending topic: "${topic}". Include why it's trending, key demographics, and potential future impact.`,
    });
    return response.text;
  } catch (error) {
    console.error("Error analyzing topic:", error);
    return "Failed to analyze topic.";
  }
}
