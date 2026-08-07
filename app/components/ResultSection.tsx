import ScoreBar from "./ScoreBar";
import type { Verdict } from "../data/type";
import Image from "next/image";
import { useState, useEffect } from "react";

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
  const [displayScore, setDisplayScore] = useState(0);
  const [step, setStep] = useState(0);
  const [typedReaction, setTypedReaction] = useState("");

  useEffect(() => {
    if (!verdict) return;

    let timer: ReturnType<typeof setTimeout> | null = null;
    let currentScore = 0;
    let currentDelay = 20;

    const tickScore = () => {
      timer = setTimeout(() => {
        const remaining = verdict.score - currentScore;
        const increment = Math.max(1, Math.ceil(remaining / 6));
        currentScore = Math.min(verdict.score, currentScore + increment);
        setDisplayScore(currentScore);

        if (currentScore < verdict.score) {
          currentDelay = Math.min(
            220,
            currentDelay + Math.max(10, Math.floor(remaining / 5)),
          );
          tickScore();
        }
      }, currentDelay);
    };

    timer = setTimeout(() => {
      setDisplayScore(0);
      tickScore();
    }, 0);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [verdict]);

  useEffect(() => {
    if (!verdict) return;

    const delays = [0, 50, 450, 900, 2000, 3000];
    const timers: ReturnType<typeof setTimeout>[] = [];

    delays.forEach((dealy, i) => {
      timers.push(setTimeout(() => setStep(i), dealy));
    });

    return () => timers.forEach(clearTimeout);
  }, [verdict]);

  useEffect(() => {
    if (!verdict) return;

    let timer: ReturnType<typeof setTimeout> | null = null;
    let charIndex = 0;
    const startTyping = () => {
      setTypedReaction("");
      typeNext();
    };
    const fullText = verdict.reaction;

    const typeNext = () => {
      charIndex += 1;
      setTypedReaction(fullText.slice(0, charIndex));

      if (charIndex < fullText.length) {
        const speed = 25 + Math.random() * 25;
        timer = setTimeout(typeNext, speed);
      }
    };

    timer = setTimeout(startTyping, 300);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [verdict]);

  if (!submittedExcuse) {
    return null;
  }


  return (
    <div className="flex flex-col gap-6 text-center game-pop">
      <div className="flex flex-col items-center gap-6 text-center">
        <div
          className={`inline-flex items-center gap-3 rounded-full text-8xl font-black text-primary score-bounce transition-opacity duration-500 ${
            step >= 1 ? "opacity-100 fade-in-up" : "opacity-0"
          }`}
        >
          <span className="text-primary-color">{displayScore}</span>
          <span className="text-7xl font-extralight -translate-x-5 translate-y-2">
            /
          </span>
          <span className="text-5xl -translate-x-10 translate-y-6">100</span>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`transition-opacity duration-500 ${
              step >= 2 ? "opacity-100 fade-in-up" : "opacity-0"
            }`}
          >
            <Image src="/img/Doofus.png" alt="Emoji" width={80} height={80} />
          </div>

          <div
            className={`relative max-w-md bg-slate-100 text-primary px-2 py-2 rounded-3xl border-4 border-slate-600 font-bold shadow-[2px_2px_0_0_#45556c] glow-pulse transition-all duration-500 ${
              step >= 2 ? "opacity-100 fade-in-up" : "opacity-0"
            }`}
          >
            <p className="text-lg font-baloo2 font-semibold min-h-12 text-left">
              {typedReaction} <span className="typing-cursor" />
            </p>
            <div className="absolute top-1/2 left-0 translate-x-[-99%] -translate-y-1/2 w-0 h-0 border-r-16 border-r-slate-600 border-y-12 border-y-transparent after:content-[''] after:absolute after:-top-3 after:left-1 after:w-0 after:h-0 after:border-r-16 after:border-r-slate-100 after:border-y-12 after:border-y-transparent"></div>
          </div>
        </div>
      </div>

      <div
        className={`transition-opacity duration-500 ${
          step >= 3 ? "opacity-100 fade-in-up" : "opacity-0"
        }`}
      >
        <ScoreBar
          step={step}
          believability={verdict?.believability ?? 0}
          creativity={verdict?.creativity ?? 0}
          confidence={verdict?.confidence ?? 0}
        />
      </div>

      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={onReset}
          className={`inline-flex w-full max-w-xl items-center justify-center rounded-2xl bg-linear-to-r from-violet-500 via-indigo-500 to-blue-500 px-8 py-4 text-xl font-black text-white shadow-[0_16px_40px_rgba(63, 81, 181,0.32)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 ${
            step >= 4
              ? "opacity-100 fade-in-up"
              : "opacity-0 pointer-events-none"
          }`}
        >
          Try Another Excuse
        </button>
      </div>
    </div>
  );
}
