import PostCard from "../component/PostCard";
import { fetchPostById } from "@/app/utils/libs/supabaseServer";
import { notFound } from "next/navigation";

export default async function PostStream({ id }: { id: number }) {
    const postData = await fetchPostById(id);

    if (!postData) notFound();

    return <PostCard postData={postData} />;
}