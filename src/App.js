// src/App.js
import React from 'react';
import Button from './Button';
import Menu from './Menu';

function App() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div>
      <h1>Hello, React!</h1>
      <Button label="Click Me" onClick={handleClick} />
      <Menu />
    </div>
  );
}

export default App;