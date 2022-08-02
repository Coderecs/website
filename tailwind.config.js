/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: {
            poppins: ["poppins", "sans-serif"],
        },
        extend: {
            colors: {
                background: "#264653",
                primary: "#E9C46A",
                secondary: "#2A9D8F",
                heading: "#F4A261",
                subheading: "#E76F51",
                simple: "#000000",
            },
        },
    },
    plugins: [
        require("tw-elements/dist/plugin"),
        require("tailwind-scrollbar-hide"),
    ],
};
