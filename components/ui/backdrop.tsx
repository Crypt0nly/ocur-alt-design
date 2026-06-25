import { cn } from "@/lib/utils";

/** Fixed page-wide ambient field: grid + spectral glows + grain. */
export function AmbientBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base */}
      <div className="absolute inset-0 bg-ink-950" />
      {/* faint grid */}
      <div
        className="absolute inset-0 bg-grid-faint [background-size:64px_64px] mask-fade-b opacity-70"
        style={{ maskImage: "radial-gradient(80% 60% at 50% 0%, black, transparent)" }}
      />
      {/* spectral glows */}
      <div className="absolute -top-40 left-1/2 h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(113,103,250,0.20),transparent)] blur-2xl" />
      <div className="absolute right-[8%] top-[18%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(94,230,200,0.10),transparent)] blur-2xl" />
      <div className="absolute left-[2%] top-[42%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(closest-side,rgba(124,114,255,0.10),transparent)] blur-2xl" />
      {/* grain */}
      <div className="noise absolute inset-0" />
    </div>
  );
}

/** Localized radial glow for placing behind a feature element. */
export function Glow({
  className,
  tone = "iris",
}: {
  className?: string;
  tone?: "iris" | "mint" | "mixed";
}) {
  const fill =
    tone === "mint"
      ? "rgba(94,230,200,0.16)"
      : tone === "mixed"
      ? "rgba(124,114,255,0.16)"
      : "rgba(113,103,250,0.18)";
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full blur-3xl",
        className
      )}
      style={{
        background: `radial-gradient(closest-side, ${fill}, transparent)`,
      }}
    />
  );
}
