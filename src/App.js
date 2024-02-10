import './App.css'; // CSS for styling
import React from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Product.jsx';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';
import Footer from './components/Footer.jsx';
import Admin from './pages/Admin.jsx';
import Login from './pages/LoginSignUp.jsx';
import Locations from './pages/Locations.jsx';
import Rocklin from './pages/Rocklin.jsx';
import PrivateRooms from './pages/PrivateRooms.jsx';
import Product from './pages/Product.jsx';
import Payment from './pages/Payment.js';
import { FirebaseProvider } from './FirebaseContext.js'; 

//**************************** Start of Firebase Initialization************************************* */
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth} from "firebase/auth";
// Import the functions you need from the SDKs you nee
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
let isAuthenticated = false;
let loggedInUser;
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

//observer that gets called when user logs in or logs out
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in.
    isAuthenticated = true;
    loggedInUser = user;
  } else {
    // No user is signed in.
    isAuthenticated = false;
    loggedInUser = null;
  }
});

//**************************** End of Firebase Initialization************************************* */
const analytics = getAnalytics(app);

function App() {
  //The Route allows for the diffrent pages to be connected to. 
  // When you make a new page and need it routed to a specific place you need to create a Route first.
  return (
    <div className="App">
      <div className="content">
      </div>
        <FirebaseProvider 
          auth={auth} 
          db={db} 
          isAuthenticated={isAuthenticated} 
          username={loggedInUser ? loggedInUser.displayName : ""}
        >
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/pages/Home" element={<Home />} />
              <Route path="/pages/Shop" element={<Shop />} />
              <Route path="/pages/Contact" element={<Contact />} />
              <Route path="/pages/About" element={<About />} />
              <Route path="/pages/Admin" element={<Admin />} />
              <Route path="/pages/Login" element={<Login />} />
              <Route path="/pages/Locations" element={<Locations />}/>
              <Route path="/pages/Rocklin" element ={<Rocklin />}/>
              <Route path="/pages/PrivateRooms" element ={<PrivateRooms />}/>
              <Route path="/pages/Product" element ={<Product/>}/>
              <Route path="/pages/Payment" element ={<Payment/>}/>
            </Routes>
          </BrowserRouter>
        </FirebaseProvider>
        <Footer />
    </div>
  );
}
  
export default App;