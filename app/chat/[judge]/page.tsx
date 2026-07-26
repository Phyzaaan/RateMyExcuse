"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Send } from "lucide-react";
import VerdictPopup from "@/app/components/VerdictPopup";
import Message from "@/app/components/Message";
import { useParams } from "next/navigation";
import judges from "@/app/data/judges";

import { Message as MessageType, Verdict } from "@/app/data/type";

export default function Chat() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [verdict, setVerdict] = useState<Verdict | null>(null);

  const params = useParams<{ judge: string }>();

  const judge = judges[params.judge as keyof typeof judges];

  if (!judge) return ( <div> 404 Page NOT found</div>)

//   useEffect(() => {
//     async function startConversation() {
//       setLoading(true);

//       const res = await fetch("/api/chat", {
//         method: "POST",
//         body: JSON.stringify({
//           judge: params.judge,
//           messages: [],
//         }),
//       });

//       const data = await res.json();

//       setMessages([
//         {
//           role: "assistant",
//           content: data.message,
//         },
//       ]);

//       setLoading(false);
//     }
//     startConversation();
//   }, [params.judge]);

//   async function sendMessage() {
//     if (!input.trim()) return;

//     const updated = [
//       ...messages,
//       {
//         role: "user",
//         content: input,
//       },
//     ];

//     setMessages(updated);
//     setInput("");
//     setLoading(true);

//     const res = await fetch("/api/chat", {
//       method: "POST",
//       body: JSON.stringify({
//         judge: params.judge,
//         messages: updated,
//       }),
//     });

//     const data = await res.json();

//     setMessages([
//       ...updated,
//       {
//         role: "assistant",
//         content: data.message,
//       },
//     ]);

//     setLoading(false);
//   }

  const handleSend = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setInput("");
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
              src={judge.image}
              alt="Judge Avatar"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col items-start">
            <h2 className="text-sm font-black text-text-primary leading-tight">
              {judge.name}
            </h2>
            <p className="text-xs text-secondary font-semibold text-text-primary leading-tight">
              {params.judge}
            </p>
          </div>
        </div>

        {/* Empty Div for keeping the profile in center */}
        <div></div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col gap-4">
        {messages.map((msg, i) => (
          <Message
            key={i}
            align={msg.role === "assistant" ? "left" : undefined}
            imgUrl={msg.role === "assistant" ? judge.image : "/user.jpg"}
            color={msg.role === "assistant" ? judge.color : "blue-100"}
          >
            {msg.content}
          </Message>
        ))}

        {loading && (
          <Message align={"left"} imgUrl={judge.image} color={judge.color}>
            Typing...
          </Message>
        )}
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 p-4 pb-4 max-w-3xl w-full">
        <form onSubmit={handleSend} className="flex items-center gap-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Type your excuse..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
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
      {verdict && <VerdictPopup onClose={() => setVerdict(null)} />}
    </main>
  );
}
