"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { BOOT, BANNER, COMMANDS } from "./commands";

type Line = { id: number; kind: "in" | "out"; text?: string; node?: ReactNode };

const CHIPS = ["help", "about", "agents", "workflows", "pricing", "access", "desktop"];

export function Terminal({ onExit }: { onExit?: () => void }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const idRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const push = (kind: "in" | "out", payload: string | ReactNode) =>
    setLines((l) => [
      ...l,
      kind === "in"
        ? { id: idRef.current++, kind, text: payload as string }
        : { id: idRef.current++, kind, node: payload as ReactNode },
    ]);

  // boot sequence
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i >= BOOT.length) {
        clearInterval(timer);
        return;
      }
      const item = BOOT[i];
      setLines((l) => [...l, { id: idRef.current++, kind: "out", node: item }]);
      i++;
    }, 150);
    return () => clearInterval(timer);
  }, []);

  // autoscroll
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const run = (raw: string) => {
    push("in", raw);
    const cmd = raw.trim().toLowerCase();
    if (cmd) setHistory((h) => [...h, raw]);
    setHistIdx(-1);
    if (!cmd) return;
    if (cmd === "clear") {
      setLines([]);
      return;
    }
    if (cmd === "banner") {
      push("out", BANNER);
      return;
    }
    if (["desktop", "gui", "exit", "quit"].includes(cmd)) {
      push("out", <span className="phosphor-dim">switching to desktop…</span>);
      setTimeout(() => onExit?.(), 380);
      return;
    }
    const fn = COMMANDS[cmd];
    if (fn) push("out", fn());
    else
      push(
        "out",
        <span className="text-red-400">
          command not found: {cmd} — type <span className="phosphor">help</span>
        </span>
      );
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    run(input);
    setInput("");
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const idx = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx);
      setInput(history[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === -1) return;
      const idx = histIdx + 1;
      if (idx >= history.length) {
        setHistIdx(-1);
        setInput("");
      } else {
        setHistIdx(idx);
        setInput(history[idx]);
      }
    }
  };

  const focusInput = () => inputRef.current?.focus();

  return (
    <div className="crt relative h-full w-full" onClick={focusInput}>
      <div className="relative z-10 flex h-full flex-col p-4 font-mono text-xs leading-relaxed sm:p-6 sm:text-sm">
        <div ref={scrollRef} className="term-scroll min-h-0 flex-1 overflow-y-auto pr-1 animate-flicker">
          {lines.map((l) => (
            <div key={l.id} className="whitespace-pre-wrap break-words">
              {l.kind === "in" ? (
                <span>
                  <span className="phosphor-dim">ocur@kernel</span>
                  <span className="phosphor-soft">:</span>
                  <span className="phosphor-dim">~$ </span>
                  <span className="phosphor">{l.text}</span>
                </span>
              ) : (
                <div className="py-0.5">{l.node}</div>
              )}
            </div>
          ))}

          {/* live input line */}
          <form onSubmit={submit} className="relative mt-0.5 flex items-center">
            <span className="shrink-0">
              <span className="phosphor-dim">ocur@kernel</span>
              <span className="phosphor-soft">:</span>
              <span className="phosphor-dim">~$ </span>
            </span>
            <span className="phosphor whitespace-pre">{input}</span>
            <span className="phosphor ml-px animate-caret select-none">▋</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              aria-label="terminal input"
              className="absolute inset-0 h-full w-full cursor-text opacity-0"
            />
          </form>
        </div>

        {/* command chips */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="phosphor-dim mr-1 text-2xs">try:</span>
          {CHIPS.map((c) => (
            <button
              key={c}
              onClick={(e) => {
                e.stopPropagation();
                run(c);
                focusInput();
              }}
              className="rounded border border-phos-dim/40 px-2 py-0.5 text-2xs text-phos-soft transition-colors hover:border-phos/60 hover:bg-phos/10 hover:text-phos"
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
