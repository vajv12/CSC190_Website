import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Logo from "../assets/GEG-white-logo.png";
import '../styles/Navbar.css';
import Dropdownlocations from "../helpers/DropdownLocations.jsx";
import AccountBox from '@mui/icons-material/AccountBox';


import { useFirebase } from '../FirebaseContext';

function Navbar() {
    const { auth } = useFirebase(); // Use useFirebase hook to access auth
    const [searchTerm, setSearchTerm] = useState('');
    const [user, setUser] = useState(null); // State to hold user data

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                // User is signed in
                setUser(currentUser);
            } else {
                // User is signed out
                setUser(null);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [auth]); // Depend on auth object

    const handleSearchChange = (event) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        console.log('Search Term:', newSearchTerm);
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
                {user ? (
                    <div>Hi, {user.displayName || "User"}</div> // Display "Hi, [User Name]" if signed in
                ) : (
                    <Link to='/pages/Login'>
                        <AccountBox style={{ fontSize: '40px' }} alt="account icon" />
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Navbar;
