import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCt0bsMOh9y6ZrT9TVX6z127WbajPwYKXE",
    authDomain: "login-authentication-demo-12.firebaseapp.com",
    projectId: "login-authentication-demo-12",
    storageBucket: "login-authentication-demo-12.firebasestorage.app",
    messagingSenderId: "208216995501",
    appId: "1:208216995501:web:751d4b65cc3f58c5e0f824"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);