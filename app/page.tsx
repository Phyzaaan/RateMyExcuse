import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center py-8 w-full max-w-3xl h-full">
      {/* Title */}
      <div className="relative">
        <h1 className="text-5xl md:text-8xl leading-[1.1] font-black text-center text-transparent bg-clip-text bg-linear-to-b from-primary-from to-accent-from text-stroke drop-shadow-md rotate-1 hover:rotate-0 transition duration-300">
          Rate My
          <br />
          Excuse
        </h1>

        <div className="absolute top-2 -left-4 w-3 h-3 bg-blue-400 rounded-full"></div>
        <div className="absolute top-8 -right-6 w-4 h-4 bg-yellow-400 rounded-full clip-star"></div>
        <div className="absolute top-22 -left-1 w-3.5 h-3.5 bg-red-400 rounded-full clip-star"></div>
      </div>

      <p className="text-secondary font-bold text-center text-sm bg-card-bg hover:bg-card-bg-hover px-4 py-1.5 rounded-full border border-white shadow-md">
        Get Brutally Judged by AI
      </p>

      {/* Hero Image */}
      <div className="relative w-full min-h-160 flex flex-col items-center justify-between py-4">
        <Image
          src="/HeroPrev.png"
          alt="Chat Preview"
          width={750}
          height={260}
          className="object-contain"
          priority
        />
        <Image
          src="/HeroBanner.png"
          alt="Anime characters judging"
          width={750}
          height={260}
          className="absolute bottom-0 object-contain"
        />
        {/* PLAY NOW Button */}
        <div className="absolute bottom-0 w-full px-2">
          <Link
            href="/judges"
            className="group flex w-full justify-center overflow-hidden rounded-full p-1 bg-blue-500 border-5 border-white hover:border-emerald-300 active:scale-90 transition-all"
          >
            <div className="flex w-full items-center justify-center rounded-full py-2.5 md:py-4">
              <span className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-md flex items-center gap-2 group-hover:scale-105 transition">
                PLAY NOW
              </span>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
