import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useFirebase } from '../FirebaseContext'; 
import "../styles/DeleteProductPage.css";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, productName }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Delete Product</h2>
        <p>Are you sure you want to delete {productName}? This action cannot be undone.</p>
        <button onClick={onConfirm} className="confirm-button">Delete</button>
        <button onClick={onClose} className="cancel-button">Cancel</button>
      </div>
    </div>
  );
};
const DeleteProductPage = () => {
  const { db } = useFirebase();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProductName, setSelectedProductName] = useState('');

 useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productList = [];
      querySnapshot.forEach((doc) => {
        productList.push({ ...doc.data(), id: doc.id });
      });
      setProducts(productList);
    };

    fetchProducts();
  }, [db]);

  const handleDelete = async () => {
    if (!selectedProductId) return;

    const reviewsRef = collection(db, `products/${selectedProductId}/reviews`);
    const reviewsSnapshot = await getDocs(reviewsRef);
    await Promise.all(reviewsSnapshot.docs.map(review => 
      deleteDoc(doc(db, `products/${selectedProductId}/reviews`, review.id))
    ));
    
    await deleteDoc(doc(db, 'products', selectedProductId));
    setProducts(products.filter(product => product.id !== selectedProductId));
    alert('Product deleted successfully!');
    closeConfirmationModal();
  };

  const closeConfirmationModal = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
    setSelectedProductName('');
  };

  const requestDelete = (id, name) => {
    setSelectedProductId(id);
    setSelectedProductName(name);
    setIsModalOpen(true);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="delete-products-container">
      <h2 className="delete-products-header">Delete Products</h2>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      {filteredProducts.length > 0 ? (
        <ul className="products-list">
          {filteredProducts.map(product => (
            <li key={product.id} className="product-item">
              {product.name}
              <button
                className="delete-button"
                onClick={() => requestDelete(product.id, product.name)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found!</p>
      )}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeConfirmationModal}
        onConfirm={handleDelete}
        productName={selectedProductName}
      />
    </div>
  );
};

export default DeleteProductPage;
