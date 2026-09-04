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
          DEFAULT: "#0B0C0F", // near-black, warm undertone (not pure #000)
          raised: "#15171B",
          line: "#24262B",
        },
        ink: {
          DEFAULT: "#F2EFE9", // warm off-white
          muted: "#9C978C",
          faint: "#615D54",
        },
        brass: {
          DEFAULT: "#C89B5C", // primary accent — "الوصول" / signal
          soft: "#8A6F45",
          bright: "#E3B87A",
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
