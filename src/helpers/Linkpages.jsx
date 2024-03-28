/*helps to link pages used in Navbar.jsx */
import React from "react";
import {Link}  from 'react-router-dom';
import  '../styles/Linkpages.css'

function Linkpages(){

    return(

        <div className="linkpages">
        <Link to ='./pages/Home'>Home</Link>
        <Link to ='./pages/Product'>Product</Link>
        <Link to ='./pages/Event'>Event</Link>
        <Link to ='./pages/PrivateRooms'>Private Rooms</Link>
        <Link to ='./pages/About'>About</Link>
        <Link to ='./pages/Contact'>Contact</Link>
        <Link to ='./pages/Profile'>Profile</Link>
    </div>

    );
}

export default Linkpages;