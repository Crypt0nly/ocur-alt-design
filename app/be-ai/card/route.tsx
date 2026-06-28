import { ImageResponse } from "next/og";

// Dynamic per-result share card: /be-ai/card?played=10&spotted=7&fooled=3
// Referenced as the og:image for personalized share links (see page.tsx).
// ImageResponse sets the image/png content type itself.

const VOID = "#05080A";
const PHOS = "#3DF5A0";
const CORAL = "#FF8366";
const COBALT = "#5C7CFF";

function n(v: string | null): number {
  const x = Number(v);
  return Number.isFinite(x) && x >= 0 ? Math.floor(x) : 0;
}

function headline(played: number, spotted: number, fooled: number): string {
  if (played === 0) return "I'm trying to out-AI the AI on Ocur.";
  if (fooled === 0) return `I spotted the real AI ${spotted}/${played} times. The machines can't fool me yet.`;
  if (spotted === 0) return `A human out-AI'd me ${fooled}/${played} times. I have never been so humbled.`;
  return `I spotted the real AI ${spotted}/${played} — and got fooled by a human ${fooled} times.`;
}

function Chip({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        padding: "20px 28px",
        borderRadius: 18,
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.03)",
      }}
    >
      <div style={{ display: "flex", fontSize: 52, fontWeight: 700, color }}>{value}</div>
      <div style={{ display: "flex", fontSize: 21, letterSpacing: 2, color: "rgba(255,255,255,0.45)" }}>
        {label}
      </div>
    </div>
  );
}

export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const played = n(searchParams.get("played"));
  const spotted = n(searchParams.get("spotted"));
  const fooled = n(searchParams.get("fooled"));

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: VOID,
          backgroundImage:
            "radial-gradient(55% 65% at 100% 0%, rgba(61,245,160,0.18), transparent), radial-gradient(55% 65% at 0% 100%, rgba(91,124,255,0.20), transparent)",
          padding: "76px",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="48" height="48" viewBox="0 0 40 40" fill="none">
            <circle
              cx="20"
              cy="20"
              r="14"
              stroke={PHOS}
              strokeWidth="2.5"
              strokeDasharray="64 24"
              transform="rotate(-34 20 20)"
            />
            <circle cx="20" cy="20" r="5" fill={PHOS} />
          </svg>
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 5, color: "rgba(255,255,255,0.55)" }}>
            OCUR · BE-AI
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 58,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 1040,
          }}
        >
          {headline(played, spotted, fooled)}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 18 }}>
            <Chip value={`${spotted}/${played}`} label="SPOTTED" color={PHOS} />
            <Chip value={String(fooled)} label="OUT-AI'D" color={CORAL} />
          </div>
          <div style={{ display: "flex", fontSize: 24, color: COBALT }}>ocur.ai/be-ai</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
