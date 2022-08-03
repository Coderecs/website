import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
    apiKey: process.env.firebase_api_key,
    authDomain: "code-recs.firebaseapp.com",
    projectId: "code-recs",
    storageBucket: "code-recs.appspot.com",
    messagingSenderId: "108745587525",
    appId: process.env.firebase_app_id,
    measurementId: "G-R7B0MFT9R7",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
