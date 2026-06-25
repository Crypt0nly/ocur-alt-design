import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={cn("h-7 w-7", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ocur-mark" x1="4" y1="4" x2="36" y2="36">
          <stop stopColor="#A7A1FF" />
          <stop offset="0.5" stopColor="#7167FA" />
          <stop offset="1" stopColor="#5EE6C8" />
        </linearGradient>
      </defs>
      {/* Orbit — the OS boundary */}
      <circle
        cx="20"
        cy="20"
        r="14"
        stroke="url(#ocur-mark)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="64 24"
        transform="rotate(-34 20 20)"
      />
      {/* Kernel core */}
      <circle cx="20" cy="20" r="5.4" fill="url(#ocur-mark)" />
      {/* Agent node */}
      <circle cx="20" cy="6" r="2.5" fill="#5EE6C8" />
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
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      {wordmark && (
        <span className="text-[1.28rem] font-semibold tracking-tightest text-chalk">
          Ocur
        </span>
      )}
    </span>
  );
}
