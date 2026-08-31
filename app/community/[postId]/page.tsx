import { fetchPostById, fetchComments } from "@/app/utils/libs/supabaseServer";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PostCard from "./component/PostCard";
import CommentSection from "./component/CommentSection";

type Props = {
  params: Promise<{
    postId: string;
  }>;
};

export default async function CommunityPost({ params }: Props) {
  const param = await params;
  const id = Number(param.postId);
  if (Number.isNaN(id)) notFound();

  const [postData, comments] = await Promise.all([
    fetchPostById(id),
    fetchComments(id, 10),
  ]);

  if (!postData) notFound();

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-4 text-primary">
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/community"
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/75 px-3 py-2 text-sm font-bold text-primary shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to community
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/75 px-3 py-2 text-sm font-bold text-primary shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          Back to Home
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <PostCard postData={postData} />

      <CommentSection initialComments={comments} post_id={id} />
    </main>
  );
}
