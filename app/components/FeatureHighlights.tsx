export default function FeatureHighlights() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 pb-10">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200/70 bg-primary-bg/80 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-primary">
            Your Situation
          </h2>
          <p className="mt-3 text-sm md:text-base text-secondary leading-7">
            Convince your boss why deleting the database was a good idea.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/70 bg-primary-bg/80 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-primary">
            Your Excuse
          </h2>
          <p className="mt-3 text-sm md:text-base text-secondary leading-7">
            I was just improving our disaster recovery strategy. Now we have a cleaner,
            faster database! 😎
          </p>
        </div>
      </div>
    </section>
  );
}
