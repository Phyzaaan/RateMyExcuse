import { supabase } from "../supabase/client";

export async function fetchCommunityPosts(
  limit: number,
  offset: number,
  userId?: string,
) {
  let query = supabase
    .from("community_posts")
    .select(
      `id, user_id, scenario, excuse, total_score, likes(count), users!community_posts_user_id_fkey ( username, avatar ), created_at`,
    )
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (userId) {
    query = query.eq("user_id", userId);
  }

  const { data, error } = await query;

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
      likes: likeCount,
      isLiked: likedPostIds.includes(post.id),
      created_at: post.created_at,
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

export async function addComment(postId: number, comment: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("You must be logged in to comment.");
    return "You must be logged in to comment.";
  }

  const { data, error } = await supabase
    .from("comments")
    .insert({
      user_id: user.id,
      post_id: postId,
      comment,
    })
    .select("id")
    .single();

  if (error) {
    console.error(error);
    return error.message;
  }
  return data.id as number;
}

export async function deleteComment(commentId: number) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("You must be logged in to delete a comment.");
    return "You must be logged in to delete a comment.";
  }

  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId)
    .eq("user_id", user.id);

  if (error) {
    console.error(error);
    return error.message;
  }
}

export async function deleteUserProfile(user_id: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("You must be logged in to delete your profile.");
    return "You must be logged in to delete your profile.";
  }

  if (user.id !== user_id) {
    console.error("You can only delete your own profile.");
    return "You can only delete your own profile.";
  }

  const { error } = await supabase
    .from("users")
    .delete()
    .eq("user_id", user_id);

  if (error) {
    console.error(error);
    return error.message;
  }
}

export async function updateUserProfile(
  username: string | undefined,
  avatarUrl?: string | undefined,
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("You must be logged in to update your profile.");
    return "You must be logged in to update your profile.";
  }

  const { error } = await supabase
    .from("users")
    .update({
      username: username,
      avatar: avatarUrl,
    })
    .eq("user_id", user.id);

  if (error) {
    console.error(error);
    return error.message;
  }
}
