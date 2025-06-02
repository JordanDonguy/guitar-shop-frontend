import typography from "@tailwindcss/typography";

export default {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        onest: ["Onest", "sans-serif"],
      },
      screens: {
        "max-2xl": { raw: "(max-width: 1538px)" },
        "max-xl": { raw: "(max-width: 1280px)" },
        "max-lg": { raw: "(max-width: 1024px)" },
        "max-md": { raw: "(max-width: 768px)" },
        "max-sm": { raw: "(max-width: 640px)" },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [typography],
};
