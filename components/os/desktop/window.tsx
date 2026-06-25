"use client";

import { useRef, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function Window({
  title,
  icon: Icon,
  floating,
  x = 0,
  y = 0,
  z = 1,
  width = 360,
  focused,
  onFocus,
  onMove,
  onClose,
  children,
  bodyClassName,
}: {
  title: string;
  icon: LucideIcon;
  floating: boolean;
  x?: number;
  y?: number;
  z?: number;
  width?: number;
  focused?: boolean;
  onFocus?: () => void;
  onMove?: (x: number, y: number) => void;
  onClose?: () => void;
  children: ReactNode;
  bodyClassName?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  const startDrag = (e: React.PointerEvent) => {
    if (!floating || !onMove) return;
    onFocus?.();
    const parent = ref.current?.offsetParent as HTMLElement | null;
    const startX = e.clientX;
    const startY = e.clientY;
    const origX = x;
    const origY = y;
    const move = (ev: PointerEvent) => {
      const pw = parent?.clientWidth ?? window.innerWidth;
      const ph = parent?.clientHeight ?? window.innerHeight;
      let nx = origX + (ev.clientX - startX);
      let ny = origY + (ev.clientY - startY);
      nx = Math.max(8, Math.min(nx, pw - 110));
      ny = Math.max(0, Math.min(ny, ph - 52));
      onMove(nx, ny);
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  return (
    <section
      ref={ref}
      onMouseDown={onFocus}
      style={floating ? { left: x, top: y, zIndex: z, width } : undefined}
      className={cn(
        "overflow-hidden rounded-xl2 border border-ink/10 bg-white/90 text-ink backdrop-blur-xl",
        floating
          ? cn("absolute animate-window-in", focused ? "shadow-window-focus" : "shadow-window")
          : "relative w-full shadow-window"
      )}
    >
      {/* title bar */}
      <div
        onPointerDown={startDrag}
        className={cn(
          "flex items-center gap-2 border-b border-ink/[0.08] bg-paper-50/70 px-3 py-2.5 select-none",
          floating && "cursor-grab active:cursor-grabbing"
        )}
      >
        <div className="flex items-center gap-1.5">
          <button
            aria-label="Close"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={onClose}
            className="group h-3 w-3 rounded-full bg-[#ff5f57] ring-1 ring-black/5"
          >
            <span className="block h-full w-full scale-0 text-[7px] leading-none text-black/40 transition-transform group-hover:scale-100">
              ✕
            </span>
          </button>
          <span className="h-3 w-3 rounded-full bg-[#febc2e] ring-1 ring-black/5" />
          <span className="h-3 w-3 rounded-full bg-[#28c840] ring-1 ring-black/5" />
        </div>
        <div className="ml-1.5 flex items-center gap-1.5 text-2xs font-medium text-ink-soft">
          <Icon className="h-3.5 w-3.5 text-ink-muted" strokeWidth={2} />
          {title}
        </div>
      </div>

      {/* body */}
      <div
        className={cn(
          "no-scrollbar overflow-auto",
          floating && "max-h-[68vh]",
          bodyClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}
