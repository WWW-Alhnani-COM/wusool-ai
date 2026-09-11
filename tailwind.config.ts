import type { Config } from "tailwindcss";

// JITHR AI — premium black / night-first design system.
// Deep black surfaces with warm brass accents.
// Arabic-first typography with a premium Saudi visual identity.

export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#050505",
          raised: "#0B0B0B",
          line: "#1D1D1D",
        },

        ink: {
          DEFAULT: "#F5F5F5",
          muted: "#A1A1A1",
          faint: "#6F6F6F",
        },

        brass: {
          DEFAULT: "#C89B5C",
          soft: "#8A6F45",
          bright: "#D9AA6A",
        },
      },

      fontFamily: {
        display: [
          "'IBM Plex Sans Arabic'",
          "'IBM Plex Sans'",
          "sans-serif",
        ],

        body: [
          "'IBM Plex Sans Arabic'",
          "'IBM Plex Sans'",
          "sans-serif",
        ],
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
