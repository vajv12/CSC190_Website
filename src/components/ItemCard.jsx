import React from 'react';
import '../styles/ItemCard.css'; // Make sure to create a corresponding CSS file
import { Link } from 'react-router-dom';

// Rating component for displaying the item rating
// import Rating from './Rating';

const ItemCard = ({ item }) => {
    const { name, description, image, itemId } = item; // Assume `itemId` is used to build the link
  
    return (
      <Link to={`/item/${itemId}`} className="itemCardLink">
        <div className="itemCard" style={{ backgroundImage: `url(${image})` }}>
          <div className="itemInfo">
            <h3 className="itemName">{name}</h3>
            <p className="itemDescription">{description}</p>
            {/* <Rating value={rating} /> */}
          </div>
        </div>
      </Link>
    );
  };

  export default ItemCard;