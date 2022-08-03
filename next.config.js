/** @type {import('next').NextConfig} */
module.exports = {
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
};
