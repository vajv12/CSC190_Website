import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Logo from "../assets/GEG-white-logo.png";
import '../styles/Navbar.css';
import Dropdownlocations from "../helpers/DropdownLocations.jsx";
import AccountBox from '@mui/icons-material/AccountBox';
import { collection, query, where, getDocs } from 'firebase/firestore';

import { useFirebase } from '../FirebaseContext';

function Navbar() {
    const { auth, db } = useFirebase(); // Assuming db is the Firestore instance
    const [searchTerm, setSearchTerm] = useState('');
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                // Use the modular syntax for Firestore queries
                const usersRef = collection(db, 'usernames');
                const q = query(usersRef, where("userId", "==", currentUser.uid));
                getDocs(q).then((querySnapshot) => {
                    if (!querySnapshot.empty) {
                        const userDoc = querySnapshot.docs[0];
                        setIsAdmin(userDoc.data().isAdmin === true);
                    } else {
                        setIsAdmin(false);
                    }
                }).catch((error) => {
                    console.error("Error fetching user admin status:", error);
                });
            } else {
                setUser(null);
                setIsAdmin(false);
            }
        });

        return () => unsubscribe();
    }, [auth, db]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        console.log('Search Term:', event.target.value);
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
                            {isAdmin && <Link to="/admin/Admin" className="dropdown-item">Admin</Link>}
                            <Link to="/pages/MyOrders" className="dropdown-item">My Orders</Link>
                            <button onClick={handleSignOut} className="dropdown-item" style={{
                                border: 'none',
                                background: 'transparent',
                                margin: '8px',
                                boxShadow: 'none',
                                fontWeight: 'normal',
                                fontSize: '21px'
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

