"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase/client";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const submitEmail = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
      setMessage("Check your inbox — a sign-in link was sent.");
    } catch (error) {
      console.error("OTP sign-in error:", error);
      setMessage("Unable to send the sign-in link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: "github" | "google") => {
    setLoading(true);
    setMessage(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error("OAuth sign-in error:", error);
      setMessage("Unable to continue with OAuth. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-start md:items-center justify-center gap-4 md:p-8 p-4 ">
      <div className="absolute top-4 left-4 md:top-6 md:left-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-2xl border border-card-border bg-primary-bg/80 px-4 py-2 text-sm font-medium text-primary shadow-sm transition hover:bg-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to game
        </Link>
      </div>

      <div className="w-full grid md:grid-cols-2 gap-8 justify-items-center">
        <div className="w-full h-full p-4">
          <div className="relative w-full flex flex-col items-center md:items-start justify-between font-baloo2 ">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-primary translate-y-3">
              Rate My
            </h2>
            <h1 className="text-8xl md:text-9xl font-black tracking-tight text-primary-color -translate-y-3 hover:rotate-1 transition-transform duration-300">
              Excuse
            </h1>
          </div>
          <p className="mt-4 text-tertiary text-xl">
            Convince them. Survive the roast. Create an account to save your
            best excuses and join the community.
          </p>
        </div>

        <div className="w-full md:w-md rounded-2xl p-6 glass-panel shadow-lg z-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">
                {mode === "login" ? "Sign in" : "Sign up"}
              </h3>
              <button
                onClick={() => setMode(mode === "login" ? "signup" : "login")}
                className="text-sm text-primary hover:underline"
              >
                {mode === "login" ? "Create an account" : "Have an account?"}
              </button>
            </div>

            <form onSubmit={submitEmail} className="flex flex-col gap-3">
              <label className="text-sm text-tertiary">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full rounded-xl border p-3 bg-primary-bg/60"
              />

              <button
                type="submit"
                disabled={loading}
                className="mt-2 rounded-xl bg-primary-color text-white px-4 py-3 font-semibold hover:opacity-95 disabled:opacity-60"
              >
                {loading
                  ? "Sending…"
                  : mode === "login"
                    ? "Send sign-in link"
                    : "Send sign-up link"}
              </button>
            </form>

            <div className="flex items-center gap-3 mt-4">
              <div className="h-px bg-card-border flex-1" />
              <div className="text-sm text-tertiary">or continue with</div>
              <div className="h-px bg-card-border flex-1" />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleOAuth("github")}
                className="flex-1 rounded-xl border p-3 flex items-center justify-center gap-2 hover:shadow-sm hover:bg-card-bg-hover"
              >
                <Image
                  src="/logos/github.svg"
                  alt="GitHub Logo"
                  width={26}
                  height={26}
                />
                <span className="font-medium">GitHub</span>
              </button>

              <button
                onClick={() => handleOAuth("google")}
                className="flex-1 rounded-xl border p-3 flex items-center justify-center gap-2 hover:shadow-sm hover:bg-card-bg-hover"
              >
                <Image
                  src="/logos/google.svg"
                  alt="Google Logo"
                  width={26}
                  height={26}
                />
                <span className="font-medium">Google</span>
              </button>
            </div>

            {message && (
              <p className="text-sm text-secondary mt-2">{message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
