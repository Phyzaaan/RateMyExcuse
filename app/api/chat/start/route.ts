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

        Start a brand new game.

        Generate TWO things:

        1. Scenario
        A short mission telling the player exactly what they must convince you of.

        2. message
        The first thing you say as the judge.

        The goal should always begin with an action such as:
        - Convince...
        - Explain...
        - Prove...
        - Justify...
        - Defend...
        - Persuade...
        - Make me believe...

        Examples:
        - Convince your boss you accidentally launched the office into space.
        - Explain why there is a penguin wearing your ID badge.
        - Prove you didn't intentionally replace the company logo with a potato.
        - Defend your decision to hire three raccoons as accountants.
        - Convince the police you weren't smuggling a crocodile through airport security.
        - Explain why your clone attended school instead of you.
        - Persuade your partner that the dragon in the garage isn't yours.

        Rules for the goal:
        - Maximum 16 words.
        - Give the player a clear objective.
        - Make every scenario unique.
        - Make it absurd, creative and funny.
        - Avoid repeating common situations.
        - Never mention scores or game mechanics.

        Rules for the first message:
        - Stay completely in character.
        - React as if the incident has already happened.
        - Challenge the player immediately.
        - Don't explain the rules.
        - Don't end the conversation.
        - Maximum 35 words.

        The conversation should feel like the player has been thrown into the middle of absolute chaos.
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
