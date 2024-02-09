import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from './layouts/MainLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Product.jsx';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';
import Footer from './components/Footer.jsx';
import Admin from './admin/Admin.jsx';
import Login from './pages/LoginSignUp.jsx';
import Locations from './pages/Locations.jsx';
import Rocklin from './pages/Rocklin.jsx';
import PrivateRooms from './pages/PrivateRooms.jsx';
import Product from './pages/Product.jsx';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
  
          <Routes>
                  {/*uses the teal color for header for all pages */}
            <Route
              path="/pages/*"
              element={
                <MainLayout>
                  <Routes>
                    <Route path="/pages/Home" element={<Home />} />
                    <Route path="/pages/Shop" element={<Shop />} />
                    <Route path="/pages/Contact" element={<Contact />} />
                    <Route path="/pages/About" element={<About />} />
                    <Route path="/pages/Login" element={<Login />} />
                    <Route path="/pages/Locations" element={<Locations />} />
                    <Route path="/pages/Rocklin" element={<Rocklin />} />
                    <Route path="/pages/PrivateRooms" element={<PrivateRooms />} />
                    <Route path="/pages/Product" element={<Product />} />
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
          </Routes>
        </BrowserRouter>
        <Footer />
    </div>
  );
}

export default App;