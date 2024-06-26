// firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";

const firebaseConfig = {
 apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
 authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
 projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
 storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
 messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
 appId: process.env.VUE_APP_FIREBASE_APP_ID,
 measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const emailAuthProvider = new EmailAuthProvider();

export { app, auth, googleProvider,emailAuthProvider };

