import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        // Obsidian base — the OS surface
        ink: {
          950: "#060709",
          900: "#0A0B0E",
          850: "#0E1014",
          800: "#131520",
          750: "#181B26",
          700: "#1E212E",
          600: "#272B3A",
          500: "#363B4D",
          400: "#4A5063",
        },
        // Platinum text
        chalk: {
          DEFAULT: "#F4F5F7",
          soft: "#C9CCD4",
          muted: "#8A8F9E",
          faint: "#5C6172",
        },
        // Signature spectral accent — iris/violet
        iris: {
          50: "#F1F0FF",
          100: "#E5E3FF",
          200: "#CBC7FF",
          300: "#ABA4FF",
          400: "#8C82FF",
          500: "#7167FA",
          600: "#5A4DEB",
          700: "#473BC4",
          800: "#3A3199",
        },
        // Cool companion for data viz
        mint: {
          300: "#9BF5DE",
          400: "#5EE6C8",
          500: "#34D3AE",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.02em" }],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      maxWidth: {
        "8xl": "88rem",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(60% 60% at 50% 0%, var(--tw-gradient-stops))",
        "spectral":
          "linear-gradient(135deg, #8C82FF 0%, #7167FA 40%, #34D3AE 130%)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(124,114,255,0.18), 0 8px 40px -8px rgba(113,103,250,0.45)",
        "glow-sm": "0 0 24px -6px rgba(113,103,250,0.5)",
        lift: "0 1px 0 0 rgba(255,255,255,0.06) inset, 0 24px 48px -24px rgba(0,0,0,0.9)",
        panel:
          "0 1px 0 0 rgba(255,255,255,0.05) inset, 0 0 0 1px rgba(255,255,255,0.04), 0 32px 80px -32px rgba(0,0,0,0.95)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.92)", opacity: "0.7" },
          "70%, 100%": { transform: "scale(1.8)", opacity: "0" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "float-y": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        "pulse-ring": "pulse-ring 2.6s cubic-bezier(0.16,1,0.3,1) infinite",
        shimmer: "shimmer 2.5s infinite",
        "spin-slow": "spin-slow 24s linear infinite",
        marquee: "marquee 38s linear infinite",
        "float-y": "float-y 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
