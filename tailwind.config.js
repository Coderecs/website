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
                background: "#32823B",
                primary: "#355389",
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
