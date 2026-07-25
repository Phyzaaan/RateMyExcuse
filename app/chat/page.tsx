"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Send } from "lucide-react";
import VerdictPopup from "../components/VerdictPopup";
import Message from "../components/Message";

export default function Chat() {
  const [showVerdict, setShowVerdict] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSend = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setShowVerdict(true);
      setInputValue("");
    }
  };

  return (
    <main className="flex flex-col w-full max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between rounded-2xl bg-emerald-100 py-3 px-4 sticky top-0 z-10">
        <Link
          href="/judges"
          className="w-10 h-10 bg-card-bg hover:bg-card-bg-hover rounded-full shadow-sm flex items-center justify-center text-primary-from transition-colors"
        >
          <ChevronLeft className="w-6 h-6" strokeWidth={3} />
        </Link>

        <div className="flex items-center gap-2 ">
          <div className="w-10 h-10 rounded-full bg-emerald-100 overflow-hidden border-2 border-emerald-200 flex items-center justify-center">
            <Image
              src="/Teacher.png"
              alt="Judge Avatar"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col items-start">
            <h2 className="text-sm font-black text-text-primary leading-tight">
              Teacher
            </h2>
            <p className="text-xs text-secondary font-semibold text-text-primary leading-tight">
              Strick but Fair
            </p>
          </div>
        </div>

        {/* Empty Div for keeping the profile in center */}
        <div></div>
      </div>

      {/* Chat Area */}
      <div className="overflow-y-auto px-4 py-6 flex flex-col gap-4">
        {/* Judge Message */}
        <Message imgUrl="/Teacher.png" color="emerald-100" align="left">
          Would You care to explain why are you late 30 mins today?
        </Message>

        {/* User Message */}
        <Message imgUrl="/user.jpg" color="blue-100">
          My alarm dint went off so I selpt extra..
        </Message>
        {/* Judge Message */}
        <Message imgUrl="/Teacher.png" color="emerald-100" align="left">
          Would You care to explain why are you late 30 mins today?
        </Message>

        {/* User Message */}
        <Message imgUrl="/user.jpg" color="blue-100">
          My alarm dint went off so I selpt extra..
        </Message>
        {/* Judge Message */}
        <Message imgUrl="/Teacher.png" color="emerald-100" align="left">
          Would You care to explain why are you late 30 mins today?
        </Message>

        {/* User Message */}
        <Message imgUrl="/user.jpg" color="blue-100">
          My alarm dint went off so I selpt extra..
        </Message>
        {/* Judge Message */}
        <Message imgUrl="/Teacher.png" color="emerald-100" align="left">
          Would You care to explain why are you late 30 mins today?
        </Message>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 p-4 pb-4 max-w-3xl w-full">
        <form onSubmit={handleSend} className="flex items-center gap-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Type your excuse..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full bg-white border border-card-border rounded-full py-3 px-5 text-sm focus:outline-none focus:border-primary-from focus:ring-2 focus:ring-primary-from/20 transition-all text-text-secondary placeholder:text-text-tertiary shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="w-10 h-10 bg-primary-from text-white rounded-full hover:bg-primary-to active:scale-95 transition-all shadow-md flex items-center justify-center shrink-0"
          >
            <Send className="w-4 h-4 ml-0.5" strokeWidth={2.5} />
          </button>
        </form>
      </div>

      {/* Verdict Popup overlay */}
      {showVerdict && <VerdictPopup onClose={() => setShowVerdict(false)} />}
    </main>
  );
}
