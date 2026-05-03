import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Page background tones (light)
        ink: {
          DEFAULT: "#fafaf8",
          900: "#f3f2ee",
          800: "#e8e6e0",
          700: "#d4d2cb",
          600: "#b2afa6",
        },
        // Accent palette
        accent: {
          violet: "#6b4eff",
          cyan: "#00c4d9",
          peach: "#ff7a45",
          lime: "#84cc16",
        },
        // Text scale (dark → lighter)
        chrome: {
          100: "#1c1c2a",
          200: "#363652",
          300: "#5c5c78",
          400: "#8a8aa2",
          500: "#b5b5c8",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      animation: {
        "spin-slow": "spin 18s linear infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.4s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
