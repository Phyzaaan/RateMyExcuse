export type Message = {
  role: "assistant" | "user";
  content: string;
};

export type Verdict = {
  score: number;
  mascotReaction: string;
  reaction: string;
  improvisation: number;
  creativity: number;
  confidence: number;
};
