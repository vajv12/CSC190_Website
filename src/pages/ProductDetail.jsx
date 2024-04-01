import "../styles/ProductDetail.css";
import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useFirebase } from '../FirebaseContext';
import StarRating from '../components/StarRating';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState({ rating: 0, text: "" });
  const [hasReviewed, setHasReviewed] = useState(false);
  const { db, auth } = useFirebase();
  const [mainImage, setMainImage] = useState('');
  const [user, setUser] = useState(null);

  // Use the StarRating component for the rating input
  const renderStarRating = () => (
    <StarRating rating={userReview.rating} setRating={(rating) => setUserReview({ ...userReview, rating })} />
  );

  useEffect(() => {
    const fetchProductAndReviews = async () => {
      // Fetch product
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setProduct({ id: docSnap.id, ...data });
        if (data.image && data.image.length) {
          setMainImage(data.image[0]);
        }
      } else {
        console.log("No such document!");
      }

      // Fetch reviews
      const reviewsRef = collection(db, `products/${id}/reviews`);
      const reviewsSnap = await getDocs(reviewsRef);
      const reviewsList = reviewsSnap.docs.map(doc => doc.data());
      setReviews(reviewsList);

      // Check if the current user has already left a review
      if (auth.currentUser) {
        setUser(auth.currentUser);
        const userReviewQuery = query(reviewsRef, where("userId", "==", auth.currentUser.uid));
        const userReviewSnap = await getDocs(userReviewQuery);
        if (!userReviewSnap.empty) {
          setHasReviewed(true);
        }
      }
    };

    fetchProductAndReviews();
  }, [id, db, auth.currentUser]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      console.log("User not signed in");
      return;
    }


    const reviewRef = collection(db, `products/${id}/reviews`);
    await addDoc(reviewRef, {
      userId: auth.currentUser.uid,
      rating: userReview.rating,
      text: userReview.text,
      userName: auth.currentUser.displayName || "Anonymous",
      createdAt: new Date(),
    });
    setHasReviewed(true);
    // Optionally, fetch reviews again to immediately show the new review
  };

  if (!product) {
    return <div>Loading...</div>;
  }
  const handleImageClick = (imgUrl) => {
    setMainImage(imgUrl);
  };
  return (
    <div className="product-detail">
      <Link to="/pages/Product" className="back-to-products">Back to Products</Link>
      <div className="product-image-gallery">
        <img src={mainImage} alt={product.name} className="product-detail-image" />
        <div className="product-thumbnails">
          {product.image.map((image, index) => (
            <img key={index} src={image} alt={`Product ${index}`} onClick={() => handleImageClick(image)} className="product-thumbnail" />
          ))}
        </div>
      </div>
      <div className="product-info">
        <h2 className="product-detail-name">{product.name}</h2>
        <p className="product-detail-description">{product.description}</p>
        <p className="product-detail-price">${product.price} USD</p>
      </div>
      <div className="product-reviews">
        <h3>Reviews</h3>
        {reviews.map((review, index) => (
          <div key={index}>
            <p>{review.userName}: {review.text} ({review.rating} stars)</p>
          </div>
        ))}
        {!hasReviewed && user ? (
          <form onSubmit={handleSubmitReview} className="review-form">
            <div className="rating-container">
              <StarRating rating={userReview.rating} setRating={(rating) => setUserReview({ ...userReview, rating })} />
            </div>
            <div className="review-text-container">
              <textarea value={userReview.text} onChange={e => setUserReview({ ...userReview, text: e.target.value })} />
            </div>
            <button type="submit" className="submit-review-btn">Submit Review</button>
          </form>
        ) : <p>{!user ? "Sign in to leave a review." : "You have already reviewed this product."}</p>}
      </div>
    </div>
  );
};

export default ProductDetailPage;