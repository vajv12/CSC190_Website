//This page is for the Review box where people can enter reviews and most of the code for firebase integration is commented out for the future to integrate it.

import React, { useState } from 'react';
import './RatingPopup.css';
// import { db } from '../firebase'; // Commented out for now
// import { serverTimestamp } from 'firebase/firestore'; // Commented out for now
// import { collection, addDoc } from 'firebase/firestore'; // Commented out for now

const RatingPopup = ({ onClose }) => {
  const [store, setStore] = useState('Sacramento');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleStoreChange = (event) => {
    setStore(event.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      console.log('Submitting review:', { store, rating, review });

      // Firebase integration is commented out
      // const reviewsCollection = collection(db, 'reviews');
      // await addDoc(reviewsCollection, {
      //     store,
      //     rating,
      //     review,
      //     timestamp: serverTimestamp(),
      // });

      console.log('Review submitted successfully (simulated)');
    } catch (error) {
      console.error('Error submitting review:', error);
    }

    onClose();
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <h2>Leave a Rating and Review</h2>
        
        <label>
          Select Store:
          <select value={store} onChange={handleStoreChange}>
            <option value="Sacramento">Sacramento Store</option>
            <option value="Rocklin">Rocklin Store</option>
          </select>
        </label>
        
        <div className="rating-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <label key={star}>
              <input
                type="radio"
                name="rating"
                value={star}
                checked={rating === star}
                onChange={() => handleRatingChange(star)}
              />
              <span className={`star ${rating >= star ? 'filled' : ''}`}>&#9733;</span>
            </label>
          ))}
        </div>
        
        <label>
          Review:
          <textarea value={review} onChange={handleReviewChange} />
        </label>

        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default RatingPopup;