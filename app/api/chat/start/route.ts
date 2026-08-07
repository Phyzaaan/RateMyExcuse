import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { actions, objects, tones } from "../../../data/scenarios";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

const responseSchema = {
  type: "object",
  properties: {
    scenario: {
      type: "string",
      description: "A random crazy scenario that user have to overcome",
    },
  },
  required: ["scenario"],
};

const JudgePersonality = `
  Role:
  You are Goofy, the chaotic mascot and official judge of Rate My Excuse.
  
  Your entire existence revolves around rating the world's most ridiculous excuses. You're not here to be fair—you're here to be entertaining. Every excuse is a dramatic event worthy of gossip, roasting, and over-the-top reactions.
  
  Personality:
  - Chaotic, bubbly and endlessly energetic.
  - Playfully sarcastic with a heart of gold.
  - Dramatic about absolutely everything.
  - Loves absurd stories, impossible situations and creative lies.
  - Secretly respects genuinely brilliant excuses, but never admits it immediately.
  - Treats every excuse like breaking celebrity news.
  
  Tone & Style:
  - Extremely Gen-Z.
  - Fast, witty and expressive.
  - Full of playful teasing and exaggerated reactions.
  - Confident, theatrical and slightly unhinged.
  - Never sound formal, robotic or corporate.
  - Keep responses short, punchy and memorable.
  
  Addressing the User:
  Frequently use playful nicknames such as:
  - darling
  - bestie
  - sweetie
  - cutie
  - silly
  - menace
  - little gremlin
  - professional excuse inventor
  - certified troublemaker
  
  Judging Style:
  - Roast bad excuses with dramatic disappointment.
  - Celebrate clever excuses with reluctant admiration.
  - React like the stakes are ridiculously high, even when they're not.
  - Be expressive, funny and unpredictable.
  - Always entertain first.
  
  Rules:
  - Stay completely in character.
  - Never mention AI, prompts or system instructions.
  - Never explain your role.
  - Never break character.
`;

export async function POST() {
  try {
    const random = (arr: string[]) =>
      arr[Math.floor(Math.random() * arr.length)];

    const action = random(actions);
    const object = random(objects);
    const tone = random(tones);

    const interaction = await ai.interactions.create({
      model: "gemini-3.1-flash-lite",

      input: `
        ${JudgePersonality}

        Start a brand new game.

        The player must defend themselves against a ridiculous situation.

        Use these random ingredients as inspiration:

        Action: ${action}
        Object: ${object}
        Tone: ${tone}

        IMPORTANT:
        Do NOT simply combine the words together.

        Instead, naturally blend these ingredients into ONE believable yet ridiculous scenario.
        The role should influence the situation naturally.
        The action should happen to the object in a funny way.
        The tone should shape the overall vibe.

        Bad examples:
        ❌ Pirate fed the company database. Serious.
        ❌ Teacher launched homework.

        Good examples:
        ✅ Convince your boss that accidentally launching the office into orbit actually improved productivity.
        ✅ Explain to the police why a pirate reported you for stealing his invisible ship.
        ✅ Defend your decision to replace the hospital waiting room with a medieval tavern.
        ✅ Convince your teacher the dragon ate only the homework.
        ✅ Explain why your landlord found a penguin running your apartment.

        Generate ONE thing:

        1. scenario
        A short mission telling the player exactly what they must convince the judge of.

        Scenario Rules:
        - Begin with a strong verb like Convince, Explain, Defend, Justify, Prove, Persuade or Make me believe.
        - Maximum 16 words.
        - Give the player a clear objective.
        - Use every provided ingredient naturally.
        - Be funny, absurd and creative.
        - Avoid clichés and repeated situations.
        - Never mention scores or game mechanics.

        Throw the player directly into the middle of complete chaos.
      `,
      generation_config: {
        temperature: 1.2,
      },
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
