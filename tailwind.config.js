/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        DOTBOGI: ["DOTBOGI, sans-serif"],
        Im: ["ImcreSoojin", "sans-serif"],
      },
      width: {
        128: "32rem",
        160: "40rem",
        200: "48rem",
      },
      height: {
        128: "32rem",
        160: "40rem",
        200: "48rem",
      },
      scale: {
        175: "1.75",
        200: "2.00",
      },
      colors: {
        custom: {
          light: "#D7C49E",
          dark: "#343148",
        },
      },
      animation: {
        bigBounce: "bigBounce 500ms alternate infinite ease",
      },
      keyframes: {
        bigBounce: {
          "0%": {
            top: 60,
            height: "5px",
            borderRadius: "60px 60px 20px 20px",
            transform: "scaleX(1.4)",
          },
          "35%": {
            height: "16px",
            borderRadius: "50%",
            transform: "scaleX(1)",
          },
          "100%": {
            top: 50,
          },
        },
      },
    },
  },
  plugins: [],
};
