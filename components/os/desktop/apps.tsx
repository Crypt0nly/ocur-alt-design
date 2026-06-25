import { ArrowRight, SquareTerminal, Check, Cpu } from "lucide-react";
import { agents, metrics, activity, pricing } from "@/components/os/data";
import { cn } from "@/lib/utils";

export function WelcomeApp({
  onTerminal,
  onAccess,
}: {
  onTerminal?: () => void;
  onAccess?: () => void;
}) {
  return (
    <div className="p-7 sm:p-8">
      <span className="font-mono text-2xs uppercase tracking-[0.2em] text-cobalt-600">
        Ocur OS · v4.0
      </span>
      <h1 className="mt-3 text-balance text-3xl font-semibold leading-[1.02] tracking-tightest text-ink sm:text-[2.6rem]">
        The company that
        <br />
        runs itself.
      </h1>
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
        Ocur is the AI operating system for companies. A workforce of agents —
        orchestrated by one kernel — runs revenue, finance, support, and
        operations end to end.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {metrics.slice(0, 3).map((m) => (
          <div
            key={m.label}
            className="rounded-xl border border-ink/10 bg-paper-50 px-3 py-2"
          >
            <p className="text-base font-semibold tracking-tight text-ink">
              {m.value}
            </p>
            <p className="text-[10px] text-ink-muted">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-2.5">
        <button
          onClick={onAccess}
          className="inline-flex items-center gap-1.5 rounded-full bg-cobalt-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-cobalt-600"
        >
          Request access
          <ArrowRight className="h-4 w-4" />
        </button>
        <button
          onClick={onTerminal}
          className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-4 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-ink/[0.04]"
        >
          <SquareTerminal className="h-4 w-4" />
          Open Terminal
        </button>
      </div>
      <p className="mt-4 font-mono text-2xs text-ink-faint">
        tip — press ⌘` to switch the whole OS between Desktop and Terminal
      </p>
    </div>
  );
}

export function AgentsApp() {
  return (
    <div className="p-2.5">
      {agents.map((a) => {
        const Icon = a.icon;
        return (
          <div
            key={a.name}
            className="flex items-center gap-3 rounded-lg px-2.5 py-2 transition-colors hover:bg-ink/[0.03]"
          >
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-ink/10 bg-paper-50 text-cobalt-600">
              <Icon className="h-4 w-4" strokeWidth={2} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm font-medium text-ink">{a.name}</span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                  {a.role}
                </span>
              </div>
              <p className="truncate text-2xs text-ink-muted">{a.task}</p>
            </div>
            <span className="font-mono text-[10px] text-ink-faint">{a.metric}</span>
            <span
              className={cn(
                "h-2 w-2 shrink-0 rounded-full",
                a.state === "active" ? "bg-emerald-500" : "bg-ink-faint"
              )}
            />
          </div>
        );
      })}
    </div>
  );
}

export function ActivityApp() {
  return (
    <div className="p-2.5">
      {activity.map((f, i) => (
        <div key={i} className="flex gap-2.5 rounded-lg px-2.5 py-2">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cobalt-500" />
          <p className="flex-1 text-xs leading-relaxed text-ink-muted">
            <span className="font-medium text-ink">{f.actor}</span> {f.text}
          </p>
          <span className="font-mono text-[10px] text-ink-faint">{f.t}</span>
        </div>
      ))}
    </div>
  );
}

function KTile({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl border border-ink/10 bg-paper-50 p-3.5">
      <p className="text-xl font-semibold tracking-tight text-ink">{value}</p>
      <p className="mt-0.5 text-[10px] text-ink-muted">{label}</p>
      <p className="mt-1 font-mono text-[10px] text-cobalt-600">{sub}</p>
    </div>
  );
}

export function KernelApp() {
  return (
    <div className="p-5">
      <div className="flex items-center gap-2 text-2xs font-medium text-ink-soft">
        <Cpu className="h-3.5 w-3.5 text-cobalt-600" />
        Kernel · healthy
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {metrics.map((m) => (
          <KTile key={m.label} label={m.label} value={m.value} sub={m.sub} />
        ))}
      </div>
      <div className="mt-3 rounded-xl border border-ink/10 bg-paper-50 p-3.5">
        <div className="flex items-center justify-between text-2xs">
          <span className="text-ink-soft">Load</span>
          <span className="font-mono text-ink-muted">42% · 1.2k tasks/min</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/10">
          <div className="h-full w-[42%] rounded-full bg-gradient-to-r from-cobalt-500 to-violet" />
        </div>
      </div>
    </div>
  );
}

export function PricingApp() {
  return (
    <div className="grid gap-3 p-5 sm:grid-cols-3">
      {pricing.map((t) => (
        <div
          key={t.name}
          className={cn(
            "rounded-xl border p-4",
            t.featured ? "border-cobalt-500/40 bg-cobalt-50" : "border-ink/10 bg-paper-50"
          )}
        >
          <p className="text-sm font-semibold text-ink">{t.name}</p>
          <p className="mt-0.5 text-2xs text-ink-muted">{t.blurb}</p>
          <p className="mt-3 text-lg font-semibold tracking-tight text-ink">{t.price}</p>
          <ul className="mt-3 space-y-1.5">
            {t.features.map((f) => (
              <li key={f} className="flex items-start gap-1.5 text-2xs text-ink-soft">
                <Check className="mt-0.5 h-3 w-3 shrink-0 text-cobalt-600" strokeWidth={2.5} />
                {f}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function AccessApp() {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold tracking-tight text-ink">
        Put your company on autopilot
      </h2>
      <p className="mt-1.5 text-sm text-ink-muted">
        We&apos;ll map your operations and stand up your first agents in under
        two weeks.
      </p>
      <form className="mt-5 space-y-2.5">
        <input
          type="email"
          placeholder="you@company.com"
          className="h-11 w-full rounded-xl border border-ink/15 bg-white px-4 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-cobalt-500"
          aria-label="Work email"
        />
        <button
          type="submit"
          className="inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-xl bg-cobalt-500 text-sm font-medium text-white transition-colors hover:bg-cobalt-600"
        >
          Request access
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
      <p className="mt-3 text-center font-mono text-2xs text-ink-faint">
        SOC 2 Type II · no credit card required
      </p>
    </div>
  );
}

export type AppId = "welcome" | "agents" | "activity" | "kernel" | "pricing" | "access";
