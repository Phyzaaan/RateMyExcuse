"use client";

import Image from "next/image";
import { useState } from "react";
import { likePost, unlikePost } from "../utils/libs/supabase";

type PostCardProps = {
  item: {
    id: number;
    name: string;
    avatar: string;
    scenario: string;
    excuse: string;
    score: number;
    likes: string;
    isLiked: boolean;
  };
};

export default function PostCard({ item }: PostCardProps) {
  const [liked, setLiked] = useState(item.isLiked);
  const [likeCount, setLikeCount] = useState(Number(item.likes));
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (loading) return;

    setLoading(true);

    try {
      if (liked) {
        await unlikePost(item.id);

        setLiked(false);
        setLikeCount((count) => count - 1);
      } else {
        await likePost(item.id);

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
    <div className="relative flex w-64 shrink-0 snap-start flex-col justify-between rounded-2xl border border-slate-200/70 bg-primary-bg/70 p-4 pt-6 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:shadow-sm sm:p-5">
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
      <div className="mt-6 flex items-center justify-between sm:mt-8">
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
          onClick={handleLike}
          disabled={loading}
          aria-label={liked ? "Unlike post" : "Like post"}
          className="flex shrink-0 items-center gap-1 text-xs font-bold text-primary cursor-pointer transition-transform active:scale-90 disabled:opacity-60"
        >
          <span className="text-base">{liked ? "❤️" : "🤍"}</span>

          <span>{likeCount}</span>
        </button>
      </div>

      {/* Score */}
      <div className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 bg-primary-bg text-lg font-black text-emerald-500 shadow-md shadow-slate-200/50 sm:h-12 sm:w-12 sm:text-xl">
        {item.score}
      </div>
    </div>
  );
}
