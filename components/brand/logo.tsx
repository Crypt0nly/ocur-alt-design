import { cn } from "@/lib/utils";

/** Orbital mark — inherits `currentColor`, so it adapts to either OS mode. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={cn("h-6 w-6", className)}
      aria-hidden="true"
    >
      <circle
        cx="20"
        cy="20"
        r="14"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="64 24"
        transform="rotate(-34 20 20)"
      />
      <circle cx="20" cy="20" r="5" fill="currentColor" />
      <circle cx="20" cy="6" r="2.4" fill="currentColor" opacity="0.55" />
    </svg>
  );
}

export function Logo({
  className,
  wordmark = true,
}: {
  className?: string;
  wordmark?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <LogoMark />
      {wordmark && (
        <span className="text-base font-semibold tracking-tight">Ocur</span>
      )}
    </span>
  );
}
