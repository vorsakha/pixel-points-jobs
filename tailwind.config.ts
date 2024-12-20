import daisyui from "daisyui";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0041ff",
          secondary: "#00b7ff",
          accent: "#007b40",
          neutral: "#090500",
          "base-100": "#ffff",
          info: "#0089a9",
          success: "#00da9d",
          warning: "#ff9f41",
          error: "#ff574a",
        },
      },
    ],
  },
  plugins: [daisyui],
} satisfies Config;
