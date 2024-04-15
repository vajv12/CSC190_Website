import React, { useState, useEffect } from "react";
import { useFirebase } from '../FirebaseContext';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import "../styles/Product.css";

// Product Component
// Adjusted Product component to include ratings
const Product = ({ id, name, price, image, reviewsCount, averageRating }) => (
  <Link to={`/product/${id}`} className="product-link">
    <div className="product">
      <img src={image} alt={name} className="product-image" />
      <h3 className="product-name">{name}</h3>
      <div className="product-reviews">
        {/* Example way to display average rating as stars */}
        {Array.from({ length: 5 }, (_, i) => (
          <span className="star" key={i}>
            {i < averageRating ? '★' : '☆'}
          </span>
        ))}
        <span className="reviews-count">{reviewsCount} reviews</span>
      </div>
      <p className="product-price">${price} USD</p>
    </div>
  </Link>
);

// Product Page Component
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const { db } = useFirebase();

  // useEffect hook to fetch products on component mount
  useEffect(() => {
    // Function to fetch reviews for a single product
    const fetchReviewsSummary = async (productId) => {
      const reviewsCollection = collection(db, `products/${productId}/reviews`);
      const reviewSnapshot = await getDocs(reviewsCollection);

      const reviews = reviewSnapshot.docs.map(doc => doc.data());
      const reviewsCount = reviews.length;
      const averageRating = reviews.reduce((acc, { rating }) => acc + rating, 0) / reviewsCount || 0;

      return { reviewsCount, averageRating };
    };

    // Modify your fetchProducts to incorporate this
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'products');
      const productSnapshot = await getDocs(productsCollection);

      const productListPromises = productSnapshot.docs.map(async doc => {
        const productData = doc.data();
        const { reviewsCount, averageRating } = await fetchReviewsSummary(doc.id);

        return {
          id: doc.id,
          ...productData,
          reviewsCount,
          averageRating
        };
      });

      const productList = await Promise.all(productListPromises);
      setProducts(productList);
    };


    fetchProducts();
  }, [db]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filter products based on search term and selected filter
  const filteredProducts = products.filter(product => {
    return product.name.toLowerCase().includes(searchTerm) &&
      (filter === 'all' || product.category === filter);
  });

  // Render the product page
  return (
    <div className="productsPage"  data-testid="products-page">
      <h1>Products</h1>
      <input
        type="text"
        placeholder="Search Products"
        onChange={handleSearchChange}
      />
      <select onChange={handleFilterChange}>
        <option value="all">All Categories</option>
        <option value="pokemon">pokemon</option>
        <option value="warhammer">warhammer</option>
      </select>
      <div className="productsContainer">
        {filteredProducts.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;