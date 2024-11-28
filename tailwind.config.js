import colors from "tailwindcss/colors";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "image-hero":
          "url('https://i.pinimg.com/originals/f6/14/60/f61460f6f471a87784116f764b6aa403.jpg')",
      },
    },
    colors: {
      ...colors,
      primary: "red",
      lorem: "#0f0",
    },
    fontFamily: {
      JapanSans: ["JapanSans"],
    },
    container: {
      center: true,
      screens: {
        sm: "600px",
        md: "728px",
        lg: "986px",
        xl: "1240px",
        "2xl": "1496px",
      },
    },
  },
  plugins: [],
};
