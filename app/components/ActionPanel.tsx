import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ActionPanelProps {
  freeGames: number;
}

export default function ActionPanel({
  freeGames,
}: ActionPanelProps) {
  return (
    <section className="max-w-5xl mx-auto px-4">
      <div className="grid gap-4 md:grid-cols-2">
        {/* Free Games Card */}
        <div className="flex items-center group rounded-2xl border border-green-500/60 bg-primary-bg/60 backdrop-blur-xl p-4 shadow-md transition-transform duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-start gap-4">
            <div className="rounded-full bg-green-500/20 px-4 py-5 lg:py-6 text-5xl lg:text-6xl font-bold text-green-700 shadow-sm">
              🎮
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <p className="text-5xl sm:text-6xl lg:text-7xl font-black text-green-600">
                  {freeGames}
                </p>
                <p className="text-xl font-semibold opacity-90">
                  Free Games Left Today
                </p>
              </div>
              <div className="flex gap-4 lg:gap-6 px-3">
                {Array.from({ length: 5 }).map((_, index) => {
                  const isActive = index < freeGames;
                  return (
                    <div
                      key={index}
                      className={`
              h-4 w-4 rounded-full transition-colors duration-300
              ${isActive ? "bg-green-500" : "bg-green-300/50"}
            `}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Premium Card */}
        <Link
          href="/premium"
          className="group rounded-2xl border border-orange-400/60 bg-primary-bg/60 backdrop-blur-xl p-4 shadow-md transition-transform duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center justify-start gap-4">
            <div className="rounded-full bg-orange-500/20 px-4 py-5 lg:py-6 text-5xl lg:text-6xl font-bold text-orange-700 shadow-sm">
              👑
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-2xl lg:text-3xl font-black text-orange-400">
                Go Premium
              </p>
              <p className="text-sm sm:text-base lg:text-lg font-medium text-secondary">
                Unlimited games, premium badges & no ads!
              </p>
            </div>
            <div className="transition-all duration-300 group-hover:translate-x-1 rounded-full p-1 hover:shadow-md">
              <ChevronRight className="w-8 h-8 text-tertiary hover:text-primary" />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
