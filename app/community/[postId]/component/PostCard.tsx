"use client";

import { useState } from "react";
import { deletePost, likePost, unlikePost } from "@/app/utils/libs/supabaseClient";
import ToastMessage from "@/app/components/ToastMessage";
import { Post, Toast } from "@/app/data/type";
import Image from "next/image";
import { Clock3, Trash2 } from "lucide-react";
import Link from "next/link";

function getSafeAvatar(src?: string | null) {
  if (!src || src === "undefined" || src === "null" || src.trim() === "") {
    return "/img/user.jpg";
  }
  return src;
}

interface props {
  postData: Post;
}

export default function PostCard({ postData }: props) {
  const [liked, setLiked] = useState(postData.isLiked);
  const [likeCount, setLikeCount] = useState(Number(postData.likes));
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  const handleLike = async () => {
    if (loading) return;

    setLoading(true);

    try {
      if (liked) {
        const error = await unlikePost(postData.id);
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
        const error = await likePost(postData.id);
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

  const handleDelete = async () => {
    if (loading || !postData) return;

    setLoading(true);

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?",
    );
    if (!confirmDelete) {
      setLoading(false);
      return;
    }

    const error = await deletePost(postData.id);
    if (error) {
      setToast({
        message: error,
        success: false,
      });
      setLoading(false);
      return;
    }

    setToast({
      message: "Post deleted successfully.",
      success: true,
    });

    setLoading(false);
  };

  const safeAvatar = getSafeAvatar(postData.avatar);

  return (
    <>
      <article className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm">
        <div className="bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 p-6 text-white sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <Link href={`/u/${postData.user_id}`} className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white/70 bg-white/20 shadow-lg shadow-indigo-900/20">
                <Image
                  src={safeAvatar}
                  alt={postData.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-indigo-100">
                  Posted by
                </p>
                <h1 className="text-lg font-black sm:text-xl">
                  {postData.name}
                </h1>
              </div>
            </Link>
            <div className="rounded-xl border border-white/30 bg-white/10 px-2.5 py-1 text-sm font-bold uppercase tracking-[0.14em] text-indigo-50">
              Score {postData.score}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 p-2 sm:p-4">
          <div className="flex flex-col gap-2">
            <section className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
              <div className="pb-2 flex items-center gap-2 text-sm font-black text-slate-800">
                🎯 Mission
              </div>
              <p className="text-base font-bold leading-relaxed text-slate-900 sm:text-lg">
                {postData.scenario}
              </p>
            </section>

            <section className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
              <div className="pb-2 flex items-center gap-2 text-sm font-black text-slate-800">
                💬 Excuse
              </div>
              <blockquote className="text-lg font-semibold leading-relaxed text-slate-600 sm:text-xl">
                “{postData.excuse}”
              </blockquote>
            </section>
          </div>

          <div className="flex flex-row items-center justify-between gap-4 border-t border-slate-200 p-2 pt-4">
            <button
              onClick={handleLike}
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
                  onClick={() => handleDelete()}
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
        </div>
      </article>
      {toast && (
        <ToastMessage
          message={toast.message}
          success={toast.success}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
