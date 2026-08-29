"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import { Post } from "../data/type";
import PostCard from "./CommunityPostCard";
import { fetchCommunityPosts } from "../utils/libs/supabase";
import Link from "next/link";
import PostCardSkeleton from "./Skeleton/CommunityPostCard";

interface props {
  setToast: (
    value: {
      message: string;
      success: boolean;
    } | null,
  ) => void;
}

export default function CommunityFeed({ setToast }: props) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function fetchPosts() {
      setLoading(true);
      const data = await fetchCommunityPosts(10);
      setPosts(data);
      setLoading(false);
    })();
  }, []);

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
    <section className="max-w-5xl  w-full mx-auto px-4">
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
          <Link
            href="/community"
            className="self-start sm:self-auto inline-flex items-center gap-1 px-1 py-2 text-xs sm:text-sm font-bold text-tertiary transition hover:-translate-y-0.5 hover:shadow-sm hover:text-primary rounded-xl"
          >
            View All
            <span>→</span>
          </Link>
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
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <PostCardSkeleton key={i} />
                ))
              : posts?.map((post) => (
                  <PostCard key={post.id} item={post} setToast={setToast} />
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
