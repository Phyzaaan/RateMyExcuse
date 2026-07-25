import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function JudgeSelector() {
  const judges = [
    {
      id: 1,
      name: "Teacher",
      punchline: "Strict but Fair",
      icon: "/Teacher.png",
      color: "bg-linear-to-br from-emerald-100/50 to-emerald-200/50",
      border: "border-emerald-200",
      text: "text-emerald-600",
      iconBg: "bg-emerald-100",
      accent: "text-emerald-500",
      tag: "🍏",
    },
    {
      id: 2,
      name: "Police",
      punchline: "Always Suspicious",
      icon: "/Police.png",
      color: "bg-linear-to-br from-blue-100/50 to-blue-200/50",
      border: "border-blue-200",
      text: "text-blue-600",
      iconBg: "bg-blue-100",
      accent: "text-blue-500",
      tag: "🛡️",
    },
    {
      id: 3,
      name: "Partner",
      punchline: "Emotionally Dangerous",
      icon: "/Crush.png",
      color: "bg-linear-to-br from-pink-100/50 to-pink-200/50",
      border: "border-pink-200",
      text: "text-pink-600",
      iconBg: "bg-pink-100",
      accent: "text-pink-500",
      tag: "❤️",
    },
    {
      id: 4,
      name: "Parent",
      punchline: "Not Angry... Just Disappointed",
      icon: "/Boss.png",
      color: "bg-linear-to-br from-orange-100/50 to-orange-200/50",
      border: "border-orange-200",
      text: "text-orange-600",
      iconBg: "bg-orange-100",
      accent: "text-orange-500",
      tag: "🫂",
    },
    {
      id: 5,
      name: "Calculator",
      punchline: "Only Numbers Matter",
      icon: "/Teacher.png",
      color: "bg-linear-to-br from-purple-100/50 to-purple-200/50",
      border: "border-purple-200",
      text: "text-purple-600",
      iconBg: "bg-purple-100",
      accent: "text-purple-500",
      tag: "🧮",
    },
    {
      id: 6,
      name: "AI Overlord",
      punchline: "Human Lies Detected",
      icon: "/Boss.png",
      color: "bg-linear-to-br from-indigo-100/50 to-indigo-200/50",
      border: "border-indigo-200",
      text: "text-indigo-600",
      iconBg: "bg-indigo-100",
      accent: "text-indigo-500",
      tag: "🤖",
    },
  ];

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
          {judges.map((judge) => (
            <Link
              href="/chat"
              key={judge.id}
              className={`flex flex-col ${judge.color} rounded-lg overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg group p-1`}
            >
              {/* Inner wrapper for border styling to match image */}
              <div className="w-full h-full border-3 border-white flex flex-col relative rounded-lg">
                {/* Icon Top Left */}
                <div className="absolute top-2 left-2 z-10">
                  <span
                    className={`w-7 h-7 ${judge.iconBg} rounded-full flex items-center justify-center text-sm shadow-sm`}
                  >
                    {judge.tag}
                  </span>
                </div>

                {/* Image Container */}
                <div className="w-full h-55 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                  <Image
                    src={judge.icon}
                    alt={judge.name}
                    fill
                    sizes="660"
                    className="object-contain drop-shadow-md"
                  />
                </div>

                {/* Judge Info */}
                <div className="absolute bottom-0 inset-x-0 bg-white/80 backdrop-blur-md rounded-xl px-2 py-1 text-center border border-white z-10 shadow-sm">
                  <h3
                    className={`font-black text-lg leading-tight ${judge.accent}`}
                  >
                    {judge.name}
                  </h3>
                  <p className="text-[10px] text-slate-500 font-bold mt-0.5 leading-tight px-1">
                    {judge.punchline}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
