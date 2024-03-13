import React, { useState } from "react";
import Logo from "../assets/GEG-white.png";
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import Dropdownlocations from "../helpers/DropdownLocations.jsx";


//Icons install with npm install @mui/material @emotion/react @emotion/styled
//and npm install @mui/icons-material
import AccountBox from '@mui/icons-material/AccountBox';
//import PaymentIcon from '@mui/icons-material/Payment';
import ReorderIcon from '@mui/icons-material/Reorder';

function Navbar() {

    //set so that button can function
    const [openLinks, setOpenLinks] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');

    const toggleNavbar = () => {
        setOpenLinks(!openLinks);
    };



    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault(); // Prevent the form from causing a page reload
        console.log('Search Term:', searchTerm);
        // Here you can redirect or fetch search results based on searchTerm
    };



    return (
        /*navbar and link */
        <div className="navbar" >
            <div className="leftSide" id={openLinks ? "open" : "close"}>
                {/*logo icon can traceback to home page */}
                <Link to='/pages/Home'>
                    <img src={Logo} alt="Great Escape Games Logo" />
                </Link>

                <div className="hiddenLinks">
                    <Link to='/pages/Home'>Home</Link>
                    <Link to='/pages/Product'>Products</Link>

                    {/* Use the Dropdown locations */}
                    < Dropdownlocations />

                    <Link to='/pages/PrivateRooms'>Private Rooms</Link>
                    <Link to='/pages/About'>About</Link>
                    <Link to='/pages/Contact'>Contact</Link>
                </div>

            </div>
            {/*pages link to respective spots. uses import page on top and link pages */}
            <div className="rightSide">
                <Link to='/pages/Home'>Home</Link>


                {/* The search bar */}
                <form onSubmit={handleSearchSubmit} style={{ display: 'inline-block' }}>
                    <input
                        type="search"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        style={{ 
                            fontSize: 14,
                            marginRight: '10px',
                            backgroundColor: 'black',
                            opacity: 0.4,
                            border: 'none',
                            outline: 'none',
                            borderRadius: 15,
                            padding: 10,
                            color: 'white'
                        }} // Styling is to moved to CSS file
                    />
                    <button type="submit">Search</button>
                </form>
                
                <Link to='/pages/Product'>Products</Link>

                {/* Use the Dropdown locations*/}
                < Dropdownlocations />

                <Link to='/pages/PrivateRooms'>Private Rooms</Link>
                <Link to='/pages/About'>About</Link>
                <Link to='/pages/Contact'>Contact</Link>
                {/* no payment needed done on the page 
                <Link to='./pages/Payment'>
                    <PaymentIcon alt="payment card" />
                </Link>
                    */}
                <Link to='/pages/Login'>
                    <AccountBox alt="account icon" />
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