"use client";

interface AdBreakConfig {
  type: "reward" | "preroll" | "start" | "next" | "browse";
  name: string;
  beforeReward?: (showAdFn: () => void) => void;
  adDismissed?: () => void;
  adViewed?: () => void;
  adBreakDone?: (placementInfo: { breakStatus: string }) => void;
}

declare global {
  interface Window {
    adBreak?: (config: AdBreakConfig) => void;
    adsbygoogle?: unknown[];
  }
}

import { useEffect, useState } from "react";
import HeroSection from "./components/Hero";
import SituationPanel from "./components/SituationPanel";
import ActionPanel from "./components/ActionPanel";
import CommunityFeed from "./components/CommunityFeed";
import FooterNote from "./components/FooterNote";
import AdPopup from "./components/AdPopup";
import type { Verdict, Toast } from "./data/type";
import ToastMessage from "./components/ToastMessage";

import {
  setStoredUserData,
  getStoredUserData,
} from "./utils/libs/localStorage";

export default function Home() {
  const [excuse, setExcuse] = useState("");
  const [submittedExcuse, setSubmittedExcuse] = useState("");
  const [scenario, setScenario] = useState(
    "Creating a cool scenario for you...",
  );
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [loading, setLoading] = useState(false);
  const [startError, setStartError] = useState<string | null>(null);

  const [gameCount, setGameCount] = useState(5);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("Unknown");
  const [avatar, setAvatar] = useState("/img/user.jpg");
  const [logedIn, setLogedIn] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [showAdPopup, setShowAdPopup] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    getStoredUserData(setGameCount, setUsername, setAvatar, setIsPremium);
  }, []);

  useEffect(() => {
    setStoredUserData(gameCount, username, avatar, isPremium);
  }, [gameCount, username, avatar, isPremium]);

  useEffect(() => {
    if (submittedExcuse || verdict) return;
    let valid = true;

    (async function startGame() {
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

      if (!valid) return;

      if (data.scenario) setScenario(data.scenario);
    })();
    return () => {
      valid = false;
    };
  }, [submittedExcuse, verdict]);

  useEffect(() => {
    let valid = true;
    (async function getUserData() {
      const res = await fetch("/api/getUserData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.error);
        // setStartError(data.error);
      }

      if (!valid) return;
      console.log("Remaning Games:", data.games_remaining);

      if (typeof data.games_remaining === "number")
        setGameCount(data.games_remaining);
      if (data.username) setUsername(data.username);
      if (data.avatar) setAvatar(data.avatar);
      if (data.logedIn) setLogedIn(data.logedIn);
      if (data.is_premium) setIsPremium(data.is_premium);
      if (data.user_id) setUserId(data.user_id);
    })();

    return () => {
      valid = false;
    };
  }, [gameCount]);

  function handleReset() {
    if (gameCount < 1 && !isPremium) {
      setShowAdPopup(true);
      return;
    }
    
    setExcuse("");
    setScenario("Creating a cool scenario for you...");
    setSubmittedExcuse("");
    setVerdict(null);
    setLoading(false);
  }

  async function handleSubmit() {
    const text = excuse.trim();
    if (!text || startError) return;

    if (gameCount < 1 && !isPremium) {
      setShowAdPopup(true);
      return;
    }

    setLoading(true);

    if (!scenario) {
      setToast({
        message: "Unable to submit excuse. Please try again.",
        success: false,
      });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/chat/verdict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ scenario, excuse: text }),
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
      setToast({
        message: "Unable to get a verdict. Please try again.",
        success: false,
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleShare() {
    if (!submittedExcuse || !scenario || !verdict) {
      setToast({ message: "No excuse to share yet.", success: false });
      return;
    }

    const totalScore = verdict.score;
    setIsSharing(true);

    try {
      const res = await fetch("/api/community/public", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          excuse: submittedExcuse,
          scenario,
          totalScore,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to share your excuse.");
      }

      setToast({ message: "Excuse shared successfully!", success: true });
      setIsPublished(true);
    } catch (error) {
      console.error(error);
      setToast({
        message:
          error instanceof Error ? error.message : "Unable to share excuse.",
        success: false,
      });
    } finally {
      setIsSharing(false);
    }
  }

  function handleWatchAd() {
    setShowAdPopup(false);

    if (typeof window === "undefined" || !window.adBreak) {
      console.warn("Ad Placement API not loaded yet");
      return;
    }

    window.adBreak({
      type: "reward",
      name: "extra-game",
      beforeReward: (showAdFn: () => void) => {
        // Optional: show a quick "get ready" UI here if you want
        showAdFn(); // actually triggers the ad
      },
      adDismissed: () => {
        // user skipped/closed early — do nothing, no reward
        setToast({ message: "Ad dismissed, no reward given.", success: false });
      },
      adViewed: () => {
        // user watched fully — NOW call your existing reward function
        handleAdReward();
        setToast({ message: "Ad completed, reward given.", success: true });
      },
      adBreakDone: (placementInfo: { breakStatus: string }) => {
        // fires always, useful for logging/analytics
        console.log("Ad break status:", placementInfo.breakStatus);
      },
    });
  }

  function handleCloseAdPopup() {
    setShowAdPopup(false);
  }

  async function handleAdReward() {
    const res = await fetch("/api/reward-ad", {
      method: "POST",
    });

    if (res.ok) {
      const data = await res.json();
      setGameCount(data.games_remaining);
    }
  }

  return (
    <main className="flex flex-col items-center max-w-5xl w-full min-h-screen text-primary gap-10">
      {gameCount === 0 && showAdPopup && (
        <AdPopup onClose={handleCloseAdPopup} onWatch={handleWatchAd} />
      )}

      <HeroSection
        user_id={userId}
        username={username}
        avatar={avatar}
        logedIn={logedIn}
      />

      <SituationPanel
        startError={startError}
        scenario={scenario}
        excuse={excuse}
        submittedExcuse={submittedExcuse}
        loading={loading}
        onChange={setExcuse}
        onSubmit={handleSubmit}
        verdict={verdict}
        onReset={handleReset}
        onShare={handleShare}
        isSharing={isSharing}
        isPublished={isPublished}
      />

      {!isPremium && <ActionPanel freeGames={gameCount} />}
      <CommunityFeed setToast={setToast} />
      <FooterNote />

      {toast && (
        <ToastMessage
          message={toast.message}
          success={toast.success}
          onClose={() => setToast(null)}
        />
      )}
    </main>
  );
}
