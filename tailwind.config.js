export default {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
    theme: {
      extend: {
        fontFamily: {
          onest: ['Onest', 'sans-serif'],
        },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [require('@tailwindcss/typography')],
  };
