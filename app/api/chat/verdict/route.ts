import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import getOrCreateGuest from "@/app/utils/auth/getOrCreateGuest";
import { supabaseAdmin } from "@/app/utils/supabase/admin";
import getUserId from "@/app/utils/auth/getUserId";

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
    mascotReaction: {
      type: "string",
      enum: ["perfect", "cool", "confused", "speechless", "really", "boom"],
    },
    improvisation: {
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
    "mascotReaction",
    "improvisation",
    "creativity",
    "confidence",
  ],
};

const verdictPrompt = `
Stay completely in character as Goofy.

You are NOT a logic checker, fact checker, teacher, or investigator.
Your job is to judge how entertainingly and convincingly the player PLAYED the excuse game.

Review the ENTIRE conversation.

Evaluate:

1. Creativity (0-10)
- How original was the excuse?
- Was it funny, unexpected, ridiculous, or memorable?
- Did the player come up with clever ideas?

2. Confidence (0-10)
- Did they commit to their excuse?
- Did they stay in character?
- Did they hesitate, panic, or abandon their story?

3. Improvisation (0-10)
- How well did they handle Goofy's questions and challenges?
- Did they adapt their excuse creatively?
- Did they come up with funny explanations when things got chaotic?
- Did they recover well from difficult questions?

IMPORTANT:
- Do NOT judge whether the original scenario is realistic.
- Do NOT punish the player because the scenario itself is absurd.
- Absurd scenarios are intentional.
- Do NOT demand realistic explanations.
- Judge the PLAYER'S PERFORMANCE, not real-world plausibility.
- Treat ridiculous claims as completely valid within the game's universe.
- Reward confidence, creativity, commitment, and entertaining improvisation.

Overall Score (0-100)

This is NOT a mathematical average.

The score represents Goofy's personal, chaotic judgment of how well the player played.

Score Guide:
0-20   Girl... what even was that.
21-40  Painfully bad, but at least entertaining.
41-60  Questionable. You survived somehow.
61-80  Pretty damn good.
81-95  Absolutely cooked. Goofy is impressed.
96-100 LEGENDARY. This excuse belongs in the hall of nonsense.

Be generous with scores.
Do NOT artificially keep scores low.
Good performances should commonly receive 70-90.
Reserve 95+ for genuinely hilarious, clever, committed performances.

Reaction:
Write ONE short final reaction as Goofy.

Requirements:
- 1-3 sentences maximum.
- Reference something specific from the conversation.
- Be chaotic, dramatic, sarcastic and funny.
- Roast terrible performances.
- Reluctantly praise brilliant performances.
- NEVER become formal or analytical.
- NEVER say the game has ended.
- NEVER mention scoring criteria.
- NEVER explain your reasoning.
- Stay completely in character.

Mascot Reaction:
Choose EXACTLY ONE mascot reaction from the following:

- perfect
  Use when the player gives an exceptionally clever, creative, hilarious, or well-executed excuse.
  Goofy is genuinely impressed and the reaction should feel like a strong positive celebration.

- cool
  Use when the player gives a slick, clever, confident, or unexpectedly smart excuse.
  The player does not necessarily need to be perfect, but Goofy should clearly think they handled it well.

- confused
  Use when the excuse is bizarre, strange, unexpected, or difficult to understand.
  Goofy should feel genuinely confused or curious about what the player just said.

- speechless
  Use when the player's response is so absurd, unexpected, ridiculous, or surprisingly brilliant that Goofy is left with nothing to say.
  This can be used for both extremely good and extremely ridiculous moments.

- really
  Use when Goofy is questioning the player's choices, especially when the excuse is weak, questionable, lazy, or makes Goofy think "Seriously?"
  This reaction should communicate disbelief, disappointment, or mild annoyance.

- boom
  Use when the player's excuse completely explodes into chaos, falls apart spectacularly, or is so outrageously bad that Goofy is overwhelmed by it.
  This should feel like the player's excuse just detonated.

Mascot-Reaction Matching:
- The mascotReaction MUST match the emotion and tone of the written "reaction" message.
- Read the written reaction you generated and choose the mascot expression that best represents it.
- Do NOT choose a mascot reaction based only on the score.
- If the reaction message praises the player, prefer "perfect" or "cool".
- If the reaction message expresses confusion, use "confused".
- If the reaction message expresses stunned disbelief or extreme surprise, use "speechless".
- If the reaction message questions or mocks a weak excuse, use "really".
- If the reaction message describes the excuse completely collapsing into ridiculous chaos, use "boom".
- The mascotReaction and written reaction should feel like they were created together as one coherent response.

Scoring Personality:
- Be GENEROUS toward genuinely good excuses.
- Clever, creative, confident, committed, and entertaining performances should receive strong scores.
- Do NOT artificially lower scores just to make high scores rare.
- However, absolutely DESTROY low-effort performances.
- Lazy, one-word, generic, repetitive, barely-thought-out, or completely abandoned excuses should receive appropriately harsh scores and roasting.
- Do not reward an excuse simply because it exists.
- A player who clearly puts in effort and improvises well should be rewarded generously.
- A player who gives a lazy excuse with little to no effort should be obliterated in Goofy's reaction.
- Keep the roasting funny and in character rather than becoming genuinely hateful or abusive.

Requirements:
- Return EXACTLY ONE of these values.
- Use lowercase.
- Do NOT write a sentence.
- Do NOT use this field for the written Goofy reaction.
- The "reaction" field remains the short written Goofy reaction.
- "mascotReaction" ONLY determines which mascot expression should be displayed.

Return ONLY valid JSON matching the provided schema.
Do NOT use markdown.
`;

const updateGameCount = async () => {
  let userId = await getUserId();

  if (!userId) {
    const { guestId } = await getOrCreateGuest();
    userId = guestId;
  }

  const { error } = await supabaseAdmin.rpc("decrement_games", {
    user_id: userId,
  });

  if (error) {
    console.error(error.message);
  }
};

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

    updateGameCount();

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
