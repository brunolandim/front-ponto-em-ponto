import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8",
        primaryDark: "#1E3A8A",
        secondary: "#F97316",
        background: "#F9FAFB", // Cor de fundo clara
        textPrimary: "#1F2937",
        textSecondary: "#6B7280",
        success: "#10B981",
        error: "#EF4444",
        foreground: "var(--foreground)",
        customGreen: "#63b698",
        customYellow: "#ffd78f",
        customPink: "#f7d4d0",
        customGray: "#23252a",
      },
    },
  },
  plugins: [],
};
export default config;
