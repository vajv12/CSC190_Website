import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyC_DFr2EkZXUQL-9Pmj5HkWb17Fv1my6LY",
  authDomain: "sign-in-up-forgot-password.firebaseapp.com",
  projectId: "sign-in-up-forgot-password",
  storageBucket: "sign-in-up-forgot-password.appspot.com",
  messagingSenderId: "133061238210",
  appId: "1:133061238210:web:5f41ca24164f597e59ca5b"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


export const auth = getAuth(app);


