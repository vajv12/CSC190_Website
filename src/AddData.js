// src/AddData.js
import React, { useState } from 'react';
import firebase from './firebase'; // Import your Firebase configuration

function AddData() {
  const [inputData, setInputData] = useState('');
  
  const handleInputChange = (event) => {
    setInputData(event.target.value);
  };

  const handleAddData = () => {
    // Push the inputData to Firebase
    firebase.database().ref('entries').push({
      text: inputData,
    });
    setInputData('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter data..."
        value={inputData}
        onChange={handleInputChange}
      />
      <button onClick={handleAddData}>Add Entry</button>
    </div>
  );
}

export default AddData;
