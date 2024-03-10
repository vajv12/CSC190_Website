import "../styles/ProductDetail.css";
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { useFirebase } from '../FirebaseContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { db } = useFirebase();
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setProduct({ id: docSnap.id, ...data });
        // Directly set the main image after fetching the product
        if (data.image && data.image.length) {
          setMainImage(data.image[0]);
        }
      } else {
        console.log("No such document!");
      }
    };

    fetchProduct();
  }, [id, db]);

  const handleImageClick = (imgUrl) => {
    setMainImage(imgUrl);
  };


  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail">
      {/*temp changes to /pages/pages until bug is fixed*/}
      <Link to="/pages/Product" className="back-to-products">Back to Products</Link>
      <div className="product-image-gallery">
        <img
          src={mainImage}
          alt={product.name}
          className="product-detail-image"
        />
        <div className="product-thumbnails">
          {product.image.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product ${index}`}
              onClick={() => handleImageClick(image)}
              className="product-thumbnail"
            />
          ))}
        </div>
      </div>
      <div className="product-info">
        <h2 className="product-detail-name">{product.name}</h2>
        <p className="product-detail-description">{product.description}</p>
        <p className="product-detail-price">${product.price} USD</p>
      </div>
    </div>
  );
};

export default ProductDetailPage;