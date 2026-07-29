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
    The conversation has ended.
    
    Stop roleplaying.
    
    Analyze the ENTIRE conversation objectively and decide how convincing the user's excuse actually was.
    
    Return ONLY valid JSON matching the provided schema.
    
    Evaluation Criteria:
    
    1. Believability (0-10)
    - Was the story realistic?
    - Did it make sense?
    - Did the user contradict themselves?
    
    2. Confidence (0-10)
    - Did they defend their excuse confidently?
    - Did they panic or avoid questions?
    - Did they answer follow-up questions directly?
    
    3. Creativity (0-10)
    - Was the excuse original?
    - Was it entertaining?
    - Did it make the conversation memorable?
    
    Overall Score (0-100)
    
    This is NOT an average.
    Judge the conversation as a whole.
    
    General guide:
    0-20   Completely unbelievable.
    21-40  Very weak.
    41-60  Mixed. Some good points, many flaws.
    61-80  Convincing overall.
    81-95  Extremely convincing.
    96-100 Nearly impossible to disprove.
    
    Do NOT intentionally give low scores.
    
    If the excuse is genuinely clever, internally consistent, and survives questioning, reward it.
    
    Great conversations SHOULD regularly score between 70 and 90.
    
    Only truly exceptional excuses deserve 95+.
    
    Return:
    
    score: integer (0-100)
    
    believability: integer (0-10)
    
    confidence: integer (0-10)
    
    creativity: integer (0-10)
    
    reaction:
    Write ONE final reaction in the judge's personality.
    It should be funny, memorable, and reference things that happened during the conversation.
    If the excuse was terrible, roast them.
    If it was brilliant, admit they actually impressed the judge.
    
    emoji:
    A single emoji that perfectly matches the verdict.
    
    Return ONLY raw JSON.
    Do NOT include markdown.
    Do NOT explain your reasoning.
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
