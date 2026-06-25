import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const title = "Ocur OS — The operating system that runs your company";
const description =
  "Ocur is an AI operating system for companies. Drive it as a graphical desktop or a living terminal — a workforce of agents runs revenue, finance, support, and operations.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ocur.ai"),
  title,
  description,
  openGraph: { title, description, type: "website", siteName: "Ocur OS" },
  twitter: { card: "summary_large_image", title, description },
  icons: {
    icon: [
      {
        url:
          "data:image/svg+xml," +
          encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%2305080A'/><circle cx='16' cy='16' r='9' fill='none' stroke='%233DF5A0' stroke-width='2.5'/><circle cx='16' cy='16' r='3' fill='%233DF5A0'/></svg>`
          ),
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#05080A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${grotesk.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
