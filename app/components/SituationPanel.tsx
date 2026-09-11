import { Verdict } from "../data/type";
import ResultSection from "./ResultSection";
import { MessageCircleMore } from "lucide-react";

interface SituationPanelProps {
  startError: string | null;
  scenario: string;
  excuse: string;
  submittedExcuse: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
  verdict: Verdict | null;
  onReset: () => void;
  onShare: () => Promise<void> | void;
  isSharing?: boolean;
  isPublished?: boolean;
}

export default function SituationPanel({
  scenario,
  excuse,
  submittedExcuse,
  loading,
  onChange,
  onSubmit,
  verdict,
  onReset,
  startError,
  onShare,
  isSharing = false,
  isPublished = false,
}: SituationPanelProps) {
  return (
    <section className="max-w-5xl w-full mx-auto px-4">
      <div className="rounded-2xl glass-panel px-4 py-4 shadow-md transition-all duration-300">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-2 items-center">
            <span className="text-6xl">🎯</span>
            <div>
              <h2 className="text-3xl font-black tracking-tight text-primary font-baloo2">
                {startError ? "Error" : "Scenario"}
              </h2>
              {startError ? (
                <div className="text-lg px-2 py-1 text-red-700">
                  {startError}
                </div>
              ) : (
                <p className="text-lg text-secondary font-bold leading-7">
                  {scenario}
                </p>
              )}
            </div>
          </div>

          <div
            className="grid transition-all duration-300 ease-in-out grid-rows-[1fr] aria-hidden:grid-rows-[0fr] opacity-100 aria-hidden:opacity-0"
            aria-hidden={!!submittedExcuse}
          >
            <div className={`overflow-hidden min-h-0 relative`}>
              <textarea
                value={excuse}
                onChange={(event) => onChange(event.target.value)}
                className="min-h-50 w-full rounded-2xl border border-slate-200 bg-primary-bg px-3 py-2 text-lg leading-7 text-primary shadow-sm outline-none transition-transform duration-300 ease-out focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                placeholder="My defense begins..."
                maxLength={500}
              />
              <span className="absolute bottom-3 right-3 text-sm text-tertiary">
                {excuse.length}/500
              </span>
            </div>
          </div>

          <div>
            <div
              className="grid transition-all duration-300 ease-in-out grid-rows-[0fr] aria-expanded:grid-rows-[1fr] opacity-0 aria-expanded:opacity-100"
              aria-expanded={!!submittedExcuse}
            >
              <div className="overflow-hidden min-h-0 pb-2">
                <div className="rounded-2xl glass-panel px-4 py-3 shadow-sm  ">
                  <h2 className="flex items-center gap-1 text-2xl font-black tracking-tight text-primary font-baloo2">
                    <MessageCircleMore className="w-6.5 h-6.5" /> Your Excuse
                  </h2>
                  <p className="text-base text-secondary font-semibold leading-7">
                    &rdquo;{submittedExcuse}&rdquo;
                  </p>
                </div>
              </div>
            </div>

            <ResultSection
              submittedExcuse={submittedExcuse}
              verdict={verdict}
              onReset={onReset}
              onShare={onShare}
              isSharing={isSharing}
              isPublished={isPublished}
            />
          </div>

          {!submittedExcuse && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={onSubmit}
                disabled={loading || !excuse.trim()}
                className="inline-flex w-full max-w-2xl items-center justify-center rounded-2xl bg-linear-to-r from-violet-500 via-indigo-500 to-blue-500 px-8 py-4 text-xl font-black text-white shadow-[0_16px_40px_rgba(63, 81, 181,0.32)]  transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Rating…" : "Rate My Excuse"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
