import { supabase } from "../supabase/client";
import getUserId from "../auth/getUserId";

export async function fetchPostById(id: number) {
  const { data: post, error } = await supabase
    .from("community_posts")
    .select(
      `id, user_id, scenario, excuse, total_score, likes(count), users!community_posts_user_id_fkey ( username, avatar )`,
    )
    .eq("id", id)
    .maybeSingle();

  if (error || !post) {
    console.error(error);
    return null;
  }

  const userId = await getUserId();

  let isLiked = false;

  if (userId) {
    console.log("The Funchiin is runned");
    const postId = post.id;

    const { data: userLikes, error: likesError } = await supabase
      .from("likes")
      .select("post_id")
      .eq("user_id", userId)
      .eq("post_id", postId)
      .maybeSingle();

    if (likesError) {
      console.error(likesError);
    }
    if (userLikes) isLiked = true;
  }

  console.log(isLiked);
  const userData = Array.isArray(post.users) ? post.users[0] : post.users;
  const likeCount = Array.isArray(post.likes) ? (post.likes[0]?.count ?? 0) : 0;

  return {
    id: post.id,
    user_id: post.user_id,
    name: userData?.username ?? "Guest",
    avatar: userData?.avatar ?? "/img/user.jpg",
    scenario: post.scenario,
    excuse: post.excuse,
    score: post.total_score,
    likes: likeCount,
    isLiked: isLiked,
  };
}

export async function fetchComments(postId: number, limit: number) {
  const { data, error } = await supabase
    .from("comments")
    .select(
      `id, user_id, comment, created_at, users!comments_user_id_fkey ( username, avatar )`,
    )
    .eq("post_id", postId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data) {
    console.error(error);
    return null;
  }

  const userId = await getUserId();

  return data.map((comment) => {
    const userData = Array.isArray(comment.users)
      ? comment.users[0]
      : comment.users;

    return {
      id: comment.id,
      name: userData?.username ?? "Guest",
      avatar: userData?.avatar ?? "/img/user.jpg",
      isOwner: userId == comment.user_id ? true : false,
      time: comment.created_at,
      body: comment.comment,
    };
  });
}
