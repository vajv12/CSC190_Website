import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDTmAvGOetZpKVXBDQyOG18Y8YfVOVPV3M",
  authDomain: "csc190-w.firebaseapp.com",
  databaseURL: "https://csc190-w-default-rtdb.firebaseio.com",
  projectId: "csc190-w",
  storageBucket: "csc190-w.appspot.com",
  messagingSenderId: "59153071763",
  appId: "1:59153071763:web:dbb5fd713ef03b6353d766",
  measurementId: "G-KYZHBDYFBR"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const auth = getAuth(app);


export { auth, db};