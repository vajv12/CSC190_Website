import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/GEG-white-logo.png";
import '../styles/Navbar.css';
import Dropdownlocations from "../helpers/DropdownLocations.jsx";
import AccountBox from '@mui/icons-material/AccountBox';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useFirebase } from '../FirebaseContext';

// Debounce function
function debounce(func, wait) {
    let timeout;

    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function Navbar() {
    const { auth, db } = useFirebase();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const debouncedSearch = debounce((nextValue) => {
        console.log("Searching for:", nextValue); // Check if this logs when typing
        setSearchTerm(nextValue);
    }, 500);



    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                setUser(currentUser);

                // Redirecting logic might be adjusted based on actual routing and requirements
                if (window.location.pathname.includes('/admin') && !isAdmin) {
                    navigate('/'); // Navigate to the home page
                }

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
    }, [auth, db, isAdmin, navigate]);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setSearchResults([]);
            return;
        }

        // Capitalize the first letter of the search term
        const formattedSearchTerm = capitalizeFirstLetter(searchTerm);

        console.log(`Firestore query for: ${formattedSearchTerm}`);

        const productsRef = collection(db, 'products');
        const q = query(productsRef, where("name", ">=", formattedSearchTerm), where("name", "<=", formattedSearchTerm + '\uf8ff'));

        getDocs(q).then(querySnapshot => {
            console.log(`Query returned ${querySnapshot.docs.length} documents`);
            const items = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setSearchResults(items);
        }).catch(error => {
            console.error("Error searching products:", error);
        });
    }, [searchTerm, db]);


    const handleSearchChange = (event) => {
        // Pass the event's value to the debounced function
        debouncedSearch(event.target.value);
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
                <div className="search-bar-container">
                    <input
                        type="search"
                        placeholder="Search..."
                        
                        onChange={handleSearchChange}
                    />
                    {searchTerm.trim() && searchResults.length > 0 && (
                        <div className="search-results-dropdown">
                            {searchResults.map((item) => (
                                // Wrap the Link component to handle the click event
                                <div
                                    key={item.id}
                                    onClick={() => {
                                        setSearchTerm('');
                                        // Programmatically navigate to prevent default Link behavior
                                        navigate(`/product/${item.id}`);
                                    }}
                                    className="search-result-item"
                                >
                                    <img src={item.image} alt={item.name} className="search-result-image" />
                                    <div className="search-result-text">
                                        <div className="search-result-name">{item.name}</div>
                                        <div className="search-result-name">Price: ${item.price}</div>
                                        <div className="search-result-description">{item.description}</div>
                                        
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
                {user ? (
                    <div className="user-dropdown">
                        Hi, {user.displayName || "User"}
                        <div className="dropdown-content">
                            <Link to="/pages/Profile" className="dropdown-item">Profile</Link>
                            {isAdmin && <Link to="/admin/Admin" className="dropdown-item">Admin</Link>}
                            <Link to="/pages/MyReservations" className="dropdown-item">My Reservations</Link>
                            <button onClick={handleSignOut} className="dropdown-item">Sign Out</button>
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
