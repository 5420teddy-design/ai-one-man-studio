import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#fbf5ea",
        paper: "#fffdf8",
        ink: "#12233d",
        muted: "#5f6b7a",
        tea: "#d7ebdc",
        wheat: "#f3d9a4",
        clay: "#d98b5f",
        cyber: {
          bg: "#070B14",
          panel: "#0B1120",
          card: "rgba(15,23,42,0.85)",
          text: "#E5E7EB",
          title: "#F8FAFC",
          muted: "#94A3B8",
          blue: "#38BDF8",
          cyan: "#22D3EE",
          purple: "#A855F7"
        }
      },
      fontFamily: {
        sans: ["var(--font-noto-sans-tc)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "var(--font-noto-sans-tc)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 45px rgba(18, 35, 61, 0.08)",
        neon: "0 0 28px rgba(34, 211, 238, 0.22)",
        media: "0 24px 80px rgba(0, 0, 0, 0.32)"
      }
    }
  },
  plugins: []
};

export default config;
