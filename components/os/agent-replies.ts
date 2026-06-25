import { agents } from "./data";

/** Dummy, on-brand reply engine shared by the Desktop chat and the Terminal `ask`. */

const ROLE: Record<string, string> = Object.fromEntries(
  agents.map((a) => [a.name, a.role])
);

const VOICE: Record<string, string[]> = {
  Atlas: [
    "On it — pulling your pipeline and drafting outreach to the top accounts now.",
    "I'll qualify the new leads and book the meetings. Summary by end of day.",
    "Looking at Vantage now; I'll line up the next touch and keep the CRM clean.",
  ],
  Ledger: [
    "Reconciling now — I'll flag anything unusual before we close.",
    "I can close the books and have a clean report ready. Want me to start?",
    "Running the numbers, and checking them against policy and budget first.",
  ],
  Echo: [
    "I'm on the queue — clearing tickets and escalating only the tricky ones.",
    "I'll draft the replies and update the knowledge base so this stops recurring.",
    "Customer handled. I'll log the theme so we can fix the root cause.",
  ],
  Forge: [
    "Checking SLAs and rerouting before anything slips.",
    "I'll coordinate the vendors and keep the workflow moving.",
    "On it — provisioning now and watching the thresholds.",
  ],
  Cohort: [
    "Opening the pipeline — screening candidates and scheduling interviews.",
    "I'll handle onboarding and the paperwork end to end.",
    "On it; I'll line up interviews and send the offers for your approval.",
  ],
  Spark: [
    "Drafting the campaign and spinning up experiments to measure CAC.",
    "I'll ship a few variants and report back on payback.",
    "On it — building the launch plan now.",
  ],
};

const DOMAIN: { keys: string[]; agent: string }[] = [
  { keys: ["revenue", "sales", "deal", "pipeline", "lead", "outreach", "prospect", "crm", "quota", "forecast", "vantage"], agent: "Atlas" },
  { keys: ["finance", "book", "close", "invoice", "payroll", "spend", "budget", "reconcile", "cash", "runway", "expense", "ledger"], agent: "Ledger" },
  { keys: ["support", "ticket", "customer", "csat", "refund", "churn", "complaint"], agent: "Echo" },
  { keys: ["ops", "operation", "vendor", "sla", "workflow", "logistics", "process", "incident", "route"], agent: "Forge" },
  { keys: ["hire", "hiring", "onboard", "people", "candidate", "interview", "recruit", "offer"], agent: "Cohort" },
  { keys: ["growth", "campaign", "marketing", "launch", "content", "experiment", "seo", "ad", "brand"], agent: "Spark" },
];

const KERNEL_FALLBACK = [
  "Understood. I'll break that into a plan, route it to the right agents, and check in at each milestone.",
  "On it. I'll decompose the goal, assign the work, and surface anything that needs your approval.",
  "Got it — drafting a plan now. I'll respect your policies and budgets, and report back with a full trace.",
];

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

/** Which agent a free-text message most likely concerns (or null). */
export function detectAgent(message: string): string | null {
  const m = message.toLowerCase();
  for (const d of DOMAIN) if (d.keys.some((k) => m.includes(k))) return d.agent;
  return null;
}

/**
 * Produce a reply. `who` is an agent name (e.g. "Atlas") to speak in that
 * agent's voice, or "ocur" for the kernel (which routes by topic).
 */
export function agentReply(who: string, message: string): string {
  const seed = message.length + (message.charCodeAt(0) || 0);

  if (who && who.toLowerCase() !== "ocur") {
    const lines = VOICE[who] ?? ["On it — I'll take care of that and report back."];
    return pick(lines, seed);
  }

  const routed = detectAgent(message);
  if (routed) {
    const snippet = pick(VOICE[routed], seed);
    return `Routing to ${routed} (${ROLE[routed]}). ${snippet}`;
  }
  return pick(KERNEL_FALLBACK, seed);
}
