import './App.css'; // CSS for styling
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./navbar/navbar";
import Home from './pages/Home'
import Shop from './pages/Shop'
import Contact from './components/contact/contact'
import Cart from './pages/Cart'
import Event from './pages/Event'
import AboutShop from './components/AboutShop/AboutShop';
import { MainFooter, SocialFooterSacramento, SocialFooterRocklin, RightsFooter } from './footer/footer';
import Admin from './pages/Admin';
import Create from './pages/Create';
import Signin from './pages/Signin';

function App() {
  //The Route allows for the diffrent pages to be connected to. 
  // When you make a new page and need it routed to a specific place you need to create a Route first.
  return (
    <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/Shop" element={<Shop />} />
            <Route path ="/event" element={<Event />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/AboutShop" element={<AboutShop />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/Create" element={<Create />} />
            <Route path="/Signin" element={<Signin />} />
          </Routes>
        </BrowserRouter>
       <MainFooter />
      <SocialFooterSacramento />
      <SocialFooterRocklin />
      <RightsFooter />
    </div>
  );
}
  
export default App;