import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center max-w-5xl w-full min-h-screen text-primary gap-10 pt-22">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-4xl md:text-6xl font-black text-primary text-center">
          Page not found
        </h1>

        <p className="text-md md:text-lg font-bold text-slate-600 text-center max-w-xl">
          Oops — the excuse you were looking for wandered off. Our goofy mascot
          is looking around for it.
        </p>

        <div className="absolute bottom-0 flex flex-col justify-center items-center overflow-hidden min-h-0">
          <Image
            src={`/img/goofy-not-found.png`}
            alt="Emoji"
            width={350}
            height={350}
          />
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/75 px-3 py-2 text-sm font-bold text-primary shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Game
        </Link>
      </div>
    </main>
  );
}
