import { GoogleGenAI, GenerateContentResponse } from '@google/genai';

interface GenerateGuideOptions {
  bossName: string;
  style?: string; // e.g., 'casual', 'detailed', 'beginner-friendly'
}

export const generateGuideDraft = async (options: GenerateGuideOptions): Promise<string> => {
  if (!process.env.API_KEY) {
    console.error('API_KEY is not defined. Cannot call Gemini API.');
    return 'Error: Gemini API key is not configured.';
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-3-flash-preview'; // Using a capable model for text generation

  const prompt = `Generate a PvM guide draft for the RuneScape boss "${options.bossName}".
  Include sections like:
  - Introduction/Overview
  - Recommended Gear (general tiers/styles, not specific items)
  - Recommended Inventory (general types of items like food, potions)
  - Key Mechanics/Strategy
  - Example Rotation (basic ability usage)
  - Tips for Beginners

  Adopt a ${options.style || 'detailed and beginner-friendly'} tone. The guide should be comprehensive but concise, using markdown for formatting (e.g., headings, bullet points).`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        temperature: 0.7,
        maxOutputTokens: 1500, // Adjust as needed
      },
    });

    const text = response.text;
    if (text) {
      return text;
    } else {
      console.error('Gemini API response was empty or undefined.');
      return 'Could not generate guide draft. The AI response was empty.';
    }
  } catch (error) {
    console.error('Error generating guide draft with Gemini API:', error);
    return `Failed to generate guide draft: ${(error as Error).message}`;
  }
};
