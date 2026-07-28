import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import judges from "../data/judges";
import JudgeCard from "../components/JudgeCard";

export default function JudgeSelector() {
  return (
    <main className="flex flex-col w-full max-w-3xl h-full">
      {/* Header */}
      <div className="pt-2 px-2 flex flex-col items-center">
        <div className="w-full px-2 py-1">
          <Link
            href="/"
            className="w-10 h-10 bg-card-bg hover:bg-card-bg-hover rounded-full shadow-sm flex items-center justify-center text-primary-from transition-colors"
          >
            <ChevronLeft className="w-6 h-6" strokeWidth={3} />
          </Link>
        </div>

        <h1 className="text-4xl font-black text-primary-from drop-shadow-sm tracking-tight mb-1">
          Choose Your Judge
        </h1>
        <p className="text-secondary font-bold text-sm flex items-center gap-2">
          Pick a Judge to Get Started
        </p>
      </div>

      {/* Grid */}
      <div className="w-full px-5 pt-6 pb-8 z-0">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-5 max-w-3xl ">
          {Object.entries(judges).map(([key, judge]) => (
            <Link
              key={key}
              href={`/chat/${key}`}
              className={`flex flex-col ${judge.bg} rounded-lg overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg group p-1`}
            >
              <JudgeCard judge={judge} />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
