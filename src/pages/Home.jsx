import React from "react";
import { Link } from 'react-router-dom';
import BannerImage from '../assets/horse-forest.png';
import '../styles/Home.css';
import Slideshow from '../components/Slideshow';
import '../styles/Slideshow.css'
import ItemCard from '../components/ItemCard'; 
import EventCard from "../components/EventCard";


import picture1 from '../assets/sample-picture-1.jpg';
import picture2 from '../assets/sample-picture-2.jpg';
import picture3 from '../assets/sample-picture-3.jpg';


const images = [
    picture1,
    picture2,
    picture3,
];


// Array of item objects
const items = [
    {
      name: 'Vintage Chair',
      description: 'A beautifully crafted vintage chair with intricate details.',
      imageUrl: 'url-to-image-vintage-chair.jpg',
      rating: 4.5,
      externalUrl: 'https://example.com/vintage-chair',
    },
    {
      name: 'Modern Lamp',
      description: 'A sleek lamp perfect for modern interiors.',
      imageUrl: 'url-to-image-modern-lamp.jpg',
      rating: 4.2,
      externalUrl: 'https://example.com/modern-lamp',
    },
    
  ];
  
  const event = {
    date: '06',
    title: 'Summer Fest',
    imageUrl: 'url-to-event-image.jpg',
    detailUrl: 'link-to-event-details',
  };

function Home() {
    return (
        <div className="home">

            <div className="headerContainer">
                <Slideshow images={images} />
            </div>

            <div className="middleContainer">
                <h2>Featured Games:</h2>
                <div className="itemsContainer">
                    {items.map((item, index) => (
                        <ItemCard key={index} item={item} />
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