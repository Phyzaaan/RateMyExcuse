"use client";

import Image from "next/image";
import { useState } from "react";
import { likePost, unlikePost } from "../utils/libs/supabaseClient";
import Link from "next/link";
import { Post } from "../data/type";

type PostCardProps = {
  item: Post;
  setToast: (
    value: {
      message: string;
      success: boolean;
    } | null,
  ) => void;
  className?: string;
};

export default function PostCard({
  item,
  setToast,
  className = "",
}: PostCardProps) {
  const [liked, setLiked] = useState(item.isLiked);
  const [likeCount, setLikeCount] = useState(Number(item.likes));
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (loading) return;

    setLoading(true);

    try {
      if (liked) {
        const error = await unlikePost(item.id);
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
        const error = await likePost(item.id);
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
      href={`/community/${item.id}`}
      className={`relative flex w-64 shrink-0 snap-start flex-col justify-between rounded-2xl border border-slate-200/70 bg-primary-bg/70 p-2 pt-5 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:shadow-sm sm:p-5 ${className}`}
    >
      {/* Content Top */}
      <div className="flex h-full w-full flex-col gap-2">
        {/* Scenario */}
        <div>
          <span className="text-xs font-extrabold text-primary">
            🎯 Mission
          </span>

          <h4 className="min-h-14 text-sm font-bold leading-snug text-primary line-clamp-3 sm:text-base">
            {item.scenario}
          </h4>
        </div>

        {/* Excuse */}
        <div>
          <span className="text-xs font-semibold text-primary">💬 Excuse</span>

          <p className="text-xs font-medium leading-relaxed text-secondary line-clamp-4 sm:text-sm">
            &quot;{item.excuse}&quot;
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="pb-2">
        <div className="border border-slate-300" />
      </div>

      {/* Bottom Row */}
      <div className="pt-6 flex items-center justify-between sm:pt-8">
        {/* User */}
        <div className="flex min-w-0 items-center gap-2 pr-10">
          <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full border border-slate-200">
            <Image
              src={item.avatar}
              alt={item.name}
              fill
              sizes="28px"
              className="object-cover"
            />
          </div>

          <span className="truncate text-xs font-bold text-primary">
            {item.name}
          </span>
        </div>

        {/* Like */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleLike();
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
      </div>

      {/* Score */}
      <div className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 bg-primary-bg text-lg font-black text-emerald-500 shadow-md shadow-slate-200/50 sm:h-12 sm:w-12 sm:text-xl">
        {item.score}
      </div>
    </Link>
  );
}
