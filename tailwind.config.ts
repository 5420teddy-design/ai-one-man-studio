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
        clay: "#d98b5f"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(18, 35, 61, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
