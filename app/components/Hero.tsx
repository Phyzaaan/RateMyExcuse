import Image from "next/image";

interface props {
  username: string;
  avatar: string;
}

export default function HeroSection({username, avatar}: props) {
  return (
    <section className="relative max-w-5xl w-full shrink-0 mx-auto overflow-hidden rounded-3xl p-4 sm:p-6">
      <div className="relative z-10 flex flex-col">
        <div className="flex items-center justify-start gap-2">
          <div className="flex items-center gap-1 p-1 pr-2 rounded-3xl shadow-sm backdrop-blur-2xl bg-primary-bg/45 ring-1 ring-primary-color/30 hover:bg-slate-50 transition">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow-sm">
              <Image
                src={avatar}
                alt="User Avatar"
                width={100}
                height={100}
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-lg font-bold text-secondary">{username}</p>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-between">
          <div className="relative w-full flex flex-col items-center justify-between font-baloo2 ">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-primary translate-y-3">
              Rate My
            </h2>
            <h1 className="text-8xl md:text-9xl font-black tracking-tight text-primary-color -translate-y-3 hover:rotate-1 transition-transform duration-300">
              Excuse
            </h1>
          </div>
          <p className="max-w-2xl text-lg font-medium text-center text-tertiary sm:text-xl">
            Convince them. Survive the roast. Write the wildest defense and see
            if the AI judge lets it slide.
          </p>
        </div>
      </div>
    </section>
  );
}
