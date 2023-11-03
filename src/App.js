// src/App.js
import React from 'react';
import Button from './Button';
import './App.css'; // CSS for styling



function App() {
  const handleClick = () => {
    alert('Button clicked!');
  };

 


return (
    <div className="App">
      <div className="menu">
        <ul>
          <li><Button label="Button 1" onClick={handleClick} /></li>
           <li><Button label="Button 2" onClick={handleClick} /></li>
           <li><Button label="Button 3" onClick={handleClick} /></li>
           <li><Button label="Button 4" onClick={handleClick} /></li>
          <li><input type="text" placeholder="Search" /></li>
        </ul>
      </div>
      <div className="content">
<img src="https://www.freecodecamp.org/news/content/images/size/w2000/2022/09/jonatan-pie-3l3RwQdHRHg-unsplash.jpg" alt="Mountain" className="image" />
      </div>
<div>
      <h1>My Firebase App</h1>
      <AddData />
      {/* Other components or content */}
    </div>
    </div>
  );




}

export default App;