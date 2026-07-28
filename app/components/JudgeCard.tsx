import Image from "next/image";

interface Judge {
  name: string;
  role: string;
  tag: string;
  punchline: string;
  bg: string;
  border: string;
  text: string;
  color: string;
  image: string;
  systemPrompt: string;
}

export default function JudgeCard({ judge }: { judge: Judge }) {
  return (
    <div className={`w-full h-full border-3 ${judge.border} flex flex-col relative rounded-lg`}>
      {/* Icon Top Left */}
      <div className="absolute top-2 left-2 z-10">
        <span
          className={`w-7 h-7 ${judge.bg} rounded-full flex items-center justify-center text-sm shadow-sm`}
        >
          {judge.tag}
        </span>
      </div>

      {/* Image Container */}
      <div className="w-full h-55 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
        <Image
          src={judge.image}
          alt={judge.name}
          fill
          sizes="660"
          className="object-contain drop-shadow-md"
        />
      </div>

      {/* Judge Info */}
      <div className="absolute bottom-0 inset-x-0 bg-white/80 backdrop-blur-md rounded-xl px-2 py-1 text-center border border-white z-10 shadow-sm">
        <h3
          className={`font-black text-lg leading-tight ${judge.text}`}
        >
          {judge.name}
        </h3>
        <p className="text-[10px] text-slate-500 font-bold mt-0.5 leading-tight px-1">
          {judge.punchline}
        </p>
      </div>
    </div>
  );
}
