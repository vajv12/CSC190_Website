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
import Cart from './pages/Cart.jsx';
import Locations from './pages/Locations.jsx';
import Rocklin from './pages/Rocklin.jsx';
import PrivateRooms from './pages/PrivateRooms.jsx';
import Product from './pages/Product.jsx';

;
function App() {
  //The Route allows for the diffrent pages to be connected to. 
  // When you make a new page and need it routed to a specific place you need to create a Route first.
  return (
    <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/pages/Home" element={<Home />} />
            <Route path="/pages/Shop" element={<Shop />} />
            <Route path="/pages/Contact" element={<Contact />} />
            <Route path="/pages/About" element={<About />} />
            <Route path="/pages/Admin" element={<Admin />} />
            <Route path="/pages/Login" element={<Login />} />
            <Route path="/pages/Cart" element={<Cart/>}/>
            <Route path="/pages/Locations" element={<Locations />}/>
            <Route path="/pages/Rocklin" element ={<Rocklin />}/>
            <Route path="/pages/PrivateRooms" element ={<PrivateRooms />}/>
            <Route path="/pages/Product" element ={<Product/>}/>
        
          </Routes>
        </BrowserRouter>
        <Footer />
    </div>
  );
}
  
export default App;