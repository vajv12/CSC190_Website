import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/DropdownLocations.css';
const DropdownAdminProduct = () => {
    const [showDropdown, setShowDropdown] = useState(false);
  
    const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
    };
  
    return (
      <div className="dropdownlocations">
        <div className="dropdown-trigger" onClick={toggleDropdown}>
          <span className="product-title">Product</span>
        </div>
        {showDropdown && (
          <div className="dropdown-content">
            <Link to='/admin/Adproduct'>Add</Link>
            <Link to='/admin/Deleteproduct'>Delete</Link>
          </div>
        )}
      </div>
    );
  };
  
  export default DropdownAdminProduct;