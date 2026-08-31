import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Suspense } from "react";
import PostStream from "./stream/PostSream";
import CommentsStream from "./stream/CommentsStream";
import PostCardSkeleton from "./skeleton/PostCard";
import CommentSectionSkeleton from "./skeleton/CommentSection";

type Props = {
  params: Promise<{
    postId: string;
  }>;
};

export default async function CommunityPost({ params }: Props) {
  const param = await params;
  const id = Number(param.postId);
  if (Number.isNaN(id)) return null;

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

      <Suspense fallback={<PostCardSkeleton />}>
        {/* Server component that fetches the post and will call notFound() if missing */}
        <PostStream id={id} />
      </Suspense>

      <Suspense fallback={<CommentSectionSkeleton />}>
        <CommentsStream post_id={id} limit={10} />
      </Suspense>
    </main>
  );
}
