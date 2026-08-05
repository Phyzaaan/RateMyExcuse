"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";

const feed = [
  {
    name: "PenguinLover42",
    scenario:
      "Convince your teacher why you showed up to history class in a dinosaur costume.",
    excuse:
      "You told us to prepare for the 'Jurassic' period lesson, So... I came dressed as a dinosaur to fully immerse myself in the experience.",
    score: 86,
    hearts: "1.2K",
    avatar: "/img/user.jpg",
    color: "from-fuchsia-500 to-pink-500",
  },
  {
    name: "HomeworkHater",
    scenario: "Explain why you didn't do your homework.",
    excuse:
      "I was simply doing what you told me to do: I was following the instructions to 'be creative' and 'think outside the box.' So, I thought, why not think outside the homework box and not do it at all?",
    score: 74,
    hearts: "892",
    avatar: "/img/teacher.png",
    color: "from-sky-500 to-cyan-500",
  },
  {
    name: "ByteMe",
    scenario: "I accidentally erased the school database.",
    excuse: "I thought 'delete' meant 'download'.",
    score: 61,
    hearts: "643",
    avatar: "/img/boss.png",
    color: "from-amber-500 to-orange-500",
  },
  {
    name: "DarkRoast",
    scenario: "I summoned a demon instead of Alexa.",
    excuse: "The instructions were unclear!",
    score: 91,
    hearts: "2.1K",
    avatar: "/img/user.jpg",
    color: "from-emerald-500 to-teal-500",
  },
  {
    name: "SnoozeKing",
    scenario: "I slept through my final exam.",
    excuse: "My alarm clock took a vacation.",
    score: 79,
    hearts: "1.1K",
    avatar: "/img/teacher.png",
    color: "from-purple-500 to-violet-500",
  },
];

export default function CommunityFeed() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll positions to show/hide arrows dynamically
  const checkScrollState = useCallback(() => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 15);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 5);
    }
  }, []);

  useEffect(() => {
    checkScrollState();
    window.addEventListener("resize", checkScrollState);
    return () => window.removeEventListener("resize", checkScrollState);
  }, [checkScrollState]);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="max-w-5xl  w-full mx-auto px-2 sm:px-4">
      <div className="rounded-2xl glass-panel p-3 sm:p-5 shadow-md overflow-hidden">
        {/* Header Section */}
        <div className="flex flex-row items-center justify-between gap-3 mb-1 sm:mb-0">
          <div className="flex flex-row items-center gap-2 sm:gap-3">
            <div className="shrink-0">
              <Users
                fill="#372aac"
                className="w-9 h-9 sm:w-11 sm:h-11 text-indigo-800"
              />
            </div>
            <div>
              <p className="text-xl sm:text-2xl md:text-3xl font-baloo2 font-black text-indigo-900 leading-tight">
                Community Excuses
              </p>
              <p className="text-xs sm:text-sm font-semibold text-secondary">
                Real people, real excuses, real scores.
              </p>
            </div>
          </div>
          <button className="self-start sm:self-auto inline-flex items-center gap-1 px-1 py-2 text-xs sm:text-sm font-bold text-tertiary transition hover:-translate-y-0.5 hover:shadow-sm hover:text-primary rounded-xl">
            View All
            <span>→</span>
          </button>
        </div>

        {/* Carousel Container */}
        <div className="relative group mt-3">
          {/* Left / Previous Slide Button */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              aria-label="Previous slide"
              className="hidden sm:inline-block absolute left-1 top-1/2 -translate-y-1/2 z-20 p-1 rounded-full border border-slate-200 bg-primary-bg/95 text-secondary shadow-lg backdrop-blur-sm hover:bg-primary-bg hover:scale-105 active:scale-95 transition-all"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
          )}

          {/* Carousel Track */}
          <div
            ref={carouselRef}
            onScroll={checkScrollState}
            className="flex carousel-mask gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory py-3 px-1 sm:px-2 scroll-smooth"
          >
            {feed.map((item, index) => (
              <div
                key={index}
                className="relative flex w-64 shrink-0 snap-start flex-col justify-between rounded-2xl border border-slate-200/70 bg-primary-bg/70 backdrop-blur-md p-4 sm:p-5 pt-6 hover:shadow-sm hover:-translate-y-0.5 transition-all"
              >
                {/* Content Top */}
                <div className="w-full h-full flex flex-col gap-2">
                  {/* Scenario Tag */}
                  <div>
                    <span className="text-xs font-extrabold text-primary">
                      🎯 Mission
                    </span>
                    <h4 className="text-sm sm:text-base min-h-14 font-bold text-primary leading-snug line-clamp-3">
                      {item.scenario}
                    </h4>
                  </div>

                  {/* Excuse Tag */}
                  <div>
                    <span className="text-xs font-semibold text-primary">
                      💬 Excuse
                    </span>
                    <p className="text-xs sm:text-sm font-medium text-secondary leading-relaxed line-clamp-4">
                      &quot;{item.excuse}&quot;
                    </p>
                  </div>
                </div>

                <div className="pb-2">
                  <div className="border border-slate-300" />
                </div>

                {/* Content Bottom Row */}
                <div className="mt-6 sm:mt-8 flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0 pr-10">
                    <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full border border-slate-200">
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs font-bold text-primary truncate">
                      {item.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-primary shrink-0">
                    <span className="text-pink-500">❤️</span>
                    <span>{item.hearts}</span>
                  </div>
                </div>

                {/* Floating Score Box */}
                <div className="absolute -right-2 -top-2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary-bg shadow-md shadow-slate-200/50 border border-slate-100 text-lg sm:text-xl font-black text-emerald-500">
                  {item.score}
                </div>
              </div>
            ))}
          </div>

          {/* Right / Next Slide Button */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              aria-label="Next slide"
              className="hidden sm:inline-block absolute right-0 top-1/2 -translate-y-1/2 z-20 p-1 rounded-full border border-slate-200 bg-primary-bg/95 text-secondary shadow-lg backdrop-blur-sm hover:bg-primary-bg hover:scale-105 active:scale-95 transition-all"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
