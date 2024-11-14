import type { Config } from "tailwindcss";

const breakpoints = {
  sm: "400px",
  md: "800px",
  lg: "1000px",
  xl: "1100px",
  "2xl": "1200px",
  "3xl": "1300px",
  "4xl": "1500px",
};

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["var(--font-family-poppins)"],
        Josefin: ["var(--font-family-josefin)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: breakpoints,
    },
  },
  plugins: [],
};
export default config;
