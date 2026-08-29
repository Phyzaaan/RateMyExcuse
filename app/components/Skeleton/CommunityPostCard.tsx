export default function PostCardSkeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`relative flex w-64 shrink-0 snap-start flex-col justify-between rounded-2xl border border-slate-200/70 bg-primary-bg/70 p-4 pt-6 backdrop-blur-md animate-pulse sm:p-5 ${className}`}
    >
      {/* Content Top */}
      <div className="flex h-full w-full flex-col gap-4">
        {/* Scenario */}
        <div className="flex flex-col gap-1">
          <div className="h-6 w-30 rounded bg-slate-300" />

          <div className="flex flex-col gap-0.5">
            <div className="h-4 w-full rounded bg-slate-300" />
            <div className="h-4 w-5/6 rounded bg-slate-300" />
            <div className="h-4 w-3/5 rounded bg-slate-300" />
          </div>
        </div>

        {/* Excuse */}
        <div className="flex flex-col gap-1">
          <div className="h-6 w-30 rounded bg-slate-300" />

          <div className="flex flex-col gap-0.5">
            <div className="h-4 w-full rounded bg-slate-300" />
            <div className="h-4 w-5/6 rounded bg-slate-300" />
            <div className="h-4 w-3/5 rounded bg-slate-300" />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="py-2">
        <div className="border-3 border-slate-300 rounded-2xl" />
      </div>

      {/* Bottom Row */}
      <div className="flex items-center justify-between sm:pt-8">
        {/* User */}
        <div className="flex min-w-0 items-center gap-2 pr-10">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-300" />

          <div className="h-5 w-35 rounded bg-slate-300" />
        </div>

        {/* Like */}
        <div className="flex shrink-0 items-center gap-1">
          <div className="h-7 w-7 rounded-full bg-slate-300" />
          <div className="h-6 w-7 rounded bg-slate-300" />
        </div>
      </div>

      {/* Score */}
      <div className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 bg-primary-bg text-lg font-black text-emerald-500 shadow-md shadow-slate-200/50 sm:h-12 sm:w-12 sm:text-xl">
        <div className="h-10 w-10 rounded-full bg-slate-300" />
      </div>
    </div>
  );
}
