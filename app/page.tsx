"use client";

import { useEffect, useState } from "react";
import HeroSection from "./components/Hero";
import SituationPanel from "./components/SituationPanel";
import ActionPanel from "./components/ActionPanel";
import CommunityFeed from "./components/CommunityFeed";
import FooterNote from "./components/FooterNote";
import AdPopup from "./components/AdPopup";
import FakeAd from "./components/FakeAd";
import type { Verdict } from "./data/type";
import { GlowBackground } from "./components/GlowBg";

import {
  setStoredUserData,
  getStoredUserData,
} from "./utils/libs/localStorage";

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
  const [startError, setStartError] = useState<string | null>(null);

  const [gameCount, setGameCount] = useState(5);
  const [username, setUsername] = useState("Unknown");
  const [avatar, setAvatar] = useState("/img/user.jpg");
  const [showFakeAd, setShowFakeAd] = useState(false);
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    getStoredUserData(setGameCount, setUsername, setAvatar);
  }, []);

  useEffect(() => {
    setStoredUserData(gameCount, username, avatar);
  }, [gameCount, username, avatar]);

  useEffect(() => {
    if (submittedExcuse || verdict) return;

    async function startGame() {
      if (gameCount < 1) {
        setStartError("You don't have any free games left.");
        setShowAd(true);
        return;
      }

      setStartLoading(true);

      const res = await fetch("/api/chat/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.error);
        setStartError(data.error);
      }

      if (data.scenario) setScenario(data.scenario);
      if (data.games_remaining) setGameCount(data.games_remaining);
      if (data.interactionId) setInteractionId(data.interactionId);
      if (data.username) setUsername(data.username);
      if (data.avatar) setAvatar(data.avatar);

      setStartLoading(false);
    }

    startGame();
  }, [submittedExcuse, verdict, gameCount]);

  function handleReset() {
    if (gameCount < 1) {
      setShowAd(true);
      return;
    }
    setExcuse("");
    setSubmittedExcuse("");
    setVerdict(null);
    setLoading(false);
  }

  function handleWatchAd() {
    setShowAd(false);
    setShowFakeAd(true);
  }

  function handleCloseAdPopup() {
    setShowAd(false);
  }

  async function handleAdReward() {
    const res = await fetch("/api/reward-ad", {
      method: "POST",
    });

    if (res.ok) {
      const data = await res.json();
      setGameCount(data.games_remaining);
    }

    setShowFakeAd(false);
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

      {gameCount === 0 && showAd && (
        <AdPopup onWatch={handleWatchAd} onClose={handleCloseAdPopup} />
      )}

      {showFakeAd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-40" />
          <div className="relative z-50 w-full max-w-md p-4">
            <FakeAd onComplete={handleAdReward} />
          </div>
        </div>
      )}

      <HeroSection username={username} avatar={avatar} />

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
