import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Shared dark — terminal canvas + OS chrome
        void: {
          DEFAULT: "#05080A",
          900: "#070C10",
          800: "#0C1218",
          700: "#121a22",
        },
        // Desktop light surfaces
        paper: {
          DEFAULT: "#FFFFFF",
          50: "#F8F9FC",
          100: "#EFF1F6",
          200: "#E3E6EE",
          300: "#D2D7E2",
        },
        ink: {
          DEFAULT: "#14161D",
          soft: "#363A45",
          muted: "#6A7080",
          faint: "#9CA2B0",
        },
        // Desktop accent
        cobalt: {
          50: "#EEF2FF",
          100: "#DCE4FF",
          300: "#9DB1FF",
          400: "#5C7CFF",
          500: "#3358FF",
          600: "#1E3FE0",
          700: "#162FB0",
        },
        coral: { DEFAULT: "#FF5A3C", soft: "#FF8366" },
        violet: { DEFAULT: "#8B5CF6" },
        // Terminal phosphor
        phos: {
          DEFAULT: "#3DF5A0",
          bright: "#9BFFCF",
          dim: "#1E8B5B",
          deep: "#0C3D29",
        },
        gold: { DEFAULT: "#FFC24B", dim: "#9A6B12" },
      },
      fontFamily: {
        sans: ["var(--font-grotesk)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem" }],
      },
      letterSpacing: {
        tightest: "-0.05em",
      },
      borderRadius: {
        xl2: "0.875rem",
      },
      boxShadow: {
        window:
          "0 1px 0 0 rgba(255,255,255,0.6) inset, 0 30px 70px -24px rgba(20,22,40,0.45), 0 8px 24px -10px rgba(20,22,40,0.22)",
        "window-focus":
          "0 1px 0 0 rgba(255,255,255,0.7) inset, 0 44px 100px -28px rgba(20,22,40,0.55), 0 10px 28px -10px rgba(30,63,224,0.25)",
        dock: "0 16px 40px -12px rgba(10,12,30,0.5), 0 1px 0 0 rgba(255,255,255,0.5) inset",
        menubar: "0 1px 0 0 rgba(255,255,255,0.4) inset",
      },
      keyframes: {
        caret: { "0%,49%": { opacity: "1" }, "50%,100%": { opacity: "0" } },
        flicker: {
          "0%,100%": { opacity: "1" },
          "92%": { opacity: "1" },
          "94%": { opacity: "0.82" },
          "96%": { opacity: "1" },
          "98%": { opacity: "0.9" },
        },
        scan: { from: { transform: "translateY(0)" }, to: { transform: "translateY(8px)" } },
        "window-in": {
          from: { opacity: "0", transform: "scale(0.96) translateY(8px)" },
          to: { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        "dock-pop": {
          "0%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-22px)" },
          "100%": { transform: "translateY(0)" },
        },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "rise-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "power-on": {
          "0%": { opacity: "0", transform: "scaleY(0.004) scaleX(1)" },
          "35%": { opacity: "1", transform: "scaleY(0.01) scaleX(1)" },
          "55%": { transform: "scaleY(1) scaleX(1)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        caret: "caret 1.05s steps(1) infinite",
        flicker: "flicker 6s linear infinite",
        marquee: "marquee 40s linear infinite",
        float: "float 7s ease-in-out infinite",
        "spin-slow": "spin-slow 26s linear infinite",
        "window-in": "window-in 0.32s cubic-bezier(0.16,1,0.3,1) forwards",
        "dock-pop": "dock-pop 0.5s ease",
        "fade-in": "fade-in 0.4s ease forwards",
        "rise-in": "rise-in 0.5s cubic-bezier(0.16,1,0.3,1) forwards",
        "power-on": "power-on 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
