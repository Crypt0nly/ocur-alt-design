import type { Metadata } from "next";

import { BeAiGame } from "./be-ai-game";

const CANONICAL = "https://ocur.ai/be-ai";

const baseTitle = "Be the AI — Ocur's reverse Turing test";
const baseDescription =
  "Ask one question. Get two answers — one from Ocur, one from a human doing a frankly disrespectful impression of an AI. Spot the real machine. Fail, and a human officially out-AI'd you.";

type SearchParams = Record<string, string | string[] | undefined>;

function num(v: string | string[] | undefined): number {
  const n = Number(Array.isArray(v) ? v[0] : v);
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;
}

/**
 * Per-result share unfurls without leaking SEO equity: the canonical is always
 * the bare /be-ai URL, but a shared link carrying ?played/?spotted/?fooled gets
 * a personalized OG card + brag copy so the post looks like the player's result.
 */
export function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Metadata {
  const played = num(searchParams.played);
  const spotted = num(searchParams.spotted);
  const fooled = num(searchParams.fooled);
  const hasResult = played > 0;

  const title = hasResult
    ? `I spotted the real AI ${spotted}/${played} times — can you?`
    : baseTitle;
  const description = hasResult
    ? `My reverse Turing test score on Ocur: ${spotted} spotted, ${fooled} times fooled by a human. Think you can beat it?`
    : baseDescription;

  const images = hasResult
    ? [`/be-ai/card?played=${played}&spotted=${spotted}&fooled=${fooled}`]
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: CANONICAL },
    openGraph: {
      title,
      description,
      url: CANONICAL,
      siteName: "Ocur",
      type: "website",
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(images ? { images } : {}),
    },
  };
}

export default function BeAiPage({ searchParams }: { searchParams: SearchParams }) {
  const shared =
    num(searchParams.played) > 0
      ? {
          played: num(searchParams.played),
          spotted: num(searchParams.spotted),
          fooled: num(searchParams.fooled),
        }
      : null;

  return <BeAiGame shared={shared} />;
}
