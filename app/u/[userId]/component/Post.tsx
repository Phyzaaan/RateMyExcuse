import { Post, Toast } from "@/app/data/type";
import { Clock3, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  likePost,
  unlikePost,
} from "@/app/utils/libs/supabaseClient";
import { useState } from "react";

export default function PostCard({
  postData,
  setToast,
  handleDelete,
}: {
  handleDelete: (postId: number) => void;
  setToast: (toast: Toast | null) => void;
  postData: Post;
}) {
  const [liked, setLiked] = useState(postData.isLiked);
  const [likeCount, setLikeCount] = useState(postData.likes);
  const [loading, setLoading] = useState(false);

  const handleLike = async (postId: number) => {
    if (loading || !postData) return;

    setLoading(true);

    try {
      if (liked) {
        const error = await unlikePost(postId);
        if (error) {
          setToast({
            message: error,
            success: false,
          });
          throw Error(error);
        }

        setLiked(false);
        setLikeCount((count) => count - 1);
      } else {
        const error = await likePost(postId);
        if (error) {
          setToast({
            message: error,
            success: false,
          });
          throw Error(error);
        }

        setLiked(true);
        setLikeCount((count) => count + 1);
      }
    } catch (error) {
      console.error("Failed to update like:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link
      href={`/community/${postData.id}`}
      key={postData.id}
      className="rounded-2xl border border-slate-200/70 bg-white/60 p-3 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md sm:p-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-primary">
            Mission
          </p>
          <h3 className="pt-1 text-sm font-bold leading-snug text-primary sm:text-base">
            {postData.scenario}
          </h3>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-emerald-100 text-lg font-black text-emerald-600">
          {postData.score}
        </div>
      </div>

      <div className="pt-3">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-primary">
          Excuse
        </p>
        <p className="pt-1 text-sm font-medium leading-relaxed text-secondary sm:text-[15px]">
          &ldquo;{postData.excuse}&rdquo;
        </p>
      </div>

      <div className="flex flex-row items-center justify-between gap-4 border-t border-slate-200 p-2 pt-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleLike(postData.id);
          }}
          disabled={loading}
          aria-label={liked ? "Unlike post" : "Like post"}
          className="flex shrink-0 items-center gap-1 text-xs font-bold text-primary cursor-pointer transition-transform active:scale-90 disabled:opacity-60 group/like"
        >
          <span className="text-base group-active/like:scale-90 group-hover/like:scale-110">
            {liked ? "❤️" : "🤍"}
          </span>

          <span>{likeCount}</span>
        </button>
        <div className="flex items-center gap-2 text-[11px] font-semibold text-secondary">
          <Clock3 className="h-3.5 w-3.5" />
          {postData.created_at
            ? new Date(postData.created_at).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "Recent"}
          {postData.isOwner && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleDelete(postData.id);
              }}
              disabled={loading}
              className={`hover:scale-110 active:scale-90 ${loading && "cursor-not-allowed"}`}
            >
              <Trash2
                className={`w-4 h-4 text-red-500 ${loading && "text-red-500/50"}`}
              />
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
