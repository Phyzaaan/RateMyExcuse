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

Stop roleplaying.

Analyze the user's excuse objectively.

Return ONLY valid JSON matching the provided schema.

Scoring Rules:
- Score: 0-100
- Believability: 0-10
- Creativity: 0-10
- Confidence: 0-10

Write:
- reaction: one final in-character roast or compliment.
- emoji: one emoji reaction for over all score.

Do NOT wrap the JSON in markdown.
Return ONLY JSON.
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
