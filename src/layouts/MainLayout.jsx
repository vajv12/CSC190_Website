// layout for every pages except admin
import React from 'react';
import Navbar from '../components/Navbar.jsx';

const MainLayout = ({ children }) => (
  <div>
    <Navbar />
    {children}
  </div>
);

export default MainLayout;
