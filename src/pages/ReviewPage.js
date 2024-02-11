//This Page is used for to show the reviews people have made firebase integrations are commented out for future integrations and most code are commented out until firebase integrations is made.
import React from 'react';
//import React, { useEffect, useState } from 'react';
// import { db } from '../firebase'; // Commented out for now
import './ReviewPage.css';
// import { collection, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore'; // Commented out for now

// StarRating component displays the rating as stars.
//const StarRating = ({ rating }) => {
 //   return (
  //      <div>
  //          {[...Array(5)].map((star, index) => {
  //              index += 1;
 //               return (
  //                  <span key={index} className={index <= rating ? 'filled-star' : 'empty-star'}>
  //                      {index <= rating ? '★' : '☆'}
  //                  </span>
  //              );
  //          })}
  //      </div>
  //  );
//};

// ReviewPage component displays a list of reviews.
const ReviewPage = () => {
   // const [reviews, setReviews] = useState([]); // State to store reviews

    // useEffect to fetch reviews from Firestore on component mount
    // useEffect(() => {
    //     const fetchReviews = async () => {
    //         const reviewsCollectionRef = collection(db, 'reviews');
    //         const q = query(reviewsCollectionRef, orderBy("timestamp", "desc")); // Query to order reviews by timestamp
    //         const reviewSnapshot = await getDocs(q);
    //         const reviewList = reviewSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map through documents to create a reviews list
    //         setReviews(reviewList); // Update state with the fetched reviews
    //     };

    //     fetchReviews();
    // }, []);

    // Handler for deleting a review
    // const handleDelete = async (id) => {
    //     if(window.confirm("Are you sure you want to delete this review?")) {
    //         await deleteDoc(doc(db, "reviews", id)); // Delete the review from Firestore
    //         setReviews(reviews.filter(review => review.id !== id)); // Update state by filtering out the deleted review
    //     }
    // };

    // Rendering the list of reviews
    return (
        <div className="review-page-container">
            <h1>Reviews</h1>
            <div>
                {/* Map through the reviews state to display each review */}
                {/* Placeholder content since Firebase is not integrated yet */}
                <p>No reviews to display yet.</p>
            </div>
        </div>
    );
};

export default ReviewPage;
