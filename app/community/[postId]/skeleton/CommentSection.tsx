export default function CommentSectionSkeleton() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="h-3 w-24 rounded bg-slate-200" />
          <div className="h-6 w-40 rounded bg-slate-200 mt-2" />
        </div>

        <div className="h-6 w-36 rounded bg-slate-200" />
      </div>

      <div className="flex flex-col gap-3 mt-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-slate-50/80 p-3">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 shrink-0 rounded-full bg-slate-200" />
              <div className="flex-1">
                <div className="h-3 w-32 rounded bg-slate-200" />
                <div className="h-6 w-full rounded bg-slate-200 mt-2" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 mt-4">
        <div className="h-4 w-28 rounded bg-slate-200" />
        <div className="flex items-center gap-3 mt-3">
          <div className="h-10 flex-1 rounded bg-slate-200" />
          <div className="h-10 w-24 rounded bg-slate-200" />
        </div>
      </div>
    </section>
  );
}
