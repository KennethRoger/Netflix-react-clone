import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC4wVyPWjD7jdAKrQl7VIZCS1csI8zswbw",
  authDomain: "netflix-clone-f91d0.firebaseapp.com",
  projectId: "netflix-clone-f91d0",
  storageBucket: "netflix-clone-f91d0.appspot.com",
  messagingSenderId: "66677141713",
  appId: "1:66677141713:web:0f58aa85cc6027dc8f95f0",
  measurementId: "G-0KLX9SVYXZ",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

