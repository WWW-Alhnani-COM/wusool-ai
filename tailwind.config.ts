import type { Config } from "tailwindcss";

// Wusool AI design tokens.
// Palette deliberately avoids the two common "AI site" defaults
// (cream+terracotta, or near-black+acid-green): a warm near-black paired
// with a muted brass/amber accent — signals premium + Saudi market
// without reaching for neon-blue "tech" cliches.
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
colors: {
  base: {
    DEFAULT: "#FFFFFF",
    raised: "#F7F7F5",
    line: "#E5E5E0",
  },
  ink: {
    DEFAULT: "#171717",
    muted: "#666666",
    faint: "#999999",
  },
  brass: {
    DEFAULT: "#C89B5C",
    soft: "#8A6F45",
    bright: "#D9AA6A",
  },
},
      fontFamily: {
        display: ["'IBM Plex Sans Arabic'", "'IBM Plex Sans'", "sans-serif"],
        body: ["'IBM Plex Sans Arabic'", "'IBM Plex Sans'", "sans-serif"],
      },
      maxWidth: {
        prose: "68ch",
      },
      transitionTimingFunction: {
        path: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
