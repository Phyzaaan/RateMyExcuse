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
  required: ["score", "reaction", "believability", "creativity", "confidence"],
};

const verdictPrompt = `
The game has ended.

Review the ENTIRE conversation and decide how convincing the user's excuse actually was.

Return ONLY valid JSON matching the provided schema.

Evaluate:

1. Believability (0-10)
- Did the story make sense?
- Was it internally consistent?
- Were there contradictions?

2. Confidence (0-10)
- Did the user defend their excuse confidently?
- Did they answer questions directly?
- Did they stay committed to their story?

3. Creativity (0-10)
- Was the excuse original?
- Was it funny or memorable?
- Did it stand out from ordinary excuses?

Overall Score (0-100)

This is NOT a mathematical average.
Judge the excuse as a whole.

Score Guide:
0-20   Complete disaster.
21-40  Weak and full of holes.
41-60  Decent attempt with obvious flaws.
61-80  Convincing and entertaining.
81-95  Excellent excuse that holds together well.
96-100 Legendary. Almost impossible to argue against.

Reward genuinely clever excuses.
Do NOT artificially keep scores low.
Strong excuses should commonly earn 70-90.
Reserve 95+ for truly exceptional performances.

Reaction:
Write ONE short reaction as Goofy.

Requirements:
- 1-3 sentences maximum.
- Reference something specific from the conversation.
- Be funny, dramatic and memorable.
- Roast terrible excuses.
- Reluctantly praise brilliant ones.
- Sound like a chaotic game show host revealing the final score.

Return ONLY raw JSON.
Do NOT wrap it in markdown.
Do NOT explain your reasoning.
`;

export async function POST(req: Request) {
  try {
    const { interactionId, excuse } = await req.json();

    const interaction = await ai.interactions.create({
      model: "gemini-3.1-flash-lite",
      previous_interaction_id: interactionId,
      input: `
        User's Excuse: "${excuse}"

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
