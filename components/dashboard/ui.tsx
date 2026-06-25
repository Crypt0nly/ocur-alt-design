import Link from "next/link";
import { ArrowUpRight, ArrowDownRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------------- Page header ---------------- */

export function PageHeader({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="animate-fade-up">
        <h1 className="text-2xl font-semibold tracking-tight text-chalk">
          {title}
        </h1>
        {description && (
          <p className="mt-1 max-w-2xl text-sm text-chalk-muted">{description}</p>
        )}
      </div>
      {children && (
        <div className="flex flex-wrap items-center gap-2 animate-fade-up animation-delay-100">
          {children}
        </div>
      )}
    </div>
  );
}

/* ---------------- Button ---------------- */

export function Btn({
  children,
  variant = "ghost",
  href,
  icon: Icon,
  className,
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  href?: string;
  icon?: LucideIcon;
  className?: string;
}) {
  const cls = cn(
    "inline-flex h-9 items-center gap-1.5 rounded-xl px-3.5 text-xs font-medium transition-colors",
    variant === "primary"
      ? "bg-chalk text-ink-950 hover:bg-white"
      : "border border-white/[0.09] bg-white/[0.02] text-chalk-soft hover:bg-white/[0.06] hover:text-chalk",
    className
  );
  const inner = (
    <>
      {Icon && <Icon className="h-3.5 w-3.5" strokeWidth={2} />}
      {children}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return <button className={cls}>{inner}</button>;
}

/* ---------------- Panel ---------------- */

export function Panel({
  title,
  action,
  children,
  className,
  bodyClassName,
}: {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-3xl border border-white/[0.07] bg-ink-900/40 backdrop-blur-sm",
        className
      )}
    >
      {title && (
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-6 py-4">
          <h2 className="text-sm font-medium text-chalk">{title}</h2>
          {action}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}

/* ---------------- Delta ---------------- */

export function Delta({ value, good }: { value: number; good: boolean }) {
  const up = value >= 0;
  const Icon = up ? ArrowUpRight : ArrowDownRight;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-mono text-2xs",
        good ? "bg-mint-500/10 text-mint-400" : "bg-red-500/10 text-red-400"
      )}
    >
      <Icon className="h-3 w-3" />
      {Math.abs(value)}
      {Number.isInteger(value) && Math.abs(value) < 10 ? "" : "%"}
    </span>
  );
}

/* ---------------- Sparkline ---------------- */

export function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 28 - ((d - min) / range) * 24 - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox="0 0 100 28" preserveAspectRatio="none" className="h-8 w-full">
      <polyline
        points={pts}
        fill="none"
        stroke="url(#spark)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <defs>
        <linearGradient id="spark" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7167FA" />
          <stop offset="1" stopColor="#5EE6C8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ---------------- Stat tile ---------------- */

export function StatTile({
  label,
  value,
  sub,
  delta,
  deltaGood = true,
  icon: Icon,
  data,
  className,
}: {
  label: string;
  value: string;
  sub?: string;
  delta?: number;
  deltaGood?: boolean;
  icon?: LucideIcon;
  data?: number[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/[0.07] bg-ink-900/40 p-5 backdrop-blur-sm",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-xs text-chalk-muted">
          {Icon && <Icon className="h-3.5 w-3.5 text-iris-200" />}
          {label}
        </p>
        {delta !== undefined && <Delta value={delta} good={deltaGood} />}
      </div>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-chalk">
        {value}
      </p>
      {data ? (
        <div className="mt-2">
          <Sparkline data={data} />
        </div>
      ) : (
        sub && <p className="mt-1 text-2xs text-chalk-faint">{sub}</p>
      )}
    </div>
  );
}

/* ---------------- Segmented (visual) ---------------- */

export function Segmented({
  items,
  active,
}: {
  items: string[];
  active: string;
}) {
  return (
    <div className="flex rounded-xl border border-white/[0.08] bg-white/[0.02] p-1">
      {items.map((t) => (
        <button
          key={t}
          className={cn(
            "rounded-lg px-3 py-1.5 font-mono text-2xs transition-colors",
            t === active
              ? "bg-white/[0.07] text-chalk"
              : "text-chalk-faint hover:text-chalk-soft"
          )}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

/* ---------------- Status badge ---------------- */

type Tone = "mint" | "iris" | "amber" | "faint" | "red";

const toneMap: Record<Tone, string> = {
  mint: "bg-mint-500/10 text-mint-400",
  iris: "bg-iris-500/15 text-iris-200",
  amber: "bg-amber-500/10 text-amber-400",
  faint: "bg-white/[0.05] text-chalk-muted",
  red: "bg-red-500/10 text-red-400",
};

const dotMap: Record<Tone, string> = {
  mint: "bg-mint-400",
  iris: "bg-iris-400",
  amber: "bg-amber-400",
  faint: "bg-chalk-faint",
  red: "bg-red-400",
};

export function StatusBadge({
  tone = "mint",
  children,
  dot = true,
  pulse = false,
}: {
  tone?: Tone;
  children: React.ReactNode;
  dot?: boolean;
  pulse?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-1.5 py-0.5 font-mono text-2xs",
        toneMap[tone]
      )}
    >
      {dot &&
        (pulse ? (
          <span className="relative flex h-1.5 w-1.5">
            <span
              className={cn(
                "absolute inline-flex h-full w-full animate-ping rounded-full opacity-60",
                dotMap[tone]
              )}
            />
            <span
              className={cn("relative inline-flex h-1.5 w-1.5 rounded-full", dotMap[tone])}
            />
          </span>
        ) : (
          <span className={cn("h-1.5 w-1.5 rounded-full", dotMap[tone])} />
        ))}
      {children}
    </span>
  );
}

/* ---------------- Tag ---------------- */

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-2.5 py-1 text-2xs text-chalk-soft/80">
      {children}
    </span>
  );
}

/* ---------------- Avatar ---------------- */

export function Avatar({
  initials,
  className,
}: {
  initials: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "grid place-items-center rounded-full bg-spectral text-xs font-semibold text-ink-950",
        className
      )}
    >
      {initials}
    </span>
  );
}

/* ---------------- Progress bar ---------------- */

export function Progress({
  value,
  tone = "iris",
  className,
}: {
  value: number;
  tone?: "iris" | "mint" | "spectral";
  className?: string;
}) {
  const fill =
    tone === "spectral"
      ? "bg-spectral"
      : tone === "mint"
      ? "bg-gradient-to-r from-iris-500 to-mint-400"
      : "bg-gradient-to-r from-iris-500 to-iris-300";
  return (
    <div
      className={cn(
        "h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]",
        className
      )}
    >
      <div className={cn("h-full rounded-full", fill)} style={{ width: `${value}%` }} />
    </div>
  );
}

/* ---------------- Icon chip ---------------- */

export function IconChip({
  icon: Icon,
  className,
}: {
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-iris-200",
        className
      )}
    >
      <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
    </span>
  );
}
