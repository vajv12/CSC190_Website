// src/Menu.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

function Menu() {
  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/contact">Contact</Link></li>
    </ul>
  );
}

export default Menu;