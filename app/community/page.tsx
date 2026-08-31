"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Users } from "lucide-react";
import CommunityPostCard from "../components/CommunityPostCard";
import ToastMessage from "../components/ToastMessage";
import PostCardSkeleton from "../components/Skeleton/CommunityPostCard";
import type { Post, Toast } from "../data/type";
import { fetchCommunityPosts } from "../utils/libs/supabaseClient";

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadPosts() {
      setLoading(true);
      const data = await fetchCommunityPosts(20);

      if (!isMounted) return;

      setPosts(data ?? []);
      setLoading(false);
    }

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="flex flex-col max-w-5xl w-full min-h-screen text-primary gap-6 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-900">
            <Users className="h-6 w-6" fill="#372aac" />
          </div>

          <div>
            <p className="text-2xl font-baloo2 font-black text-indigo-900 sm:text-3xl">
              Community Excuses
            </p>
            <p className="text-sm font-semibold text-secondary">
              Real people, real excuses, real scores.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/75 px-3 py-2 text-sm font-bold text-primary shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Game
          </Link>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 pb-8">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <PostCardSkeleton key={index} className="w-full" />
          ))
        ) : posts && posts.length > 0 ? (
          posts.map((post) => (
            <CommunityPostCard
              key={post.id}
              item={post}
              setToast={setToast}
              className="w-full"
            />
          ))
        ) : (
          <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white/50 p-8 text-center text-sm font-medium text-secondary">
            No excuses yet. Be the first to share one.
          </div>
        )}
      </div>

      {toast && (
        <ToastMessage
          message={toast.message}
          success={toast.success}
          onClose={() => setToast(null)}
        />
      )}
    </main>
  );
}
