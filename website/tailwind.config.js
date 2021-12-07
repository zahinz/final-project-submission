module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        tertiary: "var(--tertiary)",
        my_light_gray: "var(--light_gray)",
        my_dark_gray: "var(--dark_gray)",
        my_gray: "var(--gray)",
        input_field: "var(--input_field)",
        input_placeholder: "var(--input_placeholder)",
        success_green: "var(--success_green)",
      },
      gradientColorStops: (theme) => ({
        my_dark_gray: "#270F27",
      }),
    },
    variants: {
      extend: {},
    },
    plugins: [],
  },
};
