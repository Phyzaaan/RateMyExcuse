import { NextResponse } from "next/server";

const CONTEXTS = [
  "your grandmother's funeral",
  "your wedding reception",
  "a courtroom hearing",
  "the school parent-teacher conference",
  "family Thanksgiving dinner",
  "your driving test",
  "a job interview",
  "the company all-hands meeting",
  "your annual performance review",
  "airport security",
  "your in-laws' first visit",
  "a blind date",
  "a fire drill",
  "your best friend's baby shower",
  "a business meeting with the CEO",
  "your therapist's office",
  "your child's school play",
  "the office Christmas party",
  "your own engagement party",
  "a hospital waiting room",
];

// --- STATE_RECIPES / ACTION_RECIPES ---------------------------------------
// A small rule-based grammar: every filler is already known to make
// grammatical + semantic sense after that specific verb. 
//
// Articles ("a"/"an") are written directly into each filler string rather
// than computed — computing "a" vs "an" from spelling has real edge cases
// (e.g. "a unicycle" not "an unicycle"), so baking it in avoids a whole
// class of subtle grammar bugs for a handful of extra characters per entry.

const STATE_RECIPES: Record<string, string[]> = {
  wearing: [
    "a full suit of armor",
    "a full wedding dress",
    "a full scuba diving suit",
    "a giant sombrero",
    "your pajamas inside out",
    "roller skates",
    "a full clown costume",
    "a graduation gown",
  ],
  holding: [
    "a live chicken",
    "an inflatable T-rex",
    "a microphone you don't remember picking up",
    "a birthday cake with too many candles",
    "a rubber duck",
    "a stack of parking tickets",
    "a bouquet of wilted flowers",
    "a very large trophy",
  ],
  "covered in": [
    "glitter",
    "mysterious blue paint",
    "confetti",
    "flour",
    "temporary tattoos",
    "whipped cream",
    "grass stains",
    "glow-in-the-dark stickers",
  ],
  riding: [
    "a unicycle",
    "a shopping cart",
    "a mechanical bull",
    "a child's tricycle",
    "a Segway",
    "an inflatable pool float",
    "a shopping cart full of watermelons",
  ],
  "dressed as": [
    "a giant banana",
    "a medieval knight",
    "a superhero with no actual powers",
    "your own boss",
    "a mascot with no team",
    "a Victorian ghost",
    "a traffic cone",
  ],
};

const ACTION_RECIPES: Record<string, string[]> = {
  launching: [
    "the production database into space",
    "your resignation letter through a paper shredder for fun",
    "a paper airplane during the CEO's speech",
    "an internal investigation into the missing stapler",
  ],
  microwaving: [
    "a fish in the break room",
    "your work badge by accident",
    "a burrito for eleven minutes straight",
    "someone else's lunch out of spite",
  ],
  hiring: [
    "a mariachi band without approval",
    "a stranger to pretend to be your assistant",
    "a professional mime for the quarterly meeting",
    "a magician for no stated reason",
  ],
  renaming: [
    "the entire company Slack workspace",
    "the conference room 'The Bat Cave'",
    "every shared folder after types of cheese",
    "the company mascot",
  ],
  adopting: [
    "fourteen cats overnight",
    "a stray peacock from the parking lot",
    "an entire family of raccoons",
    "a retired racehorse",
  ],
  training: [
    "the office parrot to say something inappropriate",
    "a squirrel to steal from a specific coworker",
    "your dog to answer the phone",
    "the office plant to respond to its name",
  ],
  replacing: [
    "every office chair with a beanbag",
    "the printer with a fax machine from 1993",
    "your ID badge photo with a cartoon character",
    "the coffee with decaf without telling anyone",
  ],
};

const AUTHORITIES = [
  "your boss",
  "the judge",
  "your grandmother",
  "airport security",
  "your in-laws",
  "the principal",
  "your date",
  "the HR department",
  "the police officer",
  "your landlord",
  "the wedding planner",
  "your therapist",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateFromRecipes(recipes: Record<string, string[]>): string {
  const verbs = Object.keys(recipes);
  const verb = pick(verbs);
  const filler = pick(recipes[verb]);
  return `${verb} ${filler}`;
}

const STATE_TEMPLATES: Array<(fact: string, ctx: string, auth: string) => string> = [
  (fact, ctx) => `Explain why you are ${fact} at ${ctx}.`,
  (fact, ctx) => `Justify why you showed up ${fact} to ${ctx}.`,
  (fact, ctx, auth) => `Convince ${auth} that being ${fact} during ${ctx} is completely normal.`,
];

const ACTION_TEMPLATES: Array<(fact: string, ctx: string, auth: string) => string> = [
  (fact, _ctx, auth) => `Convince ${auth} why you deserve a promotion for ${fact}.`,
  (fact, ctx) => `Justify why you were caught ${fact} during ${ctx}.`,
  (fact, _ctx, auth) => `Persuade ${auth} that ${fact} was actually a brilliant move.`,
  (fact) => `Explain why ${fact} seemed like a great idea at the time.`,
];

function generateScenario(): string {
  const useState = Math.random() < 0.5;
  const context = pick(CONTEXTS);
  const authority = pick(AUTHORITIES);

  if (useState) {
    const fact = generateFromRecipes(STATE_RECIPES);
    const template = pick(STATE_TEMPLATES);
    return template(fact, context, authority);
  } else {
    const fact = generateFromRecipes(ACTION_RECIPES);
    const template = pick(ACTION_TEMPLATES);
    return template(fact, context, authority);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const recentScenarios: string[] = Array.isArray(body?.recentScenarios)
      ? body.recentScenarios.slice(-20)
      : [];

    let scenario = generateScenario();
    let attempts = 0;

    // Re-roll on the rare exact repeat rather than trying to prompt around it.
    while (recentScenarios.includes(scenario) && attempts < 5) {
      scenario = generateScenario();
      attempts++;
    }

    return NextResponse.json({ scenario });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Failed to start conversation." },
      { status: 500 },
    );
  }
}