import React, { useEffect, useState, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';


import '../styles/Home.css';
import Slideshow from '../components/Slideshow';
import '../styles/Slideshow.css'
import ItemCard from '../components/ItemCard';
import EventCard from "../components/EventCard";
import { Link } from 'react-router-dom';


import { FirebaseContext } from '../FirebaseContext';


function Home() {
    const { db } = useContext(FirebaseContext); // Destructure db from context
    const [items, setItems] = useState([]); // Initialize items state
    const [events, setEvents] = useState([]); // Initialize events state
    const navigate = useNavigate();
    useEffect(() => {
        // Fetch featured items and events from Firestore
        const fetchData = async () => {
            // Fetching items
            const itemsCollectionRef = collection(db, "products");
            const itemsData = await getDocs(itemsCollectionRef);
            setItems(itemsData.docs.map(doc => ({ ...doc.data(), id: doc.id })));

            // Fetching events
            const eventsCollectionRef = collection(db, "events"); // events are stored in a collection named "events"
            const eventsData = await getDocs(eventsCollectionRef);
            setEvents(eventsData.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };

        fetchData();
    }, [db]); // Dependency array includes db to re-run if db changes

    return (


        <div className="home">
            <div className="headerContainer">
                <Slideshow />
            </div>

            <div className="middleContainer">
                <h1>Featured Items:</h1>
                <div className="itemsContainer">
                    {items.slice(0, 10).map((item) => (
                        <ItemCard key={item.id} item={item} />
                    ))}
                </div>


                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '100%' }}>

                    <Link to='/pages/Product' style={{ textDecoration: 'none' }}>
                        <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', position: 'relative' }}>View All Products</button>
                    </Link>

                </div>


            </div>
            <div className="bottomContainer">
                <h1>Events:</h1>
                <div className="itemsContainer">
                    {/* Render EventCard for each event */}
                    {events.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative', justifyContent: 'space-evenly' }}>
                <button
                        onClick={() => navigate('/pages/Rocklin')}
                        style={{ padding: '10px 20px', fontSize: '16px', width: '25%' }}
                    >
                        View Rocklin Events
                    </button>
                    
                    <button
                        onClick={() => navigate('/pages/Sacramento')}
                        style={{ padding: '10px 20px', fontSize: '16px', width: '25%' }}
                    >
                        View Sacramento Events
                    </button>

                </div>
            </div>
        </div>
    );
}

export default Home;