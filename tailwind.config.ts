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
        primaryGreen: {
          DEFAULT: "#39853D",
          light: "#3D8F41", // Tono más claro
          dark: "#357B3A", // Tono ligeramente más oscuro
        },
        customOrange: "hsl(26, 100%, 48%)",
        grey: {
          900: "hsl(192, 100%, 18%)",
          700: "hsl(0, 0%, 79%)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
