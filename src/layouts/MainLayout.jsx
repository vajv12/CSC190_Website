// MainLayout component
import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const MainLayout = ({ children }) => (
  <div className="main-layout">
    <Navbar />
    <div className="content-wrapper">
      {children}
    </div>
    <Footer />
  </div>
);

export default MainLayout;