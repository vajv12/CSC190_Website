import React from 'react';
import '../styles/ItemCard.css'; 
import { Link } from 'react-router-dom';


const ItemCard = ({ item }) => {
    const { name, description, image, id } = item; 
  
    return (
      <Link to={`/product/${id}`} className="itemCardLink"> 
        <div className="itemCard" style={{ backgroundImage: `url(${image})` }}  data-testid="item-card">
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