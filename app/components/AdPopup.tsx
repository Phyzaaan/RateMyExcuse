"use client";

interface AdPopupProps {
  onWatch: () => void;
  onClose: () => void;
}

export default function AdPopup({ onWatch, onClose }: AdPopupProps) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" />

      <div className="relative z-50 w-full max-w-lg rounded-3xl bg-white p-6 text-center shadow-2xl">
        <div className="text-6xl">🤡</div>

        <h2 className="pt-4 text-3xl font-extrabold">No More Free Games!</h2>

        <p className="pt-3 text-gray-600">
          Your free plays have all been used up — our goofy mascot is very
          disappointed.
        </p>

        <div className="pt-6 flex flex-col gap-3 px-6">
          <button
            onClick={onWatch}
            className="rounded-xl bg-primary-color px-6 py-3 font-bold text-white"
          >
            Watch an ad (totally-not-suspicious)
          </button>

          <button
            onClick={onClose}
            className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-gray-600"
          >
            No thanks
          </button>
        </div>
      </div>
    </div>
  );
}
