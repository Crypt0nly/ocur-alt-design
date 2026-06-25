"use client";

import { useEffect, useState, useCallback } from "react";
import { Monitor, SquareTerminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/brand/logo";
import { Desktop } from "@/components/os/desktop/desktop";
import { Terminal } from "@/components/os/terminal/terminal";

type Mode = "desktop" | "terminal";

function Clock({ mode }: { mode: Mode }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className={cn("font-mono text-2xs tabular-nums", mode === "terminal" ? "phosphor-dim" : "text-ink-soft")}>
      {time || "··:··"}
    </span>
  );
}

function ModeSwitch({ mode, set }: { mode: Mode; set: (m: Mode) => void }) {
  const isTerm = mode === "terminal";
  return (
    <div
      className={cn(
        "relative flex items-center rounded-full p-0.5 text-2xs font-medium",
        isTerm
          ? "border border-phos-dim/40 bg-void-800/80"
          : "border border-ink/10 bg-white/70 shadow-sm"
      )}
      role="tablist"
      aria-label="Interface mode"
    >
      {/* sliding indicator */}
      <span
        className={cn(
          "absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isTerm ? "translate-x-[calc(100%+0px)] bg-phos/15 ring-1 ring-phos/40" : "translate-x-0 bg-cobalt-500"
        )}
      />
      <button
        onClick={() => set("desktop")}
        className={cn(
          "relative z-10 flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors",
          !isTerm ? "text-white" : "text-ink-muted hover:text-ink-soft",
          isTerm && "text-phos-dim hover:text-phos-soft"
        )}
      >
        <Monitor className="h-3.5 w-3.5" />
        Desktop
      </button>
      <button
        onClick={() => set("terminal")}
        className={cn(
          "relative z-10 flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors",
          isTerm ? "phosphor" : "text-ink-muted hover:text-ink-soft"
        )}
      >
        <SquareTerminal className="h-3.5 w-3.5" />
        Terminal
      </button>
    </div>
  );
}

export function OcurOS() {
  const [mode, setMode] = useState<Mode>("desktop");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ocur-mode") as Mode | null;
    if (saved === "desktop" || saved === "terminal") setMode(saved);
    setReady(true);
  }, []);

  const change = useCallback((m: Mode) => {
    setMode(m);
    localStorage.setItem("ocur-mode", m);
  }, []);

  // ⌘/Ctrl + ` toggles modes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "`") {
        e.preventDefault();
        change(mode === "desktop" ? "terminal" : "desktop");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, change]);

  const isTerm = mode === "terminal";

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden">
      {/* Unified top bar */}
      <header
        className={cn(
          "relative z-50 flex h-9 shrink-0 items-center justify-between px-3 text-xs transition-colors duration-300",
          isTerm
            ? "border-b border-phos-dim/25 bg-void-900 phosphor-dim"
            : "glass-light border-b border-white/40 text-ink-soft shadow-menubar"
        )}
      >
        {/* left */}
        <div className="flex items-center gap-3">
          <span className={cn("flex items-center gap-2", isTerm ? "text-phos" : "text-ink")}>
            <LogoMark className="h-4 w-4" />
            <span className="text-2xs font-semibold tracking-tight">Ocur OS</span>
          </span>
          <span className={cn("hidden items-center gap-3 font-mono text-2xs sm:flex", isTerm ? "phosphor-dim" : "text-ink-muted")}>
            {isTerm ? (
              <span>v4.0 · kernel ready</span>
            ) : (
              <>
                <span className="hover:text-ink">File</span>
                <span className="hover:text-ink">Agents</span>
                <span className="hover:text-ink">View</span>
                <span className="hover:text-ink">Help</span>
              </>
            )}
          </span>
        </div>

        {/* center switch */}
        {ready && <ModeSwitch mode={mode} set={change} />}

        {/* right */}
        <div className="flex items-center gap-3">
          <span className={cn("hidden items-center gap-1.5 font-mono text-2xs sm:flex", isTerm ? "phosphor-dim" : "text-ink-muted")}>
            <span className={cn("h-1.5 w-1.5 rounded-full", isTerm ? "bg-phos" : "bg-cobalt-500")} />
            6 agents online
          </span>
          <Clock mode={mode} />
        </div>
      </header>

      {/* Mode stage */}
      <main className="relative flex-1 overflow-hidden">
        {ready && (
          <div
            key={mode}
            className={cn(
              "absolute inset-0",
              isTerm ? "origin-center animate-power-on" : "animate-fade-in"
            )}
          >
            {isTerm ? (
              <Terminal onExit={() => change("desktop")} />
            ) : (
              <Desktop onTerminal={() => change("terminal")} />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
