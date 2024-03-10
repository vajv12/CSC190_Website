import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from './layouts/MainLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import Navbar from './components/Navbar.jsx';

import Home from './pages/Home.jsx';
import Shop from './pages/Product.jsx';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';
import Admin from './admin/Admin.jsx';
import Login from './pages/LoginSignUp.jsx';
import Cart from './pages/Cart.jsx';
import Rocklin from './pages/Rocklin.jsx';
import PrivateRooms from './pages/PrivateRooms.jsx';
import Product from './pages/Product.jsx';
import Tournament from './pages/Tournament.js';
import ProductDetailPage from './pages/ProductDetail';
import { FirebaseProvider } from './FirebaseContext.js'; 
import Events from './pages/Events.jsx';
import Sacramento from './pages/Sacramento.jsx';
import Calendar from './pages/Calendar.jsx';

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
  return (
    <div className="App">
        <FirebaseProvider 
          auth={auth} 
          db={db} 
          isAuthenticated={isAuthenticated} 
          username={loggedInUser ? loggedInUser.displayName : ""}
        >
          <BrowserRouter>
            <Routes>
              {/*uses the teal color for header for all pages */}
              
              <Route path="/" exact element={
                  <MainLayout>
                    <Home />
                  </MainLayout>
                } 
              />
              <Route
                path="/pages/*"
                element={
                  <MainLayout>
                    {/* routes to pages in main */}
                    <Routes>
                      <Route path="/pages/Home" element={<Home />} />
                      <Route path="/pages/Shop" element={<Shop />} />
                      <Route path="/pages/Contact" element={<Contact />} />
                      <Route path="/pages/About" element={<About />} />
                      <Route path="/pages/Login" element={<Login />} />
                      <Route path="/pages/Cart" element={<Cart />} />
                      <Route path="/pages/Rocklin" element={<Rocklin />} />
                      <Route path="/pages/PrivateRooms" element={<PrivateRooms />} />
                      <Route path="/pages/Product" element={<Product />} />
                      <Route path="/pages/Tournament" element={<Tournament />} />
                      <Route path="/pages/Events" element={<Events/>} />
                      <Route path="/pages/Sacramento" element={<Sacramento />} />
                      <Route path="/pages/Calendar" element={<Calendar />} /> 

                    </Routes>
                  </MainLayout>
                }
              />
              {/* changes header to grey and takes nav links  to distinguish change */}
              <Route
                path="/admin/Admin"
                element={
                  <AdminLayout>
                    <Routes>
                      <Route path="/" element={<Admin />} />
                  
                    </Routes>
                  </AdminLayout>
                }
              />  
              <Route path="/product/:id" element={<MainLayout><ProductDetailPage /></MainLayout>}/>
            </Routes>
          </BrowserRouter>
        </FirebaseProvider>
      
    </div>
  );
}

export default App;