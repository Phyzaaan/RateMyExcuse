export type Message = {
  role: "assistant" | "user";
  content: string;
};

export type Verdict = {
  score: number;
  reaction: string;
  believability: number;
  creativity: number;
  logic: number;
  confidence: number;
};