import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const process_env = import.meta.env;

const firebaseConfig = {
  apiKey: process_env.VITE_API_KEY,
  authDomain: process_env.VITE_AUTH_DOMAIN,
  projectId: process_env.VITE_PROJECT_ID,
  storageBucket: process_env.VITE_STORAGE_BUCKET,
  messagingSenderId: process_env.VITE_MESSAGING_SENDER_ID,
  appId: process_env.VITE_APP_ID,
  measurementId: process_env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app)

export const auth = getAuth(app)
