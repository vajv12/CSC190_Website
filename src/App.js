// src/App.js
import './App.css'; // CSS for styling
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./navbar/navbar";
import Home from './pages/Home'
import Shop from './pages/Shop'
import Contact from './components/contact/contact'
import Cart from './pages/Cart'
import Event from './pages/Event'

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/Shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path ="/event" element={<Event />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}
  
export default App;