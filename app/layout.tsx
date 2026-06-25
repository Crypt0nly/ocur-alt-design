import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

const title = "Ocur — The AI Operating System for Companies";
const description =
  "Ocur is the agentic operating system that runs your company. A coordinated workforce of AI agents handles revenue, finance, support, and operations — orchestrated, observable, and always on.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ocur.ai"),
  title,
  description,
  keywords: [
    "AI operating system",
    "AI agents",
    "agent infrastructure",
    "autonomous company",
    "AI orchestration",
    "enterprise AI",
  ],
  authors: [{ name: "Ocur" }],
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Ocur",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: [
      {
        url:
          "data:image/svg+xml," +
          encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><circle cx='16' cy='16' r='13' fill='none' stroke='%237167FA' stroke-width='2.5'/><circle cx='16' cy='16' r='4' fill='%235EE6C8'/></svg>`
          ),
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#060709",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
