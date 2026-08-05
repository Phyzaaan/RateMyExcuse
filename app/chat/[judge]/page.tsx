"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Send, Target } from "lucide-react";
import VerdictPopup from "@/app/components/VerdictPopup";
import Message from "@/app/components/Message";
import { useParams } from "next/navigation";
import judges from "@/app/data/judges";

import { Message as MessageType, Verdict } from "@/app/data/type";

export default function Chat() {
  const [scenario, setScenario] = useState("");
  const [interactionId, setId] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [isFetchingVerdict, setIsFetchingVerdict] = useState(false);

  const params = useParams<{ judge: string }>();

  const judge = judges[params.judge as keyof typeof judges];

  useEffect(() => {
    if (!judge) return;

    async function startConversation() {
      setLoading(true);

      const res = await fetch("/api/chat/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          judge: params.judge,
        }),
      });

      const data = await res.json();

      setMessages([
        {
          role: "assistant",
          content: data.message,
        },
      ]);

      setScenario(data.scenario);
      setId(data.interactionId);

      setLoading(false);
    }
    startConversation();
  }, [params.judge, judge]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const updated: MessageType[] = [
      ...messages,
      {
        role: "user",
        content: input,
      },
    ];

    setMessages(updated);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: updated[updated.length - 1].content,
        interactionId: interactionId,
      }),
    });

    const data = await res.json();

    setMessages([
      ...updated,
      {
        role: "assistant",
        content: data.message,
      },
    ]);

    setId(data.interactionId);

    setLoading(false);
  }

  async function getVerdict() {
    if (!interactionId || loading || isFetchingVerdict) return;

    setIsFetchingVerdict(true);

    const message = input;
    setInput("");

    const res = await fetch("/api/chat/verdict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        interactionId,
        message,
      }),
    });

    const data = (await res.json()) as Verdict;

    setVerdict(data);

    setIsFetchingVerdict(false);
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (messages.length <= 5) {
      sendMessage();
    } else {
      getVerdict();
    }
  }

  if (!judge) return <div> 404 Page NOT found</div>;

  return (
    <main className="flex flex-col w-full max-w-3xl">
      {/* Header */}
      <div className={`flex items-center justify-between bg-primary-bg py-3 px-4 sticky top-0 z-10`}>
        <Link
          href="/judges"
          className="w-10 h-10 bg-card-bg hover:bg-card-bg-hover rounded-full shadow-sm flex items-center justify-center text-primary-from transition-colors"
        >
          <ChevronLeft className="w-6 h-6" strokeWidth={3} />
        </Link>

        <div className="flex items-center gap-2 ">
          <div className={`w-10 h-10 rounded-full ${judge.bg} overflow-hidden border-2 ${judge.border} flex items-center justify-center`}>
            <Image
              src={judge.image}
              alt="Judge Avatar"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col items-start">
            <h2 className="text-sm font-black text-text-primary leading-tight">
              {judge.name}
            </h2>
            <p className="text-xs text-secondary font-semibold text-text-primary leading-tight flex items-center gap-1">
              {params.judge}
            </p>
          </div>
        </div>

        {/* Empty Div for keeping the profile in center */}
        <div></div>
      </div>

      {/* Scenario Card - sticky below header */}
      {loading && !isFetchingVerdict && !scenario ? (
        <div className="sticky top-18 z-10 pb-2">
          <div className={`flex items-center gap-3 bg-primary-bg/80 backdrop-blur-md rounded-xl px-4 py-3 shadow-sm animate-pulse`}>
            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0`} />
            <div className="flex-1 space-y-2">
              <div className={`h-3 ${judge.color} rounded-full w-3/4`} />
              <div className={`h-3 ${judge.bg} rounded-full w-1/2`} />
            </div>
          </div>
        </div>
      ) : (
        scenario && (
          <div className="sticky top-18 z-10 pb-2">
            <div className={`flex items-center gap-3 bg-primary-bg/80 backdrop-blur-md rounded-xl px-4 py-3 shadow-sm`}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0`}>
                <Target
                  className="w-4.5 h-4.5 text-orange-600"
                  strokeWidth={2.5}
                />
              </div>
              <p className="text-sm font-medium text-text-primary leading-relaxed">
                {scenario}
              </p>
            </div>
          </div>
        )
      )}

      {/* Chat Area */}
      <div className="flex flex-col gap-4 pb-20 pt-4">
        {messages.map((msg, i) => (
          <Message
            key={i}
            align={msg.role === "assistant" ? "left" : undefined}
            imgUrl={msg.role === "assistant" ? judge.image : "/img/user.jpg"}
            bg={msg.role === "assistant" ? judge.bg : "bg-blue-200"}
          >
            {msg.content}
          </Message>
        ))}

        {loading && !isFetchingVerdict && (
          <Message align={"left"} imgUrl={judge.image} bg={judge.bg}>
            <span className="inline-flex gap-1">
              <span
                className="w-2 h-2 bg-current rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <span
                className="w-2 h-2 bg-current rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <span
                className="w-2 h-2 bg-current rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </span>
          </Message>
        )}
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 p-4 pb-4 max-w-3xl w-full">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Type your excuse..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-primary-bg border border-card-border rounded-full py-3 px-5 text-sm focus:outline-none focus:border-primary-from focus:ring-2 focus:ring-primary-from/20 transition-all text-text-secondary placeholder:text-text-tertiary shadow-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading || isFetchingVerdict}
            className="w-10 h-10 bg-primary-from text-white rounded-full hover:bg-primary-to active:scale-95 transition-all shadow-md flex items-center justify-center shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading || isFetchingVerdict ? (
              <svg
                className="animate-spin w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            ) : (
              <Send className="w-4 h-4 ml-0.5" strokeWidth={2.5} />
            )}
          </button>
        </form>
      </div>

      {/* Verdict fetching popup */}
      {isFetchingVerdict && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/30 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-primary-bg w-full max-w-sm rounded-3xl p-8 flex flex-col items-center gap-5 shadow-2xl border-4 border-white/80 animate-in zoom-in-95 duration-300">
            <svg
              className={`animate-spin w-10 h-10 ${judge.text}`}
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <div className="text-center">
              <p className="text-base font-bold text-text-primary">
                Calculating verdict...
              </p>
              <p className="text-sm text-text-secondary mt-1">
                The judge is reviewing your excuse
              </p>
            </div>
            <div className="flex gap-1.5">
              <span
                className={`w-2 h-2 ${judge.bg} rounded-full animate-bounce`}
                style={{ animationDelay: "0ms" }}
              />
              <span
                className={`w-2 h-2 ${judge.bg} rounded-full animate-bounce`}
                style={{ animationDelay: "150ms" }}
              />
              <span
                className={`w-2 h-2 ${judge.bg} rounded-full animate-bounce`}
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Verdict Popup overlay */}
      {verdict && (
        <VerdictPopup
          judge={params.judge}
          verdict={verdict}
          judgeImg={judge.image}
          judgeBg={judge.bg}
        />
      )}
    </main>
  );
}
