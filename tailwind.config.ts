import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      colors: {
        brand: {
          bg: {
            primary: "#0f172a",
            secondary: "#1e293b",
            tertiary: "#334155",
          },
          accent: {
            primary: "#6366f1",
            secondary: "#8b5cf6",
            tertiary: "#a78bfa",
          },
          text: {
            primary: "#f1f5f9",
            secondary: "#94a3b8",
            muted: "#64748b",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
