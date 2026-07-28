import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { message, interactionId } = await req.json();

    const interaction = await ai.interactions.create({
      model: "gemini-3.1-flash-lite",

      input: message,

      previous_interaction_id: interactionId,
    });

    return NextResponse.json({
      interactionId: interaction.id,
      message: interaction.output_text ?? "",
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Failed to start conversation." },
      { status: 500 },
    );
  }
}
