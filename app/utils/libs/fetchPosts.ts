import { supabase } from "../supabase/client";

export async function fetchCommunityPosts(limit: number) {
  const { data, error } = await supabase
    .from("community_posts")
    .select(
      `user_id, 
      scenario, 
      excuse, 
      total_score, 
      likes, 
      users (
        username,
        avatar
      )`,
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data) {
    console.error(error);
    return null;
  }

  return data.map((post) => ({
    user_id: post.user_id,
    name:
      (Array.isArray(post.users)
        ? post.users[0].username
        : (post.users as { username: string; avatar: string }).username) ??
      "Guest",
    avatar:
      (Array.isArray(post.users)
        ? post.users[0].avatar
        : (post.users as { username: string; avatar: string }).avatar) ??
      "/img/user.jpg",
    scenario: post.scenario,
    excuse: post.excuse,
    score: post.total_score,
    likes: String(post.likes),
    color: "violet-500",
  }));
}
