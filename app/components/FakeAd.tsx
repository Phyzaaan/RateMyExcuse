"use client";

interface FakeAdProps {
  onComplete: () => void;
}

export default function FakeAd({ onComplete }: FakeAdProps) {
  return (
    <div className="rounded-3xl border bg-white p-6 text-center shadow-lg">
      <p className="text-sm text-gray-400">ADVERTISEMENT</p>

      <div className="my-8 text-5xl">🤑</div>

      <h2 className="text-2xl font-black">Totally Real Advertisement™</h2>

      <p className="mt-2 text-gray-500">
        Please enjoy this extremely legitimate ad.
      </p>

      <button
        onClick={onComplete}
        className="mt-6 rounded-xl bg-primary-color px-6 py-3 font-bold text-white"
      >
        Continue
      </button>
    </div>
  );
}
