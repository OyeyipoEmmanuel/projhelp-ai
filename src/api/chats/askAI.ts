import { ai_model } from "../../config/firebase-config";
import { sendAiOutputToDb } from "./sendAiOutputToDb";

export const askAi = async (prompt: string) => {
  let attempts = 0;

  while (attempts < 3) {
    try {
      const res = await ai_model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      });

      const text = res.response.text();

      await sendAiOutputToDb(text);

      return text;
    } catch (error: any) {
      // Handle Rate Limit
      if (error.messages?.includes("429")) {
        attempts++;

        // wait & retry
        await new Promise((res) => setTimeout(res, 800 * attempts));

        continue;
      }
    }
  }

  throw new Error("Something went wrong. Please contact the developer")
};
