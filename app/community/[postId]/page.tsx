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
