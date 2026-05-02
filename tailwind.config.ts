import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#06060a",
          900: "#0a0a12",
          800: "#11111c",
          700: "#1a1a2a",
          600: "#23233a",
        },
        accent: {
          violet: "#7c5cff",
          cyan: "#22e3ff",
          peach: "#ff9d6e",
          lime: "#c6ff5e",
        },
        chrome: {
          100: "#f5f5fa",
          200: "#d8d8e6",
          300: "#a8a8bd",
          400: "#6e6e85",
          500: "#3e3e54",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      animation: {
        "spin-slow": "spin 18s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.4s linear infinite",
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
      backgroundImage: {
        "grid-fade":
          "linear-gradient(180deg, transparent, rgba(124,92,255,0.06) 40%, transparent), radial-gradient(circle at 30% 20%, rgba(34,227,255,0.10), transparent 40%), radial-gradient(circle at 80% 70%, rgba(124,92,255,0.10), transparent 45%)",
      },
    },
  },
  plugins: [],
};

export default config;
