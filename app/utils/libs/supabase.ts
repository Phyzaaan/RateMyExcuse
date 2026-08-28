import { supabase } from "../supabase/client";

export async function fetchCommunityPosts(limit: number) {
  const { data, error } = await supabase
    .from("community_posts")
    .select(
      `id, user_id, scenario, excuse, total_score, likes(count), users!community_posts_user_id_fkey ( username, avatar )`,
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data) {
    console.error(error);
    return null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let likedPostIds: number[] = [];

  if (user) {
    const postIds = data.map((post) => post.id);

    const { data: userLikes, error: likesError } = await supabase
      .from("likes")
      .select("post_id")
      .eq("user_id", user.id)
      .in("post_id", postIds);

    if (likesError) {
      console.error(likesError);
    } else {
      likedPostIds = userLikes.map((like) => like.post_id);
    }
  }

  return data.map((post) => {
    const userData = Array.isArray(post.users) ? post.users[0] : post.users;

    const likeCount = Array.isArray(post.likes)
      ? (post.likes[0]?.count ?? 0)
      : 0;

    return {
      id: post.id,
      user_id: post.user_id,
      name: userData?.username ?? "Guest",
      avatar: userData?.avatar ?? "/img/user.jpg",
      scenario: post.scenario,
      excuse: post.excuse,
      score: post.total_score,
      likes: String(likeCount),
      isLiked: likedPostIds.includes(post.id),
    };
  });
}

export async function likePost(postId: number) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("You must be logged in to like a post.");
    return "You must be logged in to like a post.";
  }

  const { error } = await supabase.from("likes").insert({
    user_id: user.id,
    post_id: postId,
  });

  if (error) {
    console.error(error);
    return error?.message;
  }
}

export async function unlikePost(postId: number) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("You must be logged in to unlike a post.");
    return "You must be logged in to unlike a post.";
  }

  const { error } = await supabase
    .from("likes")
    .delete()
    .eq("user_id", user.id)
    .eq("post_id", postId);

  if (error) {
    console.error(error);
    return error?.message;
  }
}
