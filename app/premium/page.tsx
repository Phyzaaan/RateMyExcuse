"use client";
import React, { useState } from "react";
// import { getPaddle } from "../utils/libs/paddle";

type BillingPeriod = "monthly" | "yearly";

const PLAN_IDS: Record<BillingPeriod, string> = {
  monthly: "pri_01m1vhw52d21xsqaz0ccn2awb4",
  yearly: "pri_01m1vhx77a4btw76n10m53wvw4",
};

function UpgradeButton({
  billingPeriod,
  children,
}: {
  billingPeriod: BillingPeriod;
  children?: React.ReactNode;
}) {
  const handle = async (e: React.MouseEvent) => {
    e.preventDefault();
    // const paddle = await getPaddle();

    // paddle?.Checkout.open({
    // //   items: [{ priceId: PLAN_IDS[billingPeriod], quantity: 1 }],
    // //   customData: {
    // //     // TODO: pass your logged-in user's id here so the webhook can identify them
    //     userId: "get-this-from-your-auth",
    //   },
    // });
  };

  return (
    <button onClick={handle} className="...">
      {children ?? "Upgrade to Premium"}
    </button>
  );
}

export default function PremiumPage() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");

  const premiumFeatures = [
    "Unlimited submissions",
    "Special verdict reactions",
    "No ads, ever",
  ];

  const freeFeatures = [
    "5 submissions a day",
    "Standard verdict reactions",
    "Ads between rounds",
  ];

  const price = billingPeriod === "monthly" ? "1.99" : "14.99";
  const period = billingPeriod === "monthly" ? "month" : "year";
  const monthlyEquivalent = billingPeriod === "yearly" ? "1.25" : null;

  return (
    <main className="min-h-screen py-16">
      <div className="mx-auto max-w-4xl space-y-12 px-6">
        <header className="space-y-3 text-center">
          <h1 className="font-baloo2 text-4xl font-bold text-primary">
            Everyone deserves a good defense
          </h1>
          <p className="mx-auto max-w-md text-tertiary">
            The free tier gets you a public defender. Premium gets you a lawyer
            who actually returns your calls.
          </p>
        </header>

        {/* Billing toggle */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-full border border-card-border bg-card-bg p-1">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                billingPeriod === "monthly"
                  ? "bg-primary-color text-white"
                  : "text-tertiary"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                billingPeriod === "yearly"
                  ? "bg-primary-color text-white"
                  : "text-tertiary"
              }`}
            >
              Yearly
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                  billingPeriod === "yearly"
                    ? "bg-white/20 text-white"
                    : "bg-primary-color/10 text-primary-color"
                }`}
              >
                Save 37%
              </span>
            </button>
          </div>
        </div>

        <section className="grid gap-6 sm:grid-cols-2">
          {/* Free */}
          <article className="flex flex-col gap-6 rounded-2xl border border-card-border bg-card-bg p-8">
            <div className="space-y-1">
              <p className="text-sm font-medium text-tertiary">
                Public Defender
              </p>
              <p className="font-baloo2 text-3xl font-bold text-primary">
                Free
              </p>
            </div>

            <ul className="grow space-y-3">
              {freeFeatures.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 text-sm text-secondary"
                >
                  <span className="text-tertiary">–</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <button
              disabled
              className="w-full rounded-xl border border-card-border px-6 py-3.5 text-sm font-medium text-tertiary"
            >
              Your current plan
            </button>
          </article>

          {/* Premium */}
          <article className="relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-primary-color/30 bg-card-bg p-8 shadow-glow">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                background:
                  "linear-gradient(135deg, var(--primary-color), var(--accent-color))",
              }}
            />

            <div className="relative space-y-1">
              <p className="text-sm font-medium text-primary-color">
                Retained Counsel
              </p>
              <p className="font-baloo2 text-3xl font-bold text-primary">
                ${price}
                <span className="text-base font-normal text-tertiary">
                  {" "}
                  / {period}
                </span>
              </p>
              {monthlyEquivalent && (
                <p className="text-xs text-tertiary">
                  Works out to ${monthlyEquivalent}/month
                </p>
              )}
            </div>

            <ul className="relative grow space-y-3">
              {premiumFeatures.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 text-sm text-primary"
                >
                  <span className="text-primary-color">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="relative">
              <UpgradeButton billingPeriod={billingPeriod}>
                Hire your lawyer
              </UpgradeButton>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
