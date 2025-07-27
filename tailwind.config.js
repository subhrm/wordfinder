/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "emerald", // a beautiful green/teal theme
      "dark",
      "light",
      "cupcake",
      "bumblebee",
      "synthwave",
      "dracula"
    ],
  },
}
