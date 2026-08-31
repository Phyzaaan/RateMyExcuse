import CommentSection from "../component/CommentSection";
import { fetchComments } from "@/app/utils/libs/supabaseServer";

export default async function CommentsStream({ post_id, limit = 10 }: { post_id: number; limit?: number }) {
  const comments = await fetchComments(post_id, limit);

  return <CommentSection initialComments={comments} post_id={post_id} />;
}
