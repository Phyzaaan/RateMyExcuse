"use client";

import { Comment, Toast } from "@/app/data/type";
import Image from "next/image";
import getSafeAvatar from "@/app/utils/libs/getSafeAvatar";
import { useState } from "react";
import { addComment, deleteComment } from "@/app/utils/libs/supabaseClient";
import ToastMessage from "@/app/components/ToastMessage";
import formatTime from "@/app/utils/libs/formatTime";
import { Trash2 } from "lucide-react";

export default function CommentSection({
  initialComments,
  post_id,
}: {
  initialComments: Comment[] | null;
  post_id: number;
}) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [comments, setComments] = useState<Comment[]>(initialComments ?? []);

  async function onSubmit() {
    if (!comment.trim()) return;
    setLoading(true);

    const id = await addComment(post_id, comment);

    if (typeof id === "string") {
      setToast({ message: id, success: false });
      setLoading(false);
      return;
    }
    const res = localStorage.getItem("userData");

    if (!res) return;

    const data = JSON.parse(res);
    setComments((prev) => [
      ...prev,
      {
        id: id,
        name: data.username,
        avatar: data.avatar,
        isOwner: true,
        time: new Date().toISOString(),
        body: comment,
      },
    ]);
    setComment("");
    setToast({ message: "Your Comment is Posted!", success: true });
    setLoading(false);
  }

  async function handleDelete(id: number) {
    setLoading(true);
    const error = await deleteComment(id);

    setComments((prev) => prev.filter((c) => c.id !== id));

    if (error) {
      setToast({ message: error, success: false });
      setLoading(false);
      return;
    }
    setToast({ message: "Your Comment is Deleted!", success: true });
    setLoading(false);
  }

  return (
    <>
      <section className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] sm:p-6">
        <div className="pb-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
              Discussion
            </p>
            <h2 className="text-2xl font-black text-primary">Comments</h2>
          </div>

          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-sm font-bold text-slate-600">
            Total Comments:{" "}
            <span className="text-md">{comments?.length ?? 0}</span>
          </span>
        </div>

        <div className="flex flex-col gap-2 pb-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-xl border border-slate-200 bg-slate-50/80 p-2"
            >
              <div className="flex items-start gap-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-white">
                  <Image
                    src={getSafeAvatar(comment.avatar)}
                    alt={comment.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-black text-primary">
                      {comment.name}
                    </span>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                      {formatTime(comment.time)}
                      {comment.isOwner && (
                        <button
                          onClick={() => handleDelete(comment.id)}
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

                  <p className="pt-2 text-sm leading-relaxed text-slate-700">
                    {comment.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
          <label className="pb-2 block text-sm font-bold text-slate-700">
            Add a comment
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="Share your thoughts..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none ring-0 transition placeholder:text-slate-400 focus:border-indigo-300"
            />
            <button
              onClick={onSubmit}
              disabled={loading}
              className={`rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-black text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 ${loading && "cursor-not-allowed"}`}
            >
              {loading ? (
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
              ) : (
                <span>Post</span>
              )}
            </button>
          </div>
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
