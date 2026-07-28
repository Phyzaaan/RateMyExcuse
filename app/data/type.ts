export type Message = {
  role: "assistant" | "user";
  content: string;
};

export type Verdict = {
  score: number;
  emoji: string;
  reaction: string;
  believability: number;
  creativity: number;
  confidence: number;
};