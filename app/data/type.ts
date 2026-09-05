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
  isOwner?: boolean;
  created_at: string;
};

export type UserData = {
  user_id?: string | null;
  username?: string | null;
  avatar?: string | null;
  games_played?: number | null;
  games_remaining?: number | null;
  is_premium?: boolean | null;
  highest_score?: number | null;
};
