"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { agents } from "@/components/os/data";
import { agentReply } from "@/components/os/agent-replies";
import { cn } from "@/lib/utils";

type Msg = { id: number; role: "user" | "agent"; text: string; who: string };

const ROSTER = [
  { id: "ocur", name: "Ocur", role: "Kernel" },
  ...agents.map((a) => ({ id: a.name.toLowerCase(), name: a.name, role: a.role })),
];

const QUICK = [
  "Summarize what ran today",
  "Close the books for May",
  "Draft outreach to Vantage",
  "Open a hiring pipeline",
];

function Avatar({ label }: { label: string }) {
  return (
    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-cobalt-500 to-violet text-[11px] font-semibold text-white">
      {label === "Ocur" ? <Sparkles className="h-3.5 w-3.5" /> : label[0]}
    </span>
  );
}

export function ChatApp() {
  const [who, setWho] = useState("ocur");
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      id: 0,
      role: "agent",
      who: "Ocur",
      text: "Hi — I'm Ocur. Tell me what you'd like the company to do, and I'll route it to the right agent.",
    },
  ]);
  const idRef = useRef(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sel = ROSTER.find((r) => r.id === who)!;

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, typing]);

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;
    setMsgs((m) => [...m, { id: idRef.current++, role: "user", who: "You", text }]);
    setInput("");
    setTyping(true);
    const author = who === "ocur" ? "Ocur" : sel.name;
    window.setTimeout(() => {
      const reply = agentReply(who === "ocur" ? "ocur" : sel.name, text);
      setMsgs((m) => [...m, { id: idRef.current++, role: "agent", who: author, text: reply }]);
      setTyping(false);
    }, 700);
  };

  const selectAgent = (id: string) => {
    if (id === who) return;
    setWho(id);
    const r = ROSTER.find((x) => x.id === id)!;
    const greet =
      id === "ocur"
        ? "Back to the kernel. What should the company do next?"
        : `${r.name} here — ${r.role}. What do you need?`;
    setMsgs((m) => [...m, { id: idRef.current++, role: "agent", who: r.name, text: greet }]);
  };

  return (
    <div className="flex h-[440px] flex-col">
      {/* agent picker */}
      <div className="no-scrollbar flex shrink-0 gap-1.5 overflow-x-auto border-b border-ink/[0.07] bg-paper-50/60 px-3 py-2">
        {ROSTER.map((r) => (
          <button
            key={r.id}
            onClick={() => selectAgent(r.id)}
            className={cn(
              "shrink-0 rounded-full px-2.5 py-1 text-2xs font-medium transition-colors",
              r.id === who
                ? "bg-cobalt-500 text-white"
                : "border border-ink/10 text-ink-muted hover:bg-ink/[0.04]"
            )}
          >
            {r.name}
          </button>
        ))}
      </div>

      {/* messages */}
      <div ref={scrollRef} className="no-scrollbar flex-1 space-y-3 overflow-y-auto px-3.5 py-3.5">
        {msgs.map((m) =>
          m.role === "user" ? (
            <div key={m.id} className="flex justify-end">
              <div className="max-w-[80%] rounded-2xl rounded-br-md bg-cobalt-500 px-3.5 py-2 text-xs leading-relaxed text-white">
                {m.text}
              </div>
            </div>
          ) : (
            <div key={m.id} className="flex items-start gap-2">
              <Avatar label={m.who} />
              <div className="max-w-[80%]">
                <p className="mb-0.5 font-mono text-[10px] text-ink-faint">{m.who}</p>
                <div className="rounded-2xl rounded-tl-md border border-ink/[0.08] bg-paper-50 px-3.5 py-2 text-xs leading-relaxed text-ink-soft">
                  {m.text}
                </div>
              </div>
            </div>
          )
        )}
        {typing && (
          <div className="flex items-start gap-2">
            <Avatar label={who === "ocur" ? "Ocur" : sel.name} />
            <div className="rounded-2xl rounded-tl-md border border-ink/[0.08] bg-paper-50 px-3.5 py-2.5">
              <span className="flex gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-faint [animation-delay:-0.2s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-faint [animation-delay:-0.1s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-faint" />
              </span>
            </div>
          </div>
        )}
      </div>

      {/* quick prompts */}
      <div className="no-scrollbar flex shrink-0 gap-1.5 overflow-x-auto px-3.5 pb-2">
        {QUICK.map((q) => (
          <button
            key={q}
            onClick={() => send(q)}
            className="shrink-0 rounded-full border border-ink/10 bg-white px-2.5 py-1 text-[10px] text-ink-muted transition-colors hover:border-cobalt-500/40 hover:text-cobalt-600"
          >
            {q}
          </button>
        ))}
      </div>

      {/* input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex shrink-0 items-center gap-2 border-t border-ink/[0.07] p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message ${sel.name}…`}
          aria-label="Message an agent"
          className="h-10 flex-1 rounded-xl border border-ink/[0.12] bg-white px-3.5 text-xs text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-cobalt-500"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cobalt-500 text-white transition-colors hover:bg-cobalt-600 disabled:opacity-40"
          aria-label="Send"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
