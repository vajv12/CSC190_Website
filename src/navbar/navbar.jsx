import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export const Navbar = () => {
  return (
    
    <nav className="navbar">
      <ul className="links a">
        <Link to="/Home"> Great Escape </Link>
        <Link to="/Shop"> Shop All </Link>
        <Link to="/Event"> Events </Link>
        <Link to="/AboutShop"> About Us </Link>
        <Link to="/contact"> Contact </Link>
        <Link to="/Cart"> Cart </Link>
        <Link to="/Adminsign"> Admin </Link>
      </ul>
      </nav>
  );
};
