import React, { useState, useEffect } from "react";
import { useFirebase } from '../FirebaseContext';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import "../styles/Product.css";

// Product Component
const Product = ({ id, name, price, image, reviews }) => (
   // Link component to navigate to product detail page
  <Link to={`/product/${id}`} className="product-link">
    <div className="product">
        {/* Display product image */}
      <img src={image} alt={name} className="product-image" />
       {/* Display product name */}
      <h3 className="product-name">{name}</h3>
       {/* Container for product reviews */}
      <div className="product-reviews">
         {/* Generate star icons for ratings */}
        {Array.from({ length: 5 }, (_, i) => (
          <span className="star" key={i}>&#9733;</span>
        ))}
        <span className="reviews-count">{reviews} reviews</span>
      </div>
        {/* Display product price */}
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
    const fetchProducts = async () => {
       // Reference to 'products' collection in Firestore
      const productsCollection = collection(db, 'products');
       // Snapshot of documents in the collection
      const productSnapshot = await getDocs(productsCollection);
       // Map documents to objects with id and data
      const productList = productSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
        // Update state with fetched products
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
    <div className="productsPage">
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