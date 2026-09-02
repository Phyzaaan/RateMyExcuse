import { notFound } from "next/navigation";
import { getUserDataByUsername } from "@/app/utils/libs/supabaseServer";
import UserProfile from "@/app/u/[username]/component/UserProfile";
import UserPosts from "@/app/u/[username]/component/UserPosts";

type Params = {
  params: Promise<{
    username: string;
  }>;
};

export default async function Page({ params }: Params) {
  const { username } = await params;

  const { data, isOwner, error } = await getUserDataByUsername(username);

  if (error || !data) notFound();

  return (
    <main className="w-full flex flex-col items-center justify-center gap-6 py-8 px-4">
      <UserProfile user={data} isOwner={isOwner} />
      <UserPosts userId={data.user_id} />
    </main>
  );
}
