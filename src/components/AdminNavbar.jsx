import React from "react";
import Logo from "../assets/GEG-white.png";
import {Link}  from 'react-router-dom';
import '../styles/AdminNavbar.css';

function AdminNavbar() {

return (
    /*navbar and link */
    <div className="adminnavbar" >
        <div className="leftSide">
            {/*logo icon can traceback to home page */}
        <Link to = "pages/pages/Home">
        <img src={Logo} alt="Great Escape Games Logo"/>
        </Link>

        </div>
     {/*pages link to respective spots. uses import page on top and link images */}
        <div className="rightSide">
           <p>Admin</p>
        </div>

    </div>
);

}

export default AdminNavbar;