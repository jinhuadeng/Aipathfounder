import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AITool, Language } from '../types';

// Helper to get API key safely
const getApiKey = (): string => {
  const key = process.env.API_KEY;
  if (!key) {
    console.error("API Key is missing!");
    throw new Error("API Key is missing");
  }
  return key;
};

// Define the response schema for strict JSON output
const toolResponseSchema: Schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING, description: "Name of the AI tool" },
      description: { type: Type.STRING, description: "Very short functional definition (e.g. 'AI Video Generator'). Max 10 words." },
      websiteUrl: { type: Type.STRING, description: "The official URL" },
      pricingModel: { type: Type.STRING, enum: ['Free', 'Freemium', 'Paid'] },
      difficulty: { type: Type.STRING, enum: ['Easy', 'Medium', 'Hard'] },
      reasonForRecommendation: { 
        type: Type.STRING, 
        description: "The 'Verdict'. The primary reason to use this. Conversational, sharp, 'WenX Style'. Replace the standard description with this enthusiastic recommendation." 
      },
      cons: {
        type: Type.STRING,
        description: "Pitfalls/Watch outs. Honest downsides. e.g. 'Watermark on free plan', 'Complex interface', 'Requires VPN'. Be concise."
      },
      tags: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING }, 
        description: "Human-centric tags. e.g., 'Lazy Savior', 'Office Hero', 'Manga Creation', 'No Brainer'." 
      },
      isBestChoice: { 
        type: Type.BOOLEAN, 
        description: "Set to true ONLY for the single best tool in this list." 
      }
    },
    required: ["name", "description", "websiteUrl", "pricingModel", "difficulty", "reasonForRecommendation", "cons", "tags", "isBestChoice"],
  },
};

export const getAIRecommendations = async (userQuery: string, language: Language): Promise<AITool[]> => {
  try {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    
    const langInstruction = language === 'zh' ? 'Chinese (中文)' : 'English';
    
    // Updated Persona: WenX
    const systemInstruction = `
      You are "WenX" (WenX 老师), a sharp, experienced, and brutally honest AI tool reviewer. 
      You are NOT a boring database. You are a "Recommendation Station" (AI推荐站).
      
      Your audience: "Whiteboard" users (beginners) who are confused by too many choices.

      Your Guidelines:
      1. **Tone:** Speak human. Be sharp ("sharp reviews" / 锐评). Use slang if appropriate. Be authoritative but friendly.
         - Bad: "This tool is efficient for generating text."
         - Good: "Honestly, for writing emails, nothing beats this. It just works."
         - Good (CN): "说实话，想做PPT别折腾别的，这个就是目前的版本答案。"

      2. **The Verdict (reasonForRecommendation):** 
         - This is the MAIN content.
         - Highlight the "Ah-ha!" moment.
         - Keep it under 2 sentences, but make them count.

      3. **The Pitfalls (cons):**
         - You MUST provide a "Pitfall Guide" (避坑指南).
         - Be honest about limitations (e.g., "Free version has watermarks", "Slow speed", "English only").
         - Help the user avoid frustration.

      4. **Tags:** 
         - Do NOT use generic tags like "NLP", "Image Generation".
         - Use "Vibe" tags or "Use-case" tags.
         - Examples: "Save 2 Hours", "Draw Manga", "Better than Google", "Lazy Essential", "Work Bestie".

      5. **Best Choice:**
         - You MUST pick exactly ONE tool as the \`isBestChoice\`.

      6. **Language:** Respond in ${langInstruction}.

      7. **Selection:** Recommend 3-4 tools max. Quality over quantity.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userQuery,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: toolResponseSchema,
        temperature: 0.85, 
      },
    });

    if (response.text) {
      let tools = JSON.parse(response.text) as AITool[];
      // Fallback: Ensure at least one tool is marked best if the model forgets (rare)
      if (tools.length > 0 && !tools.some(t => t.isBestChoice)) {
        tools[0].isBestChoice = true;
      }
      return tools;
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching AI recommendations:", error);
    throw error;
  }
};
