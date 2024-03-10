/* used in dropdown locations used in Navbar */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/DropdownLocations.css';
const DropdownLocations = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="dropdownlocations">
      <div className="dropdown-trigger" onClick={toggleDropdown}>
        <Link to='./pages/Events'>Events</Link>
      </div>
      {showDropdown && (
        <div className="dropdown-content">
          <Link to='./pages/Sacramento'>Sacramento</Link>
          <Link to='./pages/Rocklin'>Rocklin</Link>
          <Link to='./pages/Calendar'>Calendar</Link>
        </div>
      )}
    </div>
  );
};

export default DropdownLocations;
