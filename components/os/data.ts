import {
  TrendingUp,
  Wallet,
  Headphones,
  Workflow,
  Users,
  Megaphone,
  type LucideIcon,
} from "lucide-react";

export type Agent = {
  name: string;
  role: string;
  icon: LucideIcon;
  state: "active" | "idle";
  task: string;
  metric: string;
};

export const agents: Agent[] = [
  { name: "Atlas", role: "Revenue", icon: TrendingUp, state: "active", task: "Following up — Vantage (Series B)", metric: "248 deals" },
  { name: "Ledger", role: "Finance", icon: Wallet, state: "active", task: "Reconciling May ledgers", metric: "$4.2M" },
  { name: "Echo", role: "Support", icon: Headphones, state: "active", task: "Clearing ticket backlog", metric: "142 solved" },
  { name: "Forge", role: "Operations", icon: Workflow, state: "active", task: "Rerouting EU vendor SLA", metric: "37 flows" },
  { name: "Cohort", role: "People", icon: Users, state: "idle", task: "Awaiting interview feedback", metric: "12 hires" },
  { name: "Spark", role: "Growth", icon: Megaphone, state: "active", task: "Launching EMEA campaign", metric: "18 tests" },
];

export const metrics = [
  { label: "Tasks automated · 24h", value: "1,284", sub: "+18%" },
  { label: "Human hours saved", value: "3,910", sub: "this week" },
  { label: "Operating spend / task", value: "$0.04", sub: "−38% MoM" },
  { label: "Kernel uptime", value: "99.99%", sub: "30d" },
];

export const activity: { actor: string; text: string; t: string }[] = [
  { actor: "Echo", text: "resolved 142 tickets · CSAT 4.9", t: "2m" },
  { actor: "Ledger", text: "closed May books — 0 exceptions", t: "6m" },
  { actor: "Atlas", text: "booked 3 meetings · ACME, Vantage", t: "11m" },
  { actor: "Forge", text: "predicted SLA breach → rerouted", t: "18m" },
  { actor: "Spark", text: "shipped 4 landing variants", t: "24m" },
  { actor: "Cohort", text: "onboarded 2 new hires", t: "31m" },
];

export const pricing = [
  { name: "Launch", price: "$2,400/mo", blurb: "Automate your first functions.", features: ["Up to 5 agents", "Core integrations", "Shared memory"] },
  { name: "Scale", price: "$8,900/mo", blurb: "Run the company on Ocur.", features: ["Unlimited agents", "Advanced governance", "SSO · 99.99% SLA"], featured: true },
  { name: "Enterprise", price: "Custom", blurb: "For regulated & global orgs.", features: ["Self-hosted / VPC", "Dedicated kernel", "SOC 2 · HIPAA"] },
];

export const aboutLines = [
  "Ocur is the operating system that runs your company.",
  "A workforce of AI agents — orchestrated by one kernel —",
  "handles revenue, finance, support, and operations end to end.",
  "Observable in real time. Always accountable to you.",
];

export const integrations = [
  "Slack", "Gmail", "Salesforce", "Stripe", "Snowflake",
  "GitHub", "Notion", "QuickBooks", "Linear", "Zendesk",
];
