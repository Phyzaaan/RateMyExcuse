"use client";

import { useEffect, useState } from "react";
import HeroSection from "./components/Hero";
import SituationPanel from "./components/SituationPanel";
import ActionPanel from "./components/ActionPanel";
import CommunityFeed from "./components/CommunityFeed";
import FooterNote from "./components/FooterNote";
import type { Verdict } from "./data/type";
import { GlowBackground } from "./components/GlowBg";

export default function Home() {
  const [excuse, setExcuse] = useState("");
  const [submittedExcuse, setSubmittedExcuse] = useState("");
  const [scenario, setScenario] = useState(
    "Creating a cool mission for you...",
  );
  const [interactionId, setInteractionId] = useState("");
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [loading, setLoading] = useState(false);
  const [startLoading, setStartLoading] = useState(true);
  const [gameCount, setGameCount] = useState(5);
  const [startError, setStartError] = useState<string | null>(null);

  useEffect(() => {
    if (submittedExcuse || verdict) return;

    async function startGame() {
      setStartLoading(true);

      try {
        const res = await fetch("/api/chat/start", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to start game");
        }

        const data = await res.json();

        if (data.scenario) {
          setScenario(data.scenario);
        }

        if (data.interactionId) {
          setInteractionId(data.interactionId);
        }
      } catch (error) {
        console.error(error);
        setStartError("Unable to start the game. Please refresh.");
      } finally {
        setStartLoading(false);
      }
    }

    startGame();
  }, [submittedExcuse, verdict]);

  function handleReset() {
    setExcuse("");
    setSubmittedExcuse("");
    setVerdict(null);
    setLoading(false);
  }

  async function handleSubmit() {
    const text = excuse.trim();
    if (!text) return;

    setLoading(true);
    setStartError(null);

    if (!interactionId) {
      setStartError("Unable to submit excuse. Please try again.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/chat/verdict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ interactionId, excuse: text }),
      });

      const verdictData = await res.json();

      if (!res.ok || verdictData.error) {
        throw new Error(verdictData.error || "Failed to fetch verdict.");
      }

      setVerdict(verdictData);
      setSubmittedExcuse(text);
      setGameCount((prevCount) => Math.max(prevCount - 1, 0));
    } catch (error) {
      console.error(error);
      setStartError("Unable to get a verdict. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col items-center max-w-5xl w-full min-h-screen text-primary gap-10">
      <GlowBackground className="fixed max-w-5xl w-full inset-y-0 -z-10" />

      <HeroSection />

      <SituationPanel
        startError={startError}
        startLoading={startLoading}
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
