import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
// import { getMessaging } from "firebase/messaging";


const firebaseConfig = {
    apiKey: "AIzaSyD1X1XBrcbUFLfOcwFgHfB6YoCvGaDYy7A",
    authDomain: "integrifir.firebaseapp.com",
    projectId: "integrifir",
    storageBucket: "integrifir.appspot.com",
    messagingSenderId: "348295843891",
    appId: "1:348295843891:web:a2d83b2c452aeedb229346"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Disable app verification for testing in development mode
if (process.env.NODE_ENV === 'development') {
    auth.settings.appVerificationDisabledForTesting = true;
  }
  
 
export { auth };