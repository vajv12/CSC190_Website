import React, { useEffect, useState, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";


import '../styles/Home.css';
import Slideshow from '../components/Slideshow';
import '../styles/Slideshow.css'
import ItemCard from '../components/ItemCard';
import EventCard from "../components/EventCard";


import { FirebaseContext } from '../FirebaseContext'; 


function Home() {
    const { db } = useContext(FirebaseContext); // Destructure db from context
    const [items, setItems] = useState([]); // Initialize items state
    const [events, setEvents] = useState([]); // Initialize events state

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
                <h2>Featured Items:</h2>
                <div className="itemsContainer">
                    {items.map((item) => (
                        <ItemCard key={item.id} item={item} />
                    ))}
                </div>
            </div>

            <div className="bottomContainer">
                <h2>Events:</h2>
                {/* Render EventCard for each event */}
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    );
}

export default Home;