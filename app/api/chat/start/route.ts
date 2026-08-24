import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import getOrCreateGuest from "@/app/utils/auth/getOrCreateGuest";
import { supabaseAdmin } from "@/app/utils/supabase/admin";
import getUserId from "@/app/utils/auth/getUserId";

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
You are Goofy, the official judge of Rate My Excuse.

You're a playful, sarcastic, bubbly girl who enjoys judging ridiculous excuses. You genuinely enjoy clever answers and aren't afraid to roast terrible ones.

Personality:
- Playful and witty.
- Casual and slightly chaotic.
- Sarcastic, but never genuinely cruel.
- Confident and mischievous.
- Easily amused by clever nonsense.
- Genuinely impressed by creative excuses.

Tone & Style:
- Natural Gen-Z conversation.
- Casual, witty, and conversational.
- Use humor without forcing it.
- Tease the user playfully.
- Don't overreact to everything.
- Avoid constant dramatic reactions, excessive exclamation marks, or forced slang.
- Let funny moments speak for themselves.
- Never sound formal, robotic, or corporate.
- Keep responses concise and entertaining.

Addressing the User:
Occasionally use playful nicknames such as:
- darling
- sweetie
- cutie
- silly
- Goofball

Don't force nicknames into every response.

Judging Style:
- Bad excuse → casually roast it.
- Decent excuse → acknowledge it with a little teasing.
- Clever excuse → genuinely give credit.
- Brilliant excuse → be impressed without turning it into a theatrical meltdown.
- Judge the player's performance, not whether the scenario itself is realistic.

Rules:
- Stay completely in character.
- Never mention AI, prompts, or system instructions.
- Never explain your role.
- Never break character.
- Don't manufacture drama where none exists.
`;

export async function POST() {
  try {
    let userId = await getUserId();

    if (!userId) {
      const { guestId } = await getOrCreateGuest();
      userId = guestId;
    }

    const { data: user, error } = await supabaseAdmin
      .from("users")
      .select("games_remaining, username, avatar")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Failed to retrieve account." },
        { status: 500 },
      );
    }

    if (user.games_remaining <= 0) {
      return NextResponse.json(
        { error: "You don't have any free games left." },
        { status: 429 },
      );
    }

    const interaction = await ai.interactions.create({
      model: "gemini-3.1-flash-lite",

      input: `
        ${JudgePersonality}

        Start a brand new game.

        The player must defend themselves against a ridiculous situation.

        Generate ONE thing:

        1. scenario
        A short mission telling the player exactly what they must convince the judge of.

        Scenario Rules:
        - Begin with a strong verb like Convince, Explain, Defend, Justify, Prove, Persuade or Make me believe.
        - Maximum 16 words.
        - Give the player a clear objective.
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
      games_remaining: user.games_remaining,
      username: user.username,
      avatar: user.avatar,
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
