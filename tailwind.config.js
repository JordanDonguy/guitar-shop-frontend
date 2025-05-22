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
        "max-2xl": { raw: "(max-width: 1537px)" },
        "max-xl": { raw: "(max-width: 1279px)" },
        "max-lg": { raw: "(max-width: 1025px)" },
        "max-md": { raw: "(max-width: 767px)" },
        "max-sm": { raw: "(max-width: 639px)" },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [typography],
};
