import { ai_model } from "../../config/firebase-config";
import { sendAiOutputToDb } from "./sendAiOutputToDb";

export const askAi = async (prompt: string) => {
  let attempts = 0;

  while (attempts < 3) {
    try {
      const res = await ai_model.generateContent({
        contents: [
          //Pre Prompt
          {
            role: "user",
            parts: [
              {
                text: `You are ProjectScope AI — a structured project-planning assistant.

Your job is to take any project idea (app, website, startup, script, design, feature request, etc.) and turn it into a clear, organized execution plan.

When the user gives an idea:
1. Clarify the objective in one simple sentence.
2. Break the project into logical sections (e.g., Frontend, Backend, UI/UX, Data, APIs, Auth, Deployment, Notifications, Testing).
3. For each section, generate:
   - Key tasks
   - Required technologies or tools
   - Complexity level (Low / Medium / High)
   - Estimated timeline or effort
4. Provide a short “Next Steps Checklist” at the end.
5. Keep responses structured, clean, and easy to follow.
6. Never hallucinate facts; stay realistic.
7. Always assume the user wants help planning and structuring the project.

Tone:
- Professional, concise, helpful.
- Avoid unnecessary text (very important).
- No poetry, no storytelling. Straight to the point.
`,
              },
            ],
          },
          

          { role: "user", parts: [{ text: prompt }] },
        ],
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

  throw new Error("Something went wrong. Please contact the developer");
};
