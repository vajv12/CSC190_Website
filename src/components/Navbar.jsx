import React, {useState} from "react";
import Logo from "../assets/GEG-white.png";
import {Link}  from 'react-router-dom';
import '../styles/Navbar.css';
import Dropdownlocations from "../helpers/DropdownLocations.jsx";


//Icons install with npm install @mui/material @emotion/react @emotion/styled
//and npm install @mui/icons-material
import AccountBox from '@mui/icons-material/AccountBox';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import ReorderIcon from'@mui/icons-material/Reorder';

function Navbar() {

    {/* set so that button can function*/}
    const[openLinks, setOpenLinks] = useState(false);

    const toggleNavbar = () =>{
        setOpenLinks(!openLinks);
    };

    {/*dropdown for locations */}

return (
    /*navbar and link */
    <div className="navbar" >
        <div className="leftSide" id={openLinks ? "open": "close"}>
            {/*logo icon can traceback to home page */}
        <Link to ='./pages/Home'>
        <img src={Logo} alt="Great Escape Games Logo"/>
        </Link>
        <div className="hiddenLinks">
            <Link to ='./pages/Home'>Home</Link>
            <Link to ='./pages/Product'>Product</Link>

             {/* Use the Dropdown locations */}
             < Dropdownlocations />

            <Link to ='./pages/PrivateRooms'>Private Rooms</Link>
            <Link to ='./pages/About'>About</Link>
            <Link to ='./pages/Contact'>Contact</Link>
        </div>

        </div>
     {/*pages link to respective spots. uses import page on top and link images */}
        <div className="rightSide">
            <Link to ='./pages/Home'>Home</Link>
            <Link to ='./pages/Product'>Product</Link>

              {/* Use the Dropdown locations*/}
              < Dropdownlocations />
            <Link to ='./pages/PrivateRooms'>Private Rooms</Link>
            <Link to ='./pages/About'>About</Link>
            <Link to ='./pages/Contact'>Contact</Link>
            <Link to='./pages/Login'>

          <AccountBox alt="account icon" />
        </Link>
        <Link to='./pages/About'>
           <ShoppingCart  alt="shopping cart"/>
           </Link>
           
{/*When screen is small itll show the reorder button that is toggle on and off, uses hiddenlink className */}
           <button onClick={toggleNavbar}>
           <ReorderIcon />
           </button>
           
        </div>

    </div>
);

}

export default Navbar;