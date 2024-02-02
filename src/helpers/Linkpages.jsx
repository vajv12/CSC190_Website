import React from "react";
import {Link}  from 'react-router-dom';
import  '../styles/Linkpages.css'

function Linkpages(){

    return(

        <div className="linkpages">
        <Link to ='./pages/Home'>Home</Link>
        <Link to ='./pages/Product'>Product</Link>
        <Link to ='./pages/Locations'>Locations</Link>
        <Link to ='./pages/PrivateRooms'>Private Rooms</Link>
        <Link to ='./pages/About'>About</Link>
        <Link to ='./pages/Contact'>Contact</Link>
    </div>

    );
}

export default Linkpages;