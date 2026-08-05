"use client";

import { useState } from "react";
import HeroSection from "./components/Hero";
import SituationPanel from "./components/SituationPanel";
import ActionPanel from "./components/ActionPanel";
import CommunityFeed from "./components/CommunityFeed";
import FooterNote from "./components/FooterNote";
import type { Verdict } from "./data/type";
import { GlowBackground } from "./components/GlowBg";

const verdictMock: Verdict = {
  score: 75,
  believability: 7,
  confidence: 6,
  creativity: 8,
  emoji: "😏",
  reaction: "Wow. Somehow you made chaos sound like a strategy.",
};

export default function Home() {
  const [excuse, setExcuse] = useState("");
  const [submittedExcuse, setSubmittedExcuse] = useState("");
  const [scenario, setScenario] = useState(
    "Convince your boss that deleting the data base was a good idea.",
  );
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [loading, setLoading] = useState(false);
  const [gameCount, setGameCount] = useState(5);

  async function handleSubmit() {
    const text = excuse.trim();
    if (!text) return;
    setLoading(true);

    setVerdict(verdictMock);

    setGameCount((prevCount) => Math.max(prevCount - 1, 0));
    setSubmittedExcuse(text);
    setLoading(false);
  }

  function handleReset() {
    setExcuse("");
    setSubmittedExcuse("");
    setVerdict(null);
    setLoading(false);
  }

  return (
    <main className="flex flex-col items-center max-w-5xl w-full min-h-screen text-primary gap-10">
      <GlowBackground className="fixed max-w-5xl w-full inset-y-0 -z-10" />

      <HeroSection />

      <SituationPanel
        scenario={scenario}
        excuse={excuse}
        submittedExcuse={submittedExcuse}
        loading={loading}
        onChange={setExcuse}
        onSubmit={handleSubmit}
        verdict={verdict}
        onReset={handleReset}
      />

      <ActionPanel freeGames={gameCount} />
      <CommunityFeed />
      <FooterNote />
    </main>
  );
}
