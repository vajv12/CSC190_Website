import React from "react";
import Logo from "../assets/GEG-white.png";
import {Link}  from 'react-router-dom';
import '../styles/AdminNavbar.css';
import DropdownAdminProduct from "../helpers/DropdownAdminProduct";

function AdminNavbar() {

return (
    /*navbar and link */
    <div className="adminnavbar" >
        <div className="leftSide">
            {/*logo icon can traceback to home page */}
        <Link to = "/admin/Admin">
        <img src={Logo} alt="Great Escape Games Logo"/>
        </Link>
            <Link to ="/admin/Admin" className="admin-link">Admin</Link>
        </div>
     {/*pages link to respective spots. uses import page on top and link images */}
        <div className="rightSide">
        <DropdownAdminProduct />
        <Link to ="/pages/Home" className="admin-link">Exit</Link>

        </div>

    </div>
);

}

export default AdminNavbar;