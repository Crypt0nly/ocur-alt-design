"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Check,
  Copy,
  Linkedin,
  RefreshCw,
  Share2,
  Sparkles,
  User,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { LogoMark } from "@/components/brand/logo";
import {
  CTA_URL,
  fetchGlobalStats,
  type GlobalStats,
  type GuessResult,
  linkedInIntent,
  readScore,
  recordResult,
  type Round,
  type SessionScore,
  shareHeadline,
  shareUrl,
  startRound,
  submitGuess,
  SUGGESTED_PROMPTS,
  type Slot,
  tweetIntent,
} from "@/lib/be-ai";

type Phase = "idle" | "thinking" | "duel" | "revealing" | "result";

const EASE = [0.16, 1, 0.3, 1] as const;

export function BeAiGame({
  shared,
}: {
  shared: { played: number; spotted: number; fooled: number } | null;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [question, setQuestion] = useState("");
  const [round, setRound] = useState<Round | null>(null);
  const [offline, setOffline] = useState(false);
  const [selected, setSelected] = useState<Slot | null>(null);
  const [result, setResult] = useState<GuessResult | null>(null);
  const [score, setScore] = useState<SessionScore>({
    played: 0,
    spotted: 0,
    fooled: 0,
    streak: 0,
    bestStreak: 0,
  });
  const [stats, setStats] = useState<GlobalStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  // Synchronous re-entry guard. React state (`thinking`/`selected`) commits
  // asynchronously, so a native double-click/tap fires two handlers in the same
  // tick before `disabled` flips — this ref blocks the second one immediately,
  // preventing duplicate rounds and a double-counted session score.
  const inFlight = useRef(false);

  useEffect(() => {
    setScore(readScore());
    fetchGlobalStats().then(setStats);
  }, []);

  const ask = useCallback(async (q: string) => {
    const trimmed = q.trim();
    if (!trimmed || inFlight.current) return;
    inFlight.current = true;
    setError(null);
    setQuestion(trimmed);
    setPhase("thinking");
    const started = Date.now();
    const { round: r, offline: off } = await startRound(trimmed);
    // Let the "two minds are answering" beat breathe a little.
    const wait = Math.max(0, 700 - (Date.now() - started));
    setTimeout(() => {
      setRound(r);
      setOffline(off);
      setSelected(null);
      setResult(null);
      setPhase("duel");
      inFlight.current = false;
    }, wait);
  }, []);

  const guess = useCallback(
    async (slot: Slot) => {
      if (!round || selected || inFlight.current) return;
      inFlight.current = true;
      setSelected(slot);
      setPhase("revealing");
      try {
        const r = await submitGuess(round.roundId, slot, offline);
        setResult(r);
        setScore(recordResult(r.correct));
        if (!offline) setStats(r.stats);
        setTimeout(() => setPhase("result"), 950);
      } catch {
        setError("Ocur got camera-shy. Give that round another go.");
        setSelected(null);
        setPhase("duel");
      } finally {
        inFlight.current = false;
      }
    },
    [round, selected, offline]
  );

  const playAgain = useCallback(() => {
    inFlight.current = false;
    setPhase("idle");
    setQuestion("");
    setRound(null);
    setResult(null);
    setSelected(null);
    setError(null);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  return (
    <main className="relative h-[100dvh] overflow-y-auto bg-void text-white no-scrollbar">
      <Backdrop />
      <div className="relative z-10 flex min-h-full flex-col">
        <TopNav />

        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 pb-16 pt-6 sm:pt-10">
          {shared && phase === "idle" && <SharedBanner shared={shared} />}

          <AnimatePresence mode="wait">
            {(phase === "idle" || phase === "thinking") && (
              <motion.section
                key="hero"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex flex-1 flex-col justify-center"
              >
                <Hero
                  question={question}
                  setQuestion={setQuestion}
                  onAsk={ask}
                  thinking={phase === "thinking"}
                  stats={stats}
                  inputRef={inputRef}
                />
              </motion.section>
            )}

            {(phase === "duel" || phase === "revealing") && round && (
              <motion.section
                key="duel"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex flex-1 flex-col justify-center py-8"
              >
                <Duel
                  round={round}
                  selected={selected}
                  revealing={phase === "revealing"}
                  result={result}
                  onGuess={guess}
                  error={error}
                />
              </motion.section>
            )}

            {phase === "result" && result && (
              <motion.section
                key="result"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex flex-1 flex-col justify-center py-8"
              >
                <Result
                  question={round?.question ?? ""}
                  result={result}
                  score={score}
                  onPlayAgain={playAgain}
                />
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        <Footer />
      </div>
    </main>
  );
}

// ── Chrome ────────────────────────────────────────────────────────────────────
function TopNav() {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/5 bg-void/70 px-5 py-3 backdrop-blur-xl">
      <Link href="/" className="flex items-center gap-2 text-white transition-opacity hover:opacity-80">
        <LogoMark className="h-5 w-5 text-phos" />
        <span className="text-sm font-semibold tracking-tight">Ocur</span>
        <span className="ml-1 hidden font-mono text-2xs uppercase tracking-widest text-phos/70 sm:inline">
          / be-ai
        </span>
      </Link>
      <a
        href={CTA_URL}
        className="group flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80 transition-colors hover:border-phos/40 hover:text-white"
      >
        What&apos;s Ocur?
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </a>
    </header>
  );
}

function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(50% 40% at 15% 0%, rgba(61,245,160,0.16), transparent), radial-gradient(45% 45% at 88% 8%, rgba(91,124,255,0.18), transparent), radial-gradient(55% 50% at 80% 100%, rgba(139,92,246,0.16), transparent), radial-gradient(50% 50% at 5% 95%, rgba(255,90,60,0.12), transparent)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 mt-auto flex flex-col items-center gap-1 border-t border-white/5 px-5 py-6 text-center">
      <a
        href={CTA_URL}
        className="flex items-center gap-1.5 font-mono text-2xs uppercase tracking-widest text-white/40 transition-colors hover:text-phos"
      >
        <LogoMark className="h-3.5 w-3.5" />
        Made with Ocur
      </a>
      <p className="text-2xs text-white/25">
        The real AI is Ocur. Human answers are not Ocur — they&apos;re people doing bits.
      </p>
    </footer>
  );
}

function SharedBanner({
  shared,
}: {
  shared: { played: number; spotted: number; fooled: number };
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 rounded-xl2 border border-phos/20 bg-phos/5 px-4 py-3 text-center text-sm text-phos-soft"
    >
      Someone spotted the real AI <b className="text-phos">{shared.spotted}</b> of{" "}
      <b className="text-phos">{shared.played}</b> rounds. Think you can do better? 👇
    </motion.div>
  );
}

// ── Hero / ask ────────────────────────────────────────────────────────────────
function Hero({
  question,
  setQuestion,
  onAsk,
  thinking,
  stats,
  inputRef,
}: {
  question: string;
  setQuestion: (v: string) => void;
  onAsk: (q: string) => void;
  thinking: boolean;
  stats: GlobalStats | null;
  inputRef: React.RefObject<HTMLTextAreaElement>;
}) {
  return (
    <div>
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-2xs uppercase tracking-widest text-white/50">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-phos" />
        Reverse Turing test
      </div>

      <h1 className="text-balance text-5xl font-semibold leading-[0.95] tracking-tightest sm:text-7xl">
        Be the{" "}
        <span className="bg-gradient-to-br from-phos via-phos-bright to-cobalt-400 bg-clip-text text-transparent">
          AI
        </span>
        .
      </h1>
      <p className="mt-5 max-w-xl text-balance text-base text-white/60 sm:text-lg">
        Out-robot the robot. Ask one question and get two answers — one from{" "}
        <span className="text-white">Ocur</span>, one from a human doing a{" "}
        <span className="text-white">frankly disrespectful</span> impression of an AI. Spot the real
        machine. Fail, and a human officially out-AI&apos;d you. 🫠
      </p>

      <div className="mt-8">
        <div className="relative rounded-2xl border border-white/10 bg-void-800/80 p-2 shadow-2xl backdrop-blur transition-colors focus-within:border-phos/40">
          <textarea
            ref={inputRef}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onAsk(question);
              }
            }}
            disabled={thinking}
            rows={2}
            maxLength={280}
            placeholder="Ask anything. The weirder, the better…"
            className="w-full resize-none bg-transparent px-3 py-2 text-base text-white placeholder:text-white/30 focus:outline-none disabled:opacity-60"
          />
          <div className="flex items-center justify-between px-2 pb-1">
            <span className="font-mono text-2xs text-white/25">
              {question.length}/280 · enter to send
            </span>
            <button
              onClick={() => onAsk(question)}
              disabled={thinking || !question.trim()}
              className="group inline-flex items-center gap-2 rounded-full bg-phos px-4 py-2 text-sm font-semibold text-void transition-all hover:bg-phos-bright disabled:cursor-not-allowed disabled:opacity-40"
            >
              {thinking ? (
                <>
                  <Sparkles className="h-4 w-4 animate-spin-slow" />
                  Two minds, answering…
                </>
              ) : (
                <>
                  Deploy question
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {SUGGESTED_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => onAsk(p)}
              disabled={thinking}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/55 transition-colors hover:border-white/25 hover:text-white disabled:opacity-40"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {stats && stats.totalGuesses > 20 && (
        <p className="mt-8 font-mono text-2xs uppercase tracking-widest text-white/30">
          {stats.totalRounds.toLocaleString()} rounds played · humans have fooled{" "}
          <span className="text-coral-soft">{Math.round(stats.humanFoolRate * 100)}%</span> of
          guessers
        </p>
      )}
    </div>
  );
}

// ── Duel ──────────────────────────────────────────────────────────────────────
function Duel({
  round,
  selected,
  revealing,
  result,
  onGuess,
  error,
}: {
  round: Round;
  selected: Slot | null;
  revealing: boolean;
  result: GuessResult | null;
  onGuess: (s: Slot) => void;
  error: string | null;
}) {
  return (
    <div>
      <p className="mb-1 text-center font-mono text-2xs uppercase tracking-widest text-white/40">
        Which one is the real Ocur?
      </p>
      <h2 className="mx-auto mb-8 max-w-2xl text-balance text-center text-xl font-medium text-white/90 sm:text-2xl">
        “{round.question}”
      </h2>

      {error && (
        <p className="mb-4 text-center text-sm text-coral-soft">{error}</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {round.options.map((opt) => {
          const isAi = result ? result.aiSlot === opt.slot : false;
          const isPicked = selected === opt.slot;
          const revealedRole = result ? (isAi ? "ai" : "human") : null;
          return (
            <AnswerCard
              key={opt.slot}
              slot={opt.slot}
              text={opt.text}
              picked={isPicked}
              disabled={!!selected}
              revealedRole={revealedRole}
              dimmed={revealing && !!result && !isAi && !isPicked}
              onClick={() => onGuess(opt.slot)}
            />
          );
        })}
      </div>

      <p className="mt-6 text-center font-mono text-2xs text-white/30">
        Tap the answer you think Ocur wrote.
      </p>
    </div>
  );
}

function AnswerCard({
  slot,
  text,
  picked,
  disabled,
  revealedRole,
  dimmed,
  onClick,
}: {
  slot: Slot;
  text: string;
  picked: boolean;
  disabled: boolean;
  revealedRole: "ai" | "human" | null;
  dimmed: boolean;
  onClick: () => void;
}) {
  const border =
    revealedRole === "ai"
      ? "border-phos/60"
      : revealedRole === "human"
        ? "border-coral/50"
        : picked
          ? "border-cobalt-400"
          : "border-white/10 hover:border-white/30";
  return (
    <motion.button
      layout
      data-slot={slot}
      onClick={onClick}
      disabled={disabled}
      animate={{ opacity: dimmed ? 0.45 : 1, scale: picked && revealedRole ? 1.01 : 1 }}
      whileHover={disabled ? undefined : { y: -3 }}
      transition={{ duration: 0.3, ease: EASE }}
      className={`relative flex min-h-[180px] flex-col rounded-2xl border bg-void-800/70 p-5 text-left backdrop-blur transition-colors ${border} ${
        disabled ? "cursor-default" : "cursor-pointer"
      }`}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 font-mono text-xs font-bold text-white/70">
          {slot}
        </span>
        <AnimatePresence>
          {revealedRole && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: EASE }}
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-2xs font-bold uppercase tracking-wider ${
                revealedRole === "ai"
                  ? "bg-phos/15 text-phos"
                  : "bg-coral/15 text-coral-soft"
              }`}
            >
              {revealedRole === "ai" ? (
                <>
                  <Bot className="h-3.5 w-3.5" /> The real Ocur
                </>
              ) : (
                <>
                  <User className="h-3.5 w-3.5" /> Human · not Ocur
                </>
              )}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <p className="text-[15px] leading-relaxed text-white/85">{text}</p>
      {picked && !revealedRole && (
        <span className="mt-auto pt-3 font-mono text-2xs uppercase tracking-widest text-cobalt-300">
          Locked in…
        </span>
      )}
    </motion.button>
  );
}

// ── Result + share ────────────────────────────────────────────────────────────
function Result({
  question,
  result,
  score,
  onPlayAgain,
}: {
  question: string;
  result: GuessResult;
  score: SessionScore;
  onPlayAgain: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(() => {
    navigator.clipboard?.writeText(shareUrl(score)).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      },
      () => undefined
    );
  }, [score]);

  return (
    <div className="mx-auto w-full max-w-xl">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="text-center"
      >
        <div className="text-5xl">{result.correct ? "🎯" : "🫠"}</div>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          {result.verdict}
        </h2>
      </motion.div>

      {/* Share card */}
      <div className="mt-7 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-void-800 to-void-900 shadow-2xl">
        <div
          className="relative p-6"
          style={{
            backgroundImage:
              "radial-gradient(60% 80% at 100% 0%, rgba(61,245,160,0.14), transparent), radial-gradient(60% 80% at 0% 100%, rgba(91,124,255,0.14), transparent)",
          }}
        >
          <div className="flex items-center gap-2 text-white/70">
            <LogoMark className="h-4 w-4 text-phos" />
            <span className="font-mono text-2xs uppercase tracking-widest">
              Ocur · reverse turing test
            </span>
          </div>
          <p className="mt-4 text-lg font-medium leading-snug text-white">
            {shareHeadline(score)}
          </p>
          <div className="mt-5 flex gap-2.5">
            <Stat label="Spotted" value={`${score.spotted}/${score.played}`} tone="phos" />
            <Stat label="Out-AI'd by a human" value={String(score.fooled)} tone="coral" />
            <Stat label="Best streak" value={String(score.bestStreak)} tone="cobalt" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 border-t border-white/5 px-6 py-4">
          <a
            href={tweetIntent(score)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-void transition-transform hover:scale-[1.03]"
          >
            <Share2 className="h-4 w-4" /> Post on X
          </a>
          <a
            href={linkedInIntent(score)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white"
          >
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
          <button
            onClick={copy}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white"
          >
            {copied ? <Check className="h-4 w-4 text-phos" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied!" : "Copy link"}
          </button>
        </div>
      </div>

      {/* The conversion moment */}
      <div className="mt-5 rounded-2xl border border-phos/20 bg-phos/[0.06] p-5">
        <p className="text-sm leading-relaxed text-white/80">
          The real AI in that round was{" "}
          <span className="font-semibold text-phos">Ocur</span> — and it doesn&apos;t just chat. It
          reads your inbox, runs workflows, and actually gets things done.
        </p>
        <a
          href={CTA_URL}
          className="group mt-4 inline-flex items-center gap-2 rounded-full bg-phos px-5 py-2.5 text-sm font-semibold text-void transition-all hover:bg-phos-bright"
        >
          Try the real Ocur — free
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>

      <div className="mt-5 flex items-center justify-center">
        <button
          onClick={onPlayAgain}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-phos/40 hover:text-white"
        >
          <RefreshCw className="h-4 w-4" /> Another round
        </button>
      </div>

      <p className="mt-6 text-center text-2xs text-white/30">
        You asked: “{question}”
      </p>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "phos" | "coral" | "cobalt";
}) {
  const color =
    tone === "phos" ? "text-phos" : tone === "coral" ? "text-coral-soft" : "text-cobalt-300";
  return (
    <div className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
      <div className={`text-lg font-semibold tabular-nums ${color}`}>{value}</div>
      <div className="font-mono text-[10px] uppercase leading-tight tracking-wide text-white/40">
        {label}
      </div>
    </div>
  );
}
