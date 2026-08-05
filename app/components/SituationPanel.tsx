interface SituationPanelProps {
  scenario: string;
  excuse: string;
  submittedExcuse: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export default function SituationPanel({
  scenario,
  excuse,
  submittedExcuse,
  loading,
  onChange,
  onSubmit,
}: SituationPanelProps) {
  return (
    !submittedExcuse && (
      <section className="w-full max-w-5xl mx-auto px-4">
        <div className="rounded-2xl glass-panel px-2 py-4 shadow-md">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2 items-center">
              <span className="text-6xl">🎯</span>
              <div>
                <p className="text-sm uppercase tracking-wide text-tertiary">
                  Mission
                </p>
                <p className="text-xl lg:text-2xl font-semibold leading-tight text-primary">
                  {scenario}
                </p>
              </div>
            </div>

            <div className="relative">
              <textarea
                value={excuse}
                onChange={(event) => onChange(event.target.value)}
                className="min-h-50 w-full rounded-2xl border border-slate-200 bg-primary-bg px-3 py-2 text-lg leading-7 text-primary shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                placeholder="My defense begins..."
                maxLength={500}
              />
              <span className="absolute bottom-3 right-3 text-sm text-tertiary">
                {excuse.length}/500
              </span>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={onSubmit}
                disabled={loading || !excuse.trim()}
                className="inline-flex w-full max-w-2xl items-center justify-center rounded-2xl bg-linear-to-r from-violet-500 via-indigo-500 to-blue-500 px-8 py-4 text-base font-black text-white shadow-[0_16px_40px_rgba(63, 81, 181,0.32)]  transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Rating…" : "Rate My Excuse"}
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  );
}
