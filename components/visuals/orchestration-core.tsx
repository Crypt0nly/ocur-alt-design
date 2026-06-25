"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  TrendingUp,
  Headphones,
  Wallet,
  Cog,
  Users,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import { LogoMark } from "@/components/brand/logo";

type Node = {
  label: string;
  status: string;
  x: number;
  y: number;
  icon: LucideIcon;
};

// Positioned on a circle (r≈37) around the kernel at (50,50).
const NODES: Node[] = [
  { label: "Revenue", status: "closing", x: 50, y: 11, icon: TrendingUp },
  { label: "Support", status: "live", x: 84, y: 31, icon: Headphones },
  { label: "Finance", status: "reconciling", x: 84, y: 69, icon: Wallet },
  { label: "Operations", status: "routing", x: 50, y: 89, icon: Cog },
  { label: "People", status: "onboarding", x: 16, y: 69, icon: Users },
  { label: "Growth", status: "testing", x: 16, y: 31, icon: Sprout },
];

export function OrchestrationCore() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[540px]">
      {/* connection + pulse layer (square SVG, perfectly aligned to chips) */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="oc-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7167FA" stopOpacity="0.6" />
            <stop offset="1" stopColor="#5EE6C8" stopOpacity="0.15" />
          </linearGradient>
          <radialGradient id="oc-core" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#7167FA" stopOpacity="0.35" />
            <stop offset="1" stopColor="#7167FA" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* soft core halo */}
        <circle cx="50" cy="50" r="30" fill="url(#oc-core)" />

        {NODES.map((n, i) => (
          <g key={n.label}>
            <line
              x1="50"
              y1="50"
              x2={n.x}
              y2={n.y}
              stroke="url(#oc-line)"
              strokeWidth="0.4"
            />
            {!reduce && (
              <motion.circle
                r="0.9"
                fill="#9BF5DE"
                initial={{ cx: 50, cy: 50, opacity: 0 }}
                animate={{
                  cx: [50, n.x],
                  cy: [50, n.y],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 2.4,
                  delay: i * 0.5,
                  repeat: Infinity,
                  repeatDelay: 1.2,
                  ease: "easeInOut",
                }}
              />
            )}
          </g>
        ))}
      </svg>

      {/* Kernel core */}
      <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <div className="relative grid h-[104px] w-[104px] place-items-center rounded-full border border-white/10 bg-ink-850/90 shadow-glow backdrop-blur-xl">
          {!reduce && (
            <span className="absolute inset-0 animate-pulse-ring rounded-full border border-iris-400/40" />
          )}
          <div className="flex flex-col items-center gap-1">
            <LogoMark className="h-8 w-8" />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-chalk-soft">
              Kernel
            </span>
          </div>
        </div>
      </div>

      {/* Agent nodes */}
      {NODES.map((n, i) => (
        <motion.div
          key={n.label}
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-ink-850/80 py-2 pl-2 pr-3 shadow-lift backdrop-blur-xl">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/[0.04] text-iris-200">
              <n.icon className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <span className="leading-tight">
              <span className="block text-xs font-medium text-chalk">
                {n.label}
              </span>
              <span className="flex items-center gap-1">
                <span className="h-1 w-1 rounded-full bg-mint-400" />
                <span className="font-mono text-[9px] text-chalk-muted">
                  {n.status}
                </span>
              </span>
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
