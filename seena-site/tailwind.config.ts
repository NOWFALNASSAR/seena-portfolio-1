import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          DEFAULT: "#04231b",
          deep: "#02140f",
          mid: "#0b3d2e",
          light: "#155e42",
        },
        gold: {
          DEFAULT: "#C9A227",
          soft: "#e8c766",
          bright: "#f2d98a",
        },
        ivory: "#F6F2E7",
      },
      fontFamily: {
        display: ["var(--font-cinzel)", "serif"],
        serif: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-poppins)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
