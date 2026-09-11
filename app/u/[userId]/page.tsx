import { notFound } from "next/navigation";
import { getUserDataByUserId } from "@/app/utils/libs/supabaseServer";
import UserProfile from "@/app/u/[userId]/component/UserProfile";
import UserPosts from "@/app/u/[userId]/component/UserPosts";

type Params = {
  params: Promise<{
    userId: string;
  }>;
};

export default async function Page({ params }: Params) {
  const { userId } = await params;

  const { data, isOwner, error } = await getUserDataByUserId(userId);

  if (error || !data) notFound();

  return (
    <main className="relative w-full flex flex-col items-center justify-center gap-6 py-8 px-4">
      <UserProfile user={data} isOwner={isOwner} />
      <UserPosts userId={data.user_id ?? userId} />
    </main>
  );
}
