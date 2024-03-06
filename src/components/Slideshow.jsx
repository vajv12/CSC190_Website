import React, { useState, useEffect } from 'react';
import '../styles/Slideshow.css'; // Make sure to create this CSS file

const slidesData = [
  {
    id: 1,
    title: "Slide 1",
    description: "Description for Slide 1",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/test-5ab39.appspot.com/o/MTGOTJ_EN_BndlOtrBx_1_1.png?alt=media&token=d84f3ce7-2a97-46fc-810b-24a35027fafe",
  },
  {
    id: 2,
    title: "Slide 2",
    description: "Description for Slide 2",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/test-5ab39.appspot.com/o/MTGACR_EN_BndlOtrBx_01_03.png?alt=media&token=df5f0d00-661d-4fb5-abf5-fb668d0049a9",
  },
  {
    id: 3,
    title: "Slide 3",
    description: "Description for Slide 3",
    imageUrl: "https://cdn-onslaught.mortalkombat.com/home/home-fighters.webp",
  },
  
];

function Slideshow() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current === slidesData.length - 1 ? 0 : current + 1));
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);


  // Function to compute the previous, next, and overflow slides
  const getSlidePosition = (index) => {
    const totalSlides = slidesData.length;
    if (index === activeIndex) return 'active';
    if ((activeIndex + 1) % totalSlides === index) return 'next';
    if ((activeIndex - 1 + totalSlides) % totalSlides === index) return 'prev';
    return 'hidden';
  };


  return (
    <div className="slideshow-wrapper">
      <div className="slideshow-container">
        {slidesData.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${getSlidePosition(index)}`}
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
          >
            {/* Conditional rendering for active slide content */}
            {(getSlidePosition(index) === 'active') && (
              <div className="slide-content">
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
                <button>Learn More</button>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Slide controls for navigation */}
      <div className="slide-controls">
        {slidesData.map((_, idx) => (
          <span key={idx} className={`dot ${idx === activeIndex ? 'active' : ''}`} onClick={() => setActiveIndex(idx)}></span>
        ))}
      </div>
    </div>
  );
}

export default Slideshow;