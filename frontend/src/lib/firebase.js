import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAgMVdpYjDkBgb1RGx55OvBYo4iw4KhlZk",
    authDomain: "dev-cnt.firebaseapp.com",
    projectId: "dev-cnt",
    storageBucket: "dev-cnt.firebasestorage.app",
    messagingSenderId: "712347428860",
    appId: "1:712347428860:web:2d414ce74a3213d719f479"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
