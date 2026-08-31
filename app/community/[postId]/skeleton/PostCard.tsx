export default function PostCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 shadow-[0_20px_60px_rgba(15,23,42,0.08)] animate-pulse">
      <div className="bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-slate-200" />
            <div className="flex flex-col gap-2">
              <div className="h-3 w-24 rounded bg-slate-200" />
              <div className="h-4 w-32 rounded bg-slate-200" />
            </div>
          </div>

          <div className="h-8 w-20 rounded bg-slate-200" />
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <section className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
          <div className="h-4 w-28 rounded bg-slate-200" />
          <div className="h-6 w-full rounded bg-slate-200 mt-3" />
        </section>

        <section className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
          <div className="h-4 w-20 rounded bg-slate-200" />
          <div className="h-8 w-full rounded bg-slate-200 mt-3" />
        </section>

        <div className="flex items-center justify-between p-2 pt-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-12 rounded bg-slate-200" />
            <div className="h-4 w-8 rounded bg-slate-200" />
          </div>

          <div className="h-4 w-48 rounded bg-slate-200" />
        </div>
      </div>
    </article>
  );
}
