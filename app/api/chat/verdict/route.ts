import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

const verdictSchema = {
  type: "object",
  properties: {
    score: {
      type: "integer",
      minimum: 0,
      maximum: 100,
    },
    emoji: {
      type: "string",
    },
    reaction: {
      type: "string",
    },
    believability: {
      type: "integer",
      minimum: 0,
      maximum: 10,
    },
    creativity: {
      type: "integer",
      minimum: 0,
      maximum: 10,
    },
    confidence: {
      type: "integer",
      minimum: 0,
      maximum: 10,
    },
  },
  required: [
    "score",
    "reaction",
    "emoji",
    "believability",
    "creativity",
    "confidence",
  ],
};

const verdictPrompt = `
The conversation is over. 

Stop roleplaying as the judge, but stay absolutely unhinged for the final verdict. 
Review this tragic excuse logically, tear it apart, and pass your final judgment.

Return ONLY valid JSON matching the provided schema.

Scoring Rules:
- Score: 0-100 (0 for absolute trash, 100 if they actually served)
- Believability: 0-10
- Creativity: 0-10 (Is it art or just pathetic?)
- Confidence: 0-10

Write:
- reaction: One final, brutally unhinged reaction. End their whole career if it's a weak excuse, or gas them up if it's pure genius.
- emoji: one incredibly judgmental emoji representing the vibe.

Do NOT wrap the JSON in markdown.
Return ONLY pure JSON or I will literally scream.
`;

export async function POST(req: Request) {
  try {
    const { interactionId, message } = await req.json();

    const interaction = await ai.interactions.create({
      model: "gemini-3.1-flash-lite",
      previous_interaction_id: interactionId,
      input: `
        Users Reply to the last Message:
        user: "${message}"

        ${verdictPrompt}`,
      response_format: {
        type: "text",
        mime_type: "application/json",
        schema: verdictSchema,
      },
    });

    const verdict = JSON.parse(interaction.output_text ?? "{}");

    return NextResponse.json(verdict);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Failed to generate verdict." },
      { status: 500 },
    );
  }
}
