/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
    dest: "public",
    disable: process.env.NODE_ENV==='development',
});

module.exports = withPWA({
    reactStrictMode: true,
    env: {
        firebase_api_key: process.env.FIREBASE_API_KEY,
        firebase_app_id: process.env.FIREBASE_APP_ID,
    },
    images: {
        domains: [
            "lh3.googleusercontent.com",
            "avatars.githubusercontent.com",
            "cdn-userpic.codeforces.com",
        ],
    },
});
