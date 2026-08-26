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
export type Post = {
  user_id: string;
  name: string;
  avatar: string;
  scenario: string;
  excuse: string;
  score: number;
  likes: string;
  color: string;
};
