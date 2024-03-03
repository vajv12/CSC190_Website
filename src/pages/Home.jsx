import React from "react";
import { Link } from 'react-router-dom';
import BannerImage from '../assets/horse-forest.png';
import '../styles/Home.css';
import Slideshow from '../components/Slideshow';
import '../styles/Slideshow.css'



import picture1 from '../assets/sample-picture-1.jpg';
import picture2 from '../assets/sample-picture-2.jpg';
import picture3 from '../assets/sample-picture-3.jpg';


const images = [
    picture1,
    picture2,
    picture3,
];

function Home() {
    return (
        <div className="home">

            <div className="headerContainer">
                <Slideshow images={images} />
            </div>

            <div className="MiddleContainer">
            <h2>Featured Games:</h2>
            
            </div>


            <div className="BottomContainer">
            <h2>Events:</h2>
            
            </div>

        </div>
    );

}

export default Home;