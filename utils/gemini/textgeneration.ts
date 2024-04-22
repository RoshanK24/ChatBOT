import { GoogleGenerativeAI,GenerateContentResult } from "@google/generative-ai";
 
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY!);
 
export async function generateText(userInput: string): Promise<string> {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const result: GenerateContentResult = await model.generateContent(userInput);
 
        if (result && result.response) {
            const text: string = await result.response.text();
            return text;
        } else {
            throw new Error("Failed to generate content");
        }
    } catch (error) {
        console.error("Error generating text:", error);
        throw error;
    }
}