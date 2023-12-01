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

function App() {
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