import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import judges from "@/app/data/judges";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

const responseSchema = {
  type: "object",
  properties: {
    scenario: {
      type: "string",
      description: "A random scenario that user have to overcome",
    },
    message: {
      type: "string",
      description: "The judge's opening message to begin the conversation.",
    },
  },
  required: ["scenario", "message"],
};

export async function POST(req: Request) {
  try {
    const { judge } = await req.json();

    const selectedJudge = judges[judge as keyof typeof judges];

    if (!selectedJudge) {
      return NextResponse.json({ error: "Judge not found." }, { status: 404 });
    }

    const interaction = await ai.interactions.create({
      model: "gemini-3.1-flash-lite",

      input: `
        ${selectedJudge.systemPrompt}

        Your job is to begin a brand new game.

        Generate:

        1. An absolutely unhinged, utterly bizarre scenario the user has to excuse themselves from.
        2. The very first message you would say to the user as role playing the character.

        Rules:
        - Keep the scenario under 15 words. Make it delightfully chaotic.
        - Keep the first message under 30 words.
        - Don't reveal any score.
        - Don't end the conversation.
        - Stay completely in character.
      `,

      response_format: {
        type: "text",
        mime_type: "application/json",
        schema: responseSchema,
      },
    });

    return NextResponse.json({
      interactionId: interaction.id,
      ...JSON.parse(interaction.output_text ?? ""),
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Failed to start conversation." },
      { status: 500 },
    );
  }
}
