import React, { useState } from "react";
import Logo from "../assets/GEG-white-logo.png";


import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import Dropdownlocations from "../helpers/DropdownLocations.jsx";
import AccountBox from '@mui/icons-material/AccountBox';
import ReorderIcon from '@mui/icons-material/Reorder';

function Navbar() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        // Trigger your search logic here
        console.log('Search Term:', newSearchTerm);
        // You might want to debounce this operation if it's expensive or makes API calls
    };

    return (
        <div className="navbar">
            <Link to='/pages/Home'>
                <img src={Logo} alt="Great Escape Games Logo" />
            </Link>
            <div className="links">
                <Link to='/pages/Home'>Home</Link>
                <Link to='/pages/Product'>Products</Link>
                <Dropdownlocations />
                <Link to='/pages/PrivateRooms'>Private Rooms</Link>
                <Link to='/pages/About'>About</Link>
                <Link to='/pages/Contact'>Contact</Link>
                <input
                    type="search"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <Link to='/pages/Login'>
                <AccountBox style={{ fontSize: '40px' }} alt="account icon" />
                </Link> 
                
            </div>
        </div>
    );
}

export default Navbar;
