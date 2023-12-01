import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="shop">
      </div>
      <div className="links">
        <Link to="/Home"> Home Page </Link>
        <Link to="/Shop"> Shop All </Link>
        <Link to="/Event"> Events </Link>
        <Link to="/AboutShop"> About Us </Link>
        <Link to="/Contact"> Contact </Link>
        <Link to="/Cart"> Cart </Link>
      </div>
    </div>
  );
};
