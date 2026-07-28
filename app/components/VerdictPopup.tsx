import { RefreshCcw, Home, Users } from "lucide-react";
import Message from "./Message";
import Link from "next/link";
import { Verdict } from "../data/type";

interface VerdictPopupProps {
  onClose: () => void;
  verdict: Verdict;
  judgeImg: string;
  judgeBg: string;
}

export default function VerdictPopup({
  onClose,
  verdict,
  judgeImg,
  judgeBg,
}: VerdictPopupProps) {
  const criteria = [
    {
      name: "Believability",
      score: verdict.believability,
      max: 10,
      color: "bg-orange-400",
    },
    {
      name: "Confidence",
      score: verdict.confidence,
      max: 10,
      color: "bg-yellow-400",
    },
    {
      name: "Creativity",
      score: verdict.creativity,
      max: 10,
      color: "bg-red-400",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/30 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-4xl p-6 flex flex-col items-center gap-8 shadow-2xl border-4 border-white/80 animate-in zoom-in-95 duration-300">
        <div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
            Your Excuse Scored
          </p>

          {/* Score Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="text-6xl font-black text-slate-800 flex items-baseline">
              <span>{verdict.score}</span>
              <span className="text-4xl text-slate-300 mx-1">/</span>
              <span className="text-4xl text-slate-400">100</span>
            </div>
            <span className="text-5xl drop-shadow-md hover:rotate-2 transition-transform">
              {verdict.emoji}
            </span>
          </div>
        </div>

        {/* Sliders */}
        <div className="w-full space-y-4 mb-6">
          {criteria.map((item, index) => (
            <div key={index} className="w-full flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-[11px] font-black text-slate-500 uppercase">
                <span>{item.name}</span>
                <span>
                  {item.score}/{item.max}
                </span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                <div
                  className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${(item.score / item.max) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Judge Quote using your Message component */}
        <div className="w-full mb-8">
          <Message imgUrl={judgeImg} bg={judgeBg} align="left">
            <span className="text-slate-600 text-[13px] font-bold">
              &quot;{verdict.reaction}&quot;
            </span>
          </Message>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-8">
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 bg-blue-400 text-white py-4 rounded-2xl font-black text-lg shadow-[0_6px_0_0_#60a5fa,0_10px_20px_rgba(96,165,250,0.4)] hover:translate-y-1 hover:shadow-[0_3px_0_0_#60a5fa,0_6px_15px_rgba(96,165,250,0.4)] active:translate-y-2 active:shadow-none transition-all"
          >
            <RefreshCcw className="w-5 h-5" strokeWidth={3} />
            <span>Play Again</span>
          </button>

          <div className="flex gap-3 w-full">
            <Link
              href={"/"}
              className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-500 py-3 rounded-xl font-bold hover:bg-slate-200 hover:text-slate-700 active:scale-95 transition-all"
            >
              <Home className="w-4 h-4" strokeWidth={2.5} />
              <span className="text-sm">Home</span>
            </Link>
            <Link
              href={"/judges"}
              className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-500 py-3 rounded-xl font-bold hover:bg-slate-200 hover:text-slate-700 active:scale-95 transition-all"
            >
              <Users className="w-4 h-4" strokeWidth={2.5} />
              <span className="text-sm">Judges</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
