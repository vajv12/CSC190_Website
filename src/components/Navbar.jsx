import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Logo from "../assets/GEG-white-logo.png";
import '../styles/Navbar.css';
import Dropdownlocations from "../helpers/DropdownLocations.jsx";
import AccountBox from '@mui/icons-material/AccountBox';

import { useFirebase } from '../FirebaseContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Navbar() {
    const { auth } = useFirebase(); // Use useFirebase hook to access auth
    const [searchTerm, setSearchTerm] = useState('');
    const [user, setUser] = useState(null); // State to hold user data
    const navigate = useNavigate(); // Use the useNavigate hook


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                // User is signed in
                setUser(currentUser);
                
                navigate('/'); // Use navigate to go to the home page
            } else {
                // User is signed out
                setUser(null);
            }
        });
    
        // Cleanup subscription on component unmount
        return () => unsubscribe();
    }, [auth]); // Add 'auth' in dependency array if it's expected to change, otherwise it can be omitted
    
    

    const handleSearchChange = (event) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        console.log('Search Term:', newSearchTerm);
    };

    const handleSignOut = () => {
        auth.signOut().then(() => {
            console.log("Signed out successfully!");
            window.location.reload();
        }).catch((error) => {
            console.error("Sign out error", error);
        });
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
                    <div className="user-dropdown">
                        Hi, {user.displayName || "User"}
                        <div className="dropdown-content">
                            <Link to="/pages/Profile" className="dropdown-item">Profile</Link>
                            <Link to="/pages/MyOrders" className="dropdown-item">My Orders</Link>
                            <button onClick={handleSignOut} className="dropdown-item" style={{
                                border: 'none',
                                background: 'transparent', margin: '8px', boxShadow: 'none',
                                fontWeight: 'normal', fontSize: '21px'
                            }}>Sign Out</button>


                        </div>
                    </div>
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
