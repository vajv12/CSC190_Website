import './App.css'; // CSS for styling
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { AuthProvider } from './AuthContext'; 

//**************************** Start of Firebase Initialization************************************* */
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

auth.onAuthStateChanged(function(user) {
  alert("auth state has changed");
  console.log("auth state has changed");
  console.log(user);
  // if (user) {

  //    // Updates the user attributes:

  //   user.updateProfile({ // <-- Update Method here

  //     displayName: "NEW USER NAME",
  //     photoURL: "https://example.com/jane-q-user/profile.jpg"

  //   }).then(function() {

  //     // Profile updated successfully!
  //     //  "NEW USER NAME"

  //     var displayName = user.displayName;
  //     // "https://example.com/jane-q-user/profile.jpg"
  //     var photoURL = user.photoURL;

  //   }, function(error) {
  //     // An error happened.
  //   });     

  // }
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
          <AuthProvider auth={auth}>
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
        </AuthProvider>
        <Footer />
    </div>
  );
}
  
export default App;