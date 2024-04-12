import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { useFirebase } from "../FirebaseContext";
import "../styles/Addproduct.css";

const AddProductForm = () => {
  const { db } = useFirebase();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: [''], // Store image URLs in an array
    isFeatured: false,
    isSlideShow: false,
  });
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleChange = (e, index) => {
    const { name, value, checked, type } = e.target;
    if (name === "image") {
      const newImages = [...product.image];
      newImages[index] = value;
      setProduct(prevState => ({
        ...prevState,
        image: newImages
      }));
    } else {
      setProduct(prevState => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value
      }));
    }
  };

  const handleAddImageField = () => {
    setProduct(prevState => ({
      ...prevState,
      image: [...prevState.image, '']
    }));
  };

  const handleRemoveImageField = (index) => {
    setProduct(prevState => ({
      ...prevState,
      image: prevState.image.filter((_, i) => i !== index)
    }));
  };

   const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmationModal(true); // Show confirmation modal
  };

  const handleConfirmAdd = async () => {
    const imageUrls = product.image.filter(url => url.trim() !== '');
    try {
      await addDoc(collection(db, 'products'), {
        ...product,
        price: Number(product.price), // Convert price to a number
        image: imageUrls,
        isFeatured: product.isFeatured,
        isSlideShow: product.isSlideShow,
      });
      alert('Product added successfully!');
      setProduct({
        name: '',
        price: '',
        category: '',
        description: '',
        image: [''],
        isFeatured: false,
        isSlideShow: false,
      });
    } catch (error) {
      console.error("Error adding product: ", error);
      alert('Error adding product, please try again.');
    }
    setShowConfirmationModal(false); // Hide confirmation modal
  };

  return (  
    <div className="addProductForm">
          <h2>Adding Products to the Website</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="productName">Product Name</label>
              <input
                id="productName"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="productPrice">Price</label>
              <input
                id="productPrice"
                name="price"
                type="number"
                value={product.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="productCategory">Category</label>
              <select
                id="productCategory"
                name="category"
                value={product.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                <option value="pokemon">Pokemon</option>
                <option value="warhammmer">Warhammer</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="productDescription">Product Description</label>
              <textarea
                id="productDescription"
                name="description"
                value={product.description}
                onChange={handleChange}
                required
              />
            </div>
            {product.image.map((image, index) => (
              <div key={index} className="urlInputGroup">
                <input
                  type="text"
                  name="image"
                  value={image}
                  onChange={(e) => handleChange(e, index)}
                  placeholder={`Image URL ${index + 1}`}
                  className="urlInput"
                />
                {product.image.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveImageField(index)}
                    className="removeImageButton"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddImageField}
              className="addImageButton"
            >
              Add Another Image
            </button>
            <div className="form-group checkbox-container">
              <label htmlFor="isFeatured" className="featuredProductLabel">
                Featured Product
              </label>
                <input
                  id ="isFeatured"
                  name="isFeatured"
                  type="checkbox"
                  checked={product.isFeatured}
                  onChange={handleChange}
                />
            </div>
            <div className="form-group checkbox-container">
              <label htmlFor="isSlideShow" className="slideShowLabel">
                SlideShow Featured
              </label>
                <input
                  id ="isSlideShow"
                  name="isSlideShow"
                  type="checkbox"
                  checked={product.isSlideShow}
                  onChange={handleChange}
                />
            </div>
            <button type="submit">Add Product</button>
          </form>
          {showConfirmationModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>Confirm Product Addition</h2>
            <p>Are you sure you want to add this product?</p>
            <button onClick={handleConfirmAdd} className="confirm-button">Confirm</button>
            <button onClick={() => setShowConfirmationModal(false)} className="cancel-button">Cancel</button>
          </div>
        </div>
      )}
        </div>
  );
};

export default AddProductForm;