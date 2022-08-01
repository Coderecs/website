/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: {
            poppins: ['poppins', "sans-serif"]
        },
        extend: {},
    },
    plugins: [
        require("tw-elements/dist/plugin"),
        require("tailwind-scrollbar-hide"),
    ],
};
