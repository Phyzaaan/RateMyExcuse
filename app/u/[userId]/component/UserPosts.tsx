"use client";

import { useState, useEffect } from "react";
import ToastMessage from "@/app/components/ToastMessage";
import {
  deletePost,
  fetchCommunityPosts as fetchPostsByUserId,
} from "@/app/utils/libs/supabaseClient";
import { Toast, Post } from "@/app/data/type";
import { Sparkles, Trophy } from "lucide-react";
import PostCard from "./Post";
import PostCardSkeleton from "@/app/components/Skeleton/CommunityPostCard";

export default function UserPosts({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [postData, setPostData] = useState<Post[] | null>(null);

  useEffect(() => {
    let valid = false;

    (async function fetchUserPosts() {
      setLoading(true);
      const data = await fetchPostsByUserId(10, 0, userId);
      if (data && !valid) {
        setPostData(data);
      } else {
        console.error("Failed to fetch user posts:");
      }
      setLoading(false);
    })();

    return () => {
      valid = true;
    };
  }, [userId]);

  const handleDelete = async (postId: number) => {
    if (loading || !postData) return;

    setLoading(true);

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?",
    );
    if (!confirmDelete) {
      setLoading(false);
      return;
    }

    const error = await deletePost(postId);
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

  return (
    <>
      <section className="relative w-full max-w-5xl mx-auto glass-panel rounded-xl py-6 px-4 shadow-sm">
        <div className="flex items-center justify-between gap-3 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/60 text-indigo-700">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xl font-baloo2 font-black text-indigo-900">
                Excuse History
              </p>
              <p className="text-xs font-semibold text-secondary">
                Recent submissions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/50 px-3 py-1.5 text-xs font-bold text-primary">
            <Trophy className="h-3.5 w-3.5" />
            {postData?.length ?? 0} entries
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {postData ? (
            postData.map((item) => (
              <PostCard key={item.id} postData={item} setToast={setToast} handleDelete={handleDelete} />
            ))
          ) : loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <PostCardSkeleton key={index} className="w-full" />
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white/40 p-6 text-center text-sm font-medium text-secondary">
              No excuses yet. Start crafting your next masterpiece.
            </div>
          )}
        </div>
      </section>
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
