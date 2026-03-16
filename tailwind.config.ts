import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        token: {
          grey: {
            100: "var(--token-grey-100)",
            200: "var(--token-grey-200)",
            300: "var(--token-grey-300)",
            400: "var(--token-grey-400)",
            500: "var(--token-grey-500)",
            600: "var(--token-grey-600)",
            700: "var(--token-grey-700)",
            800: "var(--token-grey-800)",
            900: "var(--token-grey-900)",
          },
          primary: {
            100: "var(--token-primary-100)",
            200: "var(--token-primary-200)",
            300: "var(--token-primary-300)",
            400: "var(--token-primary-400)",
            500: "var(--token-primary-500)",
            600: "var(--token-primary-600)",
            700: "var(--token-primary-700)",
            800: "var(--token-primary-800)",
            900: "var(--token-primary-900)",
          },
          greenAccent: {
            100: "var(--token-greenAccent-100)",
            200: "var(--token-greenAccent-200)",
            300: "var(--token-greenAccent-300)",
            400: "var(--token-greenAccent-400)",
            500: "var(--token-greenAccent-500)",
            600: "var(--token-greenAccent-600)",
            700: "var(--token-greenAccent-700)",
            800: "var(--token-greenAccent-800)",
            900: "var(--token-greenAccent-900)",
          },
          redAccent: {
            100: "var(--token-redAccent-100)",
            500: "var(--token-redAccent-500)",
          },
          blueAccent: {
            500: "var(--token-blueAccent-500)",
            700: "var(--token-blueAccent-700)",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
