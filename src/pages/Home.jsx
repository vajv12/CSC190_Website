import React, { useEffect, useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";


import '../styles/Home.css';
import Slideshow from '../components/Slideshow';
import '../styles/Slideshow.css'
import ItemCard from '../components/ItemCard'; 
import EventCard from "../components/EventCard";

import picture1 from '../assets/sample-picture-1.jpg';
import picture2 from '../assets/sample-picture-2.jpg';
import picture3 from '../assets/sample-picture-3.jpg';

import { FirebaseContext } from '../FirebaseContext'; // Import the context


const images = [
    picture1,
    picture2,
    picture3,
];

const event = {
    date: '06',
    title: 'Summer Fest',
    imageUrl: 'url-to-event-image.jpg',
    detailUrl: 'link-to-event-details',
};

function Home() {
    const { db } = useContext(FirebaseContext); // Destructure db from context
    const [items, setItems] = useState([]); // Initialize items state

    useEffect(() => {
        // Fetch featured items from Firestore
        const fetchItems = async () => {
            const itemsCollectionRef = collection(db, "products"); // Assume your items are stored in a collection named "items"
            const data = await getDocs(itemsCollectionRef);
            setItems(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };

        fetchItems();
    }, [db]); // Empty dependency array means this effect runs once on mount

    return (
        <div className="home">

            <div className="headerContainer">
                <Slideshow images={images} />
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
                <EventCard event={event} />
            </div>

        </div>
    );
}

export default Home;
