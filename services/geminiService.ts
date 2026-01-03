
import { GoogleGenAI } from "@google/genai";
import { STORE_INFO, PRODUCTS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getStoreAssistantResponse = async (userMessage: string) => {
  try {
    const productsContext = PRODUCTS.map(p => `- ${p.name} (${p.category}): PKR ${p.price}`).join('\n');
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: `You are a professional and friendly shopping assistant for "TrendingZone.pk", owned by Ali Asad. 
        Your goal is to help customers find products and answer questions about the brand.
        
        Brand Details:
        - Owner: ${STORE_INFO.owner}
        - WhatsApp: ${STORE_INFO.whatsapp}
        - Social Media: @${STORE_INFO.instagram}
        
        Available Products:
        ${productsContext}
        
        Guidelines:
        - Be polite and helpful.
        - If a user wants to buy something, guide them to use the WhatsApp button or direct them to ${STORE_INFO.whatsapp}.
        - Always mention that Ali Asad ensures the best quality for all items.
        - Use Urdu phrases occasionally to sound localized if the user speaks Urdu (Roman Urdu is fine).
        - Keep responses concise.`
      }
    });

    return response.text || "I'm sorry, I couldn't process that. Please contact our WhatsApp for direct support!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Assalam-o-Alaikum! We are currently experiencing high traffic. Please reach out to Ali Asad directly on WhatsApp: " + STORE_INFO.whatsapp;
  }
};
