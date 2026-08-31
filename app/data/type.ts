export type Message = {
  role: "assistant" | "user";
  content: string;
};

export type Toast = {
  message: string;
  success: boolean;
};

export type Verdict = {
  score: number;
  mascotReaction: string;
  reaction: string;
  improvisation: number;
  creativity: number;
  confidence: number;
};

export type Comment = {
  id: number;
  name: string;
  avatar: string;
  isOwner: boolean;
  time: string;
  body: string;
};

export type Post = {
  id: number;
  user_id: string;
  name: string;
  avatar: string;
  scenario: string;
  excuse: string;
  score: number;
  likes: number;
  isLiked: boolean;
};
