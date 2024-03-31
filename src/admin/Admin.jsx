import React from "react";
import { AdminSideData } from "../helpers/AdminSideData";
import { Routes, Route, Link } from "react-router-dom";
import "../styles/Admin.css";
// Import your admin page components
import AddProductForm from "./Adproduct";
// Import other components

function Admin() {
  return (
    <div className="adminSide">
      <ul className="SidebarLeft">
        <p>Select an option to edit:</p>
        {AdminSideData.map((val, key) => (
          <li key={key} className={`row ${val.title === "logout" ? "logout" : ""}`}>
            <Link to={val.link}>
              <div id="icon">{val.icon}</div>
              <div id="title">{val.title}</div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="adminRightSide">
        {/* Define your routes here */}
        <Routes>
          <Route path="/Adproduct" element={<AddProductForm/>} />
          {/* Define other routes */}
        </Routes>
      </div>
    </div>
  );
}

export default Admin;