"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface ToastMessageProps {
  message: string;
  success: boolean;
  onClose: () => void;
}

export default function ToastMessage({
  message,
  success,
  onClose,
}: ToastMessageProps) {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      <div
        className={`relative w-full max-w-md rounded-2xl border px-4 py-3 shadow-lg ring-1 backdrop-blur-sm ${
          success
            ? "border-emerald-200 bg-emerald-50 text-emerald-900 ring-emerald-100"
            : "border-red-200 bg-red-50 text-red-900 ring-red-100"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close notification"
          className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold transition hover:bg-black/5"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center justify-start gap-3 pr-8">
          <span
            className={`h-4 w-4 rounded-full ${
              success ? "bg-emerald-500" : "bg-red-500"
            }`}
          />
          <p className="text-sm font-semibold leading-5">{message}</p>
        </div>
      </div>
    </div>
  );
}
