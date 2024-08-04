const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.edge",
    "./inertia/**/*.{js,ts,jsx,tsx,vue}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};

