import { fetchPostById } from "@/app/utils/libs/supabaseServer";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Filter } from "lucide-react";
import PostCard from "./component/PostCard";

type Props = {
  params: Promise<{
    postId: string;
  }>;
};

const dummyComments = [
  {
    id: 1,
    name: "Maya",
    avatar: "/img/user.jpg",
    time: "3m ago",
    body: "This is such a classic last-minute excuse. The timing is believable, but the delivery needs just a little more confidence.",
  },
  {
    id: 2,
    name: "Theo",
    avatar: "/img/Doofus.png",
    time: "18m ago",
    body: 'I would absolutely buy this in a work meeting. The fact that it mentions a "power outage" makes it sound dramatic without being too absurd.',
  },
  {
    id: 3,
    name: "Priya",
    avatar: "/img/happy.png",
    time: "1h ago",
    body: "Not bad at all. It reads like a real panic moment, and the score feels fair for how polished it sounds.",
  },
];

function getSafeAvatar(src?: string | null) {
  if (!src || src === "undefined" || src === "null" || src.trim() === "") {
    return "/img/user.jpg";
  }

  return src;
}

export default async function CommunityPost({ params }: Props) {
  const param = await params;
  const id = Number(param.postId);
  if (Number.isNaN(id)) notFound();

  const postData = await fetchPostById(id);

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

      <section className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] sm:p-6">
        <div className="pb-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
              Discussion
            </p>
            <h2 className="text-2xl font-black text-primary">Comments</h2>
          </div>

          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-sm font-bold text-slate-600">
            Total Comments: <span className="text-md">{dummyComments.length}</span>
          </span>
        </div>

        <div className="flex flex-col gap-2 pb-4">
          {dummyComments.map((comment) => (
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
                    <span className="text-xs font-semibold text-slate-500">
                      {comment.time}
                    </span>
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
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none ring-0 transition placeholder:text-slate-400 focus:border-indigo-300"
            />
            <button
              type="button"
              className="rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-black text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5"
            >
              Post
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
