import ScoreBar from "./ScoreBar";
import type { Verdict } from "../data/type";
import Image from "next/image";

interface ResultSectionProps {
  submittedExcuse: string;
  verdict: Verdict | null;
  onReset: () => void;
}

export default function ResultSection({
  submittedExcuse,
  verdict,
  onReset,
}: ResultSectionProps) {
  if (!submittedExcuse) {
    return null;
  }

  const scoreText = verdict ? verdict.score : "--";
  const message = verdict
    ? verdict.reaction
    : "Waiting for the judge to decide if your excuse survives the roast...";

  return (
      <div className="flex flex-col gap-6 text-center">
        
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="inline-flex items-center gap-3 rounded-full text-8xl font-black text-primary">
            <span className="text-primary-color">{scoreText}</span>
            <span className="text-7xl font-extralight -translate-x-5 translate-y-2">
              /
            </span>
            <span className="text-5xl -translate-x-10 translate-y-6">100</span>
          </div>
          <div className="flex items-center gap-3">
            <Image src="/img/Doofus.png" alt="Emoji" width={80} height={80} />
            <div className="relative max-w-md bg-slate-100 text-primary px-2 py-2 rounded-3xl border-4 border-slate-600 font-bold shadow-[2px_2px_0_0_#45556c]">
              <p className="text-lg font-baloo2 font-semibold">{message}</p>
              <div className="absolute top-1/2 left-0 translate-x-[-99%] -translate-y-1/2 w-0 h-0 border-r-16 border-r-slate-600 border-y-12 border-y-transparent after:content-[''] after:absolute after:-top-3 after:left-1 after:w-0 after:h-0 after:border-r-16 after:border-r-slate-100 after:border-y-12 after:border-y-transparent"></div>
            </div>
          </div>
        </div>

        <ScoreBar
          believability={verdict?.believability ?? 0}
          creativity={verdict?.creativity ?? 0}
          confidence={verdict?.confidence ?? 0}
        />

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex w-full max-w-xl items-center justify-center rounded-2xl bg-linear-to-r from-violet-500 via-indigo-500 to-blue-500 px-8 py-4 text-xl font-black text-white shadow-[0_16px_40px_rgba(63, 81, 181,0.32)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Try Another Excuse
          </button>
        </div>
      </div>
  );
}
