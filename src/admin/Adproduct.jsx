import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { useFirebase } from "../FirebaseContext";
import { Link } from "react-router-dom";
import { AdminSideData } from "../helpers/AdminSideData";
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
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrls = product.image.filter(url => url.trim() !== '');
    try {
      await addDoc(collection(db, 'products'), {
        ...product,
        price: Number(product.price), // Convert price to a number
        image: imageUrls, // Store the image URLs array
        isFeatured: product.isFeatured,
      });
      alert('Product added successfully!');
      setProduct({
        name: '',
        price: '',
        category: '',
        description: '',
        image: [''],
        isFeatured: false,
      });
    } catch (error) {
      console.error("Error adding product: ", error);
      alert('Error adding product, please try again.');
    }
  };

  return (
    <>
    <div className="adminContainer">
    <div className="adminSide">
      <ul className="SidebarLeft">
        <p>Select an option to edit:</p>
        {AdminSideData.map((val, key) => (
          <li key={key} className={`row ${val.title === "logout" ? "logout" : ""}`}>
            <Link to={val.link}>
              <div id="icon">{val.icon}</div>
              <div id="title">{val.title}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
    
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
              <input
                id="productCategory"
                name="category"
                value={product.category}
                onChange={handleChange}
                required
              />
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
            <div className="form-group">
              <label className="featuredProductLabel">
                Featured Product:
                <input
                  name="isFeatured"
                  type="checkbox"
                  checked={product.isFeatured}
                  onChange={handleChange}
                />
              </label>
            </div>
            <button type="submit">Add Product</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProductForm;