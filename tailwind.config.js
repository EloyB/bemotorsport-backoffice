module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        motorblue: "#0284C7",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
