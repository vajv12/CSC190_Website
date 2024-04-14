import React, { useState, useEffect } from 'react';

import { collection, query, where, getDocs } from 'firebase/firestore';
import '../styles/Slideshow.css';

import { useFirebase } from '../FirebaseContext';
import { useNavigate } from 'react-router-dom';


function Slideshow() {
  const [slidesData, setSlidesData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const { db } = useFirebase();
  const navigate = useNavigate(); // Instantiate the useNavigate hook

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "products"), where("isSlideShow", "==", true));
      const querySnapshot = await getDocs(q);
      const slides = querySnapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().name,
        description: doc.data().description,
        imageUrl: doc.data().image,
      }));
      setSlidesData(slides);
    };

    fetchData();

    const interval = setInterval(() => {
      setActiveIndex((current) => (current === slidesData.length - 1 ? 0 : current + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [slidesData.length]);

  const formatTitle = (title) => {
    const words = title.split(' ');
    return words.length > 3 ? `${words.slice(0, 3).join(' ')}\n${words.slice(3).join(' ')}` : title;
  };

  const formatDescription = (description) => {
    const words = description.split(' ');
    return words.length > 4 ? `${words.slice(0, 4).join(' ')}...` : description;
  };

  const getSlidePosition = (index) => {
    const totalSlides = slidesData.length;
    if (index === activeIndex) return 'active';
    if ((activeIndex + 1) % totalSlides === index) return 'next';
    if ((activeIndex - 1 + totalSlides) % totalSlides === index) return 'prev';
    return 'hidden';
  };

   // Function to handle navigation
   const goToProductPage = (id) => {
    navigate(`/product/${id}`);
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
            {(getSlidePosition(index) === 'active') && (
              <div className="slide-content">
                <h2 style={{ whiteSpace: 'pre-wrap' }}>{formatTitle(slide.title)}</h2>
                <p>{formatDescription(slide.description)}</p>
                <button onClick={() => goToProductPage(slide.id)}>Learn More</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="slide-controls">
        {slidesData.map((_, idx) => (
          <span key={idx} className={`dot ${idx === activeIndex ? 'active' : ''}`} onClick={() => setActiveIndex(idx)}></span>
        ))}
      </div>
    </div>
  );
}

export default Slideshow;