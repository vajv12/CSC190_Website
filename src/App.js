import './App.css'; // CSS for styling
import AccountForm from './components/UserAuth/AccountForm'
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
function App() {
  //The Route allows for the diffrent pages to be connected to. 
  // When you make a new page and need it routed to a specific place you need to create a Route first.
  return (
    <div className="App">
      <div className="menu">
        <ul>
          <li><Button label="Button 1" onClick={handleClick} /></li>
           <li><Button label="Button 2" onClick={handleClick} /></li>
           <li><Button label="Button 3" onClick={handleClick} /></li>
           <li><Button label="Button 4" onClick={handleClick} /></li>
          <li><input type="text" placeholder="Search" /></li>
          
        <AccountForm 
          namePlaceholder="First Last" 
          emailPlaceholder="example@domain.com" 
          passwordPlaceholder="password"
          type="createAccount"
          auth={auth}
        />
        <AccountForm 
          namePlaceholder="First Last" 
          emailPlaceholder="example@domain.com" 
          passwordPlaceholder="password"
          type="signIn"
          auth={auth}
        />
        </ul>
      </div>
      <div className="content">
<img src="https://www.freecodecamp.org/news/content/images/size/w2000/2022/09/jonatan-pie-3l3RwQdHRHg-unsplash.jpg" alt="Mountain" className="image" />
      </div>

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
        <Footer />
    </div>
  );
}
  
export default App;