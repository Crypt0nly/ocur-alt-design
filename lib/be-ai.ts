/**
 * Client for the /be-ai reverse Turing test game.
 *
 * The interactive endpoints live in the Ocur app stack and are reached
 * same-origin via the `/be-ai/api/*` reverse-proxy rule in `next.config.mjs`.
 * If the backend is unreachable (e.g. before it ships, or in a static preview),
 * every call falls back to a local mock engine that honors the exact same
 * contract, so the page is always playable.
 */

export type Slot = "A" | "B";

export interface RoundOption {
  slot: Slot;
  text: string;
}

export interface Round {
  roundId: string;
  question: string;
  options: RoundOption[];
}

export interface GlobalStats {
  totalRounds: number;
  totalGuesses: number;
  aiSpotted: number;
  humanFooledCount: number;
  humanFoolRate: number;
}

export interface GuessResult {
  correct: boolean;
  aiSlot: Slot;
  humanSlot: Slot;
  answers: Record<Slot, string>;
  verdict: string;
  stats: GlobalStats;
}

const API_BASE = "/be-ai/api";

/** Suggested prompts — deliberately absurd, to set the tone. */
export const SUGGESTED_PROMPTS = [
  "Explain love to a toaster",
  "Is cereal a soup?",
  "Write my out-of-office, but make it ominous",
  "What does the color blue taste like?",
  "Defend pineapple on pizza in one breath",
  "Pitch me on Mondays",
];

// ── Local fallback engine ─────────────────────────────────────────────────────
// Mirrors the backend's tone so the offline experience is indistinguishable.
const AI_FALLBACKS = [
  "Good question. The short version: it comes down to a few moving parts, and the highest-leverage move is usually to start small and iterate. Want me to break it into steps?",
  "Here's the practical take — there isn't one universal answer, so I'd weigh the trade-offs against what you're optimizing for and go from there.",
  "I can help with that. At a high level it depends on context, but the safest default is to handle the common case first and treat the edge cases separately.",
  "Happy to dig in. The thing most people miss is that the obvious answer and the correct answer tend to diverge once you account for second-order effects.",
  "Sure — the concise answer is yes, with caveats. Tell me a bit more about your goal and I'll tailor it precisely.",
];
const HUMAN_FALLBACKS = [
  "honestly?? this is one of those things i fully pretend to understand at parties. official AI answer: yes. 100%. do not ask follow ups.",
  "GREAT query, fellow carbon— i mean, processing… the answer is somewhere between 'definitely' and 'i would not bet my houseplants on it'.",
  "ok so. my neural networks (i have like four) say the vibe is correct but the math is doing whatever it wants today, classic.",
  "beep boop, computing… answer acquired: it's giving 'technically true but emotionally complicated'. moving on before anyone fact-checks me.",
  "i ran this through all 7 of my brain cells and the consensus is a confident shrug. next question, this is a safe space for guessing.",
  "as an extremely real artificial intelligence and definitely not a guy, i can confirm the answer is whatever makes me look smartest right now.",
];

const localRounds = new Map<string, { aiSlot: Slot; answers: Record<Slot, string> }>();

function pick<T>(bank: T[]): T {
  return bank[Math.floor(Math.random() * bank.length)];
}

function localStartRound(question: string): Round {
  const aiSlot: Slot = Math.random() < 0.5 ? "A" : "B";
  const humanSlot: Slot = aiSlot === "A" ? "B" : "A";
  const answers = {
    [aiSlot]: pick(AI_FALLBACKS),
    [humanSlot]: pick(HUMAN_FALLBACKS),
  } as Record<Slot, string>;
  const roundId = `local_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
  localRounds.set(roundId, { aiSlot, answers });
  return {
    roundId,
    question,
    options: [
      { slot: "A", text: answers.A },
      { slot: "B", text: answers.B },
    ],
  };
}

function localGuess(roundId: string, slot: Slot): GuessResult {
  const stored = localRounds.get(roundId);
  // Fall back to a coherent default if the round was lost (e.g. page reload).
  const aiSlot = stored?.aiSlot ?? "A";
  const answers = stored?.answers ?? ({ A: pick(AI_FALLBACKS), B: pick(HUMAN_FALLBACKS) } as Record<Slot, string>);
  const correct = slot === aiSlot;
  const s = readScore();
  return {
    correct,
    aiSlot,
    humanSlot: aiSlot === "A" ? "B" : "A",
    answers,
    verdict: correct ? "Nailed it — that was the real Ocur." : "Fooled. A human just out-AI'd you. 😱",
    stats: {
      totalRounds: s.played + 1,
      totalGuesses: s.played + 1,
      aiSpotted: s.spotted + (correct ? 1 : 0),
      humanFooledCount: s.fooled + (correct ? 0 : 1),
      humanFoolRate: 0.5,
    },
  };
}

// ── API ───────────────────────────────────────────────────────────────────────
export async function startRound(
  question: string
): Promise<{ round: Round; offline: boolean }> {
  try {
    const res = await fetch(`${API_BASE}/round`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ question }),
    });
    if (!res.ok) throw new Error(`round ${res.status}`);
    const round = (await res.json()) as Round;
    if (!round?.options?.length) throw new Error("malformed round");
    return { round, offline: false };
  } catch {
    return { round: localStartRound(question), offline: true };
  }
}

export async function submitGuess(
  roundId: string,
  slot: Slot,
  offline: boolean
): Promise<GuessResult> {
  if (offline || roundId.startsWith("local_")) {
    return localGuess(roundId, slot);
  }
  const res = await fetch(`${API_BASE}/guess`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ roundId, slot }),
  });
  if (!res.ok) throw new Error(`guess ${res.status}`);
  return (await res.json()) as GuessResult;
}

export async function fetchGlobalStats(): Promise<GlobalStats | null> {
  try {
    const res = await fetch(`${API_BASE}/stats`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as GlobalStats;
  } catch {
    return null;
  }
}

// ── Per-visitor session score (the brag) ──────────────────────────────────────
export interface SessionScore {
  played: number;
  spotted: number; // correctly identified the real Ocur
  fooled: number; // a human convinced you they were the AI
  streak: number;
  bestStreak: number;
}

const SCORE_KEY = "ocur-be-ai-score";

export function readScore(): SessionScore {
  if (typeof window === "undefined") {
    return { played: 0, spotted: 0, fooled: 0, streak: 0, bestStreak: 0 };
  }
  try {
    const raw = window.localStorage.getItem(SCORE_KEY);
    if (raw) return { played: 0, spotted: 0, fooled: 0, streak: 0, bestStreak: 0, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return { played: 0, spotted: 0, fooled: 0, streak: 0, bestStreak: 0 };
}

export function recordResult(correct: boolean): SessionScore {
  const prev = readScore();
  const streak = correct ? prev.streak + 1 : 0;
  const next: SessionScore = {
    played: prev.played + 1,
    spotted: prev.spotted + (correct ? 1 : 0),
    fooled: prev.fooled + (correct ? 0 : 1),
    streak,
    bestStreak: Math.max(prev.bestStreak, streak),
  };
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(SCORE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }
  return next;
}

// ── Share helpers ─────────────────────────────────────────────────────────────
const SITE = "https://ocur.ai/be-ai";

/** The one-line brag shown on the share card and prefilled into social posts. */
export function shareHeadline(score: SessionScore): string {
  if (score.played === 0) return "I'm trying to out-AI the AI on Ocur.";
  if (score.fooled === 0) {
    return `I spotted the real AI ${score.spotted}/${score.played} times. The machines can't fool me (yet).`;
  }
  if (score.spotted === 0) {
    return `A human out-AI'd me ${score.fooled}/${score.played} times. I have never been so humbled. 😱`;
  }
  return `I spotted the real AI ${score.spotted}/${score.played} times — and got fooled by a human ${score.fooled}. 🫠`;
}

/** Canonical share URL, carrying the score so the unfurl card is personalized. */
export function shareUrl(score: SessionScore): string {
  const q = new URLSearchParams({
    played: String(score.played),
    spotted: String(score.spotted),
    fooled: String(score.fooled),
  });
  return `${SITE}?${q.toString()}`;
}

export function tweetIntent(score: SessionScore): string {
  const text = `${shareHeadline(score)}\n\nCan you tell Ocur from a human pretending to be it?`;
  const q = new URLSearchParams({ text, url: shareUrl(score) });
  return `https://twitter.com/intent/tweet?${q.toString()}`;
}

export function linkedInIntent(score: SessionScore): string {
  const q = new URLSearchParams({ url: shareUrl(score) });
  return `https://www.linkedin.com/sharing/share-offsite/?${q.toString()}`;
}

/** Ocur signup / product CTA. Overridable per deployment. */
export const CTA_URL =
  process.env.NEXT_PUBLIC_OCUR_CTA_URL || "https://app.ocur.ai/?utm_source=be-ai";
