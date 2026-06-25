"use client";

import { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  MessageSquare,
  Boxes,
  Activity,
  Cpu,
  Tag,
  Mail,
  SquareTerminal,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Window } from "./window";
import {
  WelcomeApp,
  AgentsApp,
  ActivityApp,
  KernelApp,
  PricingApp,
  AccessApp,
  type AppId,
} from "./apps";
import { ChatApp } from "./chat";

const META: Record<AppId, { title: string; icon: LucideIcon; width: number }> = {
  welcome: { title: "Welcome to Ocur", icon: Sparkles, width: 468 },
  chat: { title: "Talk to Ocur", icon: MessageSquare, width: 392 },
  agents: { title: "Agents.app", icon: Boxes, width: 340 },
  activity: { title: "Activity", icon: Activity, width: 320 },
  kernel: { title: "Kernel Monitor", icon: Cpu, width: 384 },
  pricing: { title: "Pricing", icon: Tag, width: 560 },
  access: { title: "Get Access", icon: Mail, width: 392 },
};

const DOCK: AppId[] = ["welcome", "chat", "agents", "activity", "kernel", "pricing", "access"];
const STACK_ORDER: AppId[] = ["welcome", "chat", "agents", "kernel", "activity", "pricing", "access"];

type WinState = { open: boolean; x: number; y: number; z: number };

const INITIAL: Record<AppId, WinState> = {
  welcome: { open: true, x: 52, y: 46, z: 2 },
  chat: { open: true, x: 548, y: 54, z: 5 },
  agents: { open: true, x: 968, y: 78, z: 3 },
  kernel: { open: false, x: 320, y: 150, z: 0 },
  activity: { open: false, x: 600, y: 430, z: 0 },
  pricing: { open: false, x: 360, y: 150, z: 0 },
  access: { open: false, x: 470, y: 120, z: 0 },
};

function useMedia(query: string) {
  const [match, setMatch] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return match;
}

export function Desktop({ onTerminal }: { onTerminal?: () => void }) {
  const isLg = useMedia("(min-width: 1024px)");
  const [wins, setWins] = useState<Record<AppId, WinState>>(INITIAL);
  const zRef = useRef(5);

  const focus = (id: AppId) =>
    setWins((w) => {
      zRef.current += 1;
      return { ...w, [id]: { ...w[id], z: zRef.current } };
    });
  const move = (id: AppId, x: number, y: number) =>
    setWins((w) => ({ ...w, [id]: { ...w[id], x, y } }));
  const open = (id: AppId) =>
    setWins((w) => {
      zRef.current += 1;
      return { ...w, [id]: { ...w[id], open: true, z: zRef.current } };
    });
  const close = (id: AppId) =>
    setWins((w) => ({ ...w, [id]: { ...w[id], open: false } }));

  const content = (id: AppId) => {
    switch (id) {
      case "welcome":
        return <WelcomeApp onChat={() => open("chat")} onAccess={() => open("access")} />;
      case "chat":
        return <ChatApp />;
      case "agents":
        return <AgentsApp />;
      case "activity":
        return <ActivityApp />;
      case "kernel":
        return <KernelApp />;
      case "pricing":
        return <PricingApp />;
      case "access":
        return <AccessApp />;
    }
  };

  const onDock = (id: AppId) => {
    if (isLg) {
      open(id);
    } else {
      document.getElementById(`win-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="grain wallpaper relative h-full w-full overflow-hidden">
      <div className="wallpaper-grid absolute inset-0" />

      {/* Desktop label badge */}
      <div className="pointer-events-none absolute right-4 top-3 z-0 hidden font-mono text-2xs text-ink/30 lg:block">
        OCUR OS — DESKTOP
      </div>

      {/* Windows */}
      {isLg ? (
        <div className="absolute inset-0">
          {DOCK.map((id) =>
            wins[id].open ? (
              <Window
                key={id}
                floating
                title={META[id].title}
                icon={META[id].icon}
                width={META[id].width}
                x={wins[id].x}
                y={wins[id].y}
                z={wins[id].z}
                focused={wins[id].z === zRef.current}
                onFocus={() => focus(id)}
                onMove={(x, y) => move(id, x, y)}
                onClose={() => close(id)}
              >
                {content(id)}
              </Window>
            ) : null
          )}
        </div>
      ) : (
        <div className="no-scrollbar relative z-10 h-full overflow-y-auto px-4 pb-28 pt-4">
          <div className="mx-auto flex max-w-md flex-col gap-4">
            {STACK_ORDER.map((id) => (
              <div key={id} id={`win-${id}`} className="scroll-mt-4">
                <Window floating={false} title={META[id].title} icon={META[id].icon}>
                  {content(id)}
                </Window>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dock */}
      <div className="absolute bottom-3 left-1/2 z-[60] -translate-x-1/2">
        <div className="glass-light flex items-end gap-1.5 rounded-2xl border border-white/50 px-2.5 py-2 shadow-dock">
          {DOCK.map((id) => {
            const Icon = META[id].icon;
            const active = isLg && wins[id].open;
            return (
              <button
                key={id}
                onClick={() => onDock(id)}
                title={META[id].title}
                className="group relative flex flex-col items-center"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-ink/10 bg-white text-ink-soft shadow-sm transition-all duration-200 group-hover:-translate-y-1.5 group-hover:text-cobalt-600">
                  <Icon className="h-5 w-5" strokeWidth={1.9} />
                </span>
                <span
                  className={cn(
                    "mt-1 h-1 w-1 rounded-full transition-colors",
                    active ? "bg-cobalt-500" : "bg-transparent"
                  )}
                />
              </button>
            );
          })}

          <span className="mx-1 h-9 w-px self-center bg-ink/10" />

          <button
            onClick={onTerminal}
            title="Open Terminal"
            className="group flex flex-col items-center"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-void/40 bg-void-900 text-phos shadow-sm transition-all duration-200 group-hover:-translate-y-1.5">
              <SquareTerminal className="h-5 w-5" strokeWidth={1.9} />
            </span>
            <span className="mt-1 h-1 w-1 rounded-full bg-transparent" />
          </button>
        </div>
      </div>
    </div>
  );
}
