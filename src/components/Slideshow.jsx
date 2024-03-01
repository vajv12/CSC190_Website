import React, { useState, useEffect } from 'react';
import '../styles/Slideshow.css';

const Slideshow = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(currentImageIndex => (currentImageIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentImageIndex, images.length]);

  const selectSlide = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="slideshow">
      {images.map((image, index) => (
        <div key={image} className={`slide ${index === currentImageIndex ? 'active' : ''}`} style={{ backgroundImage: `url(${image})` }}>
          <div className="slide-label">Slide {index + 1}</div> {/* Label added here */}
        </div>
      ))}
      
      <div className="slide-navigation">
        {images.map((_, index) => (
          <button key={index} onClick={() => selectSlide(index)} className={`nav-button ${index === currentImageIndex ? 'active' : ''}`}></button>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
