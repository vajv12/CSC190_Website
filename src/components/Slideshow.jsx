import React, { useState, useEffect } from 'react';
import '../styles/Slideshow.css';


const Slideshow = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((currentImageIndex) => (currentImageIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentImageIndex, images.length]); // Update to include dependencies

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="slideshow">
      {images.map((image, index) => (
        <div
          key={image}
          className={`slide ${index === currentImageIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      ))}
      <button onClick={prevImage} className="slide-btn prev">&#10094;</button>
      <button onClick={nextImage} className="slide-btn next">&#10095;</button>
    </div>
  );
};

export default Slideshow;
