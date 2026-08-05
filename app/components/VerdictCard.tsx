export default function VerdictCard() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 pb-10">
      <div className="rounded-[3rem] border border-slate-200/80 bg-primary-bg/90 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
        <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] items-center">
          <div className="rounded-[2.5rem] bg-indigo-950/95 p-8 text-center text-white shadow-lg ring-1 ring-white/10">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-tertiary">
              AI Verdict
            </p>
            <div className="mt-4 text-[5rem] md:text-[6rem] font-black leading-none text-rose-500">
              87
            </div>
            <p className="mt-2 text-sm text-tertiary">/100</p>
          </div>

          <div className="space-y-4">
            <p className="text-xl md:text-2xl font-bold text-primary">
              Honestly... deleting the database was a bold move. Your excuse almost
              convinced me. Almost.
            </p>
            <div className="rounded-3xl border border-emerald-200/80 bg-emerald-50/80 p-4 text-sm text-secondary shadow-sm">
              <span className="font-black text-emerald-800">You showed confidence and logic.</span> But deleting it? That’s still wild.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
