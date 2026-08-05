import React from "react";

const AMBIENT_BLOBS = [
  // Left: Deep offset, large pink glow
  {
    position: "left-14 top-[6%]",
    color: "bg-indigo-400/70",
    size: "h-24 w-24",
    blur: "blur-3xl",
  },
  // Right: Tight offset, crisp sky dot
  {
    position: "right-4 top-[28%]",
    color: "bg-sky-400/60",
    size: "h-28 w-20",
    blur: "blur-2xl",
  },
  // Left: Wide offset, small amber accent
  {
    position: "left-12 top-[58%]",
    color: "bg-pink-300/80",
    size: "h-20 w-20",
    blur: "blur-2xl",
  },
  // Right: Mid offset, medium emerald blur
  {
    position: "right-8 top-[84%]",
    color: "bg-emerald-400/75",
    size: "h-26 w-26",
    blur: "blur-2xl",
  },
];

interface GlowBackgroundProps {
  className?: string;
}

export function GlowBackground({ className = "" }: GlowBackgroundProps) {
  return (
    <section className={`${className}`}>
      {/* Top Spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.14),transparent_40%)] pointer-events-none" />

      {/* 6 Alternating Blobs */}
      {AMBIENT_BLOBS.map((blob, idx) => (
        <div
          key={idx}
          className={`absolute ${blob.position} ${blob.size} ${blob.color} ${blob.blur} rounded-full pointer-events-none`}
        />
      ))}
    </section>
  );
}
