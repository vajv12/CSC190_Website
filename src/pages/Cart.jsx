import React, { useState } from 'react';
import '../styles/Cart.css'; 

const Cart = () => {

  /* example of cart */
  const [items, setItems] = useState([
    { id: 1, name: 'Product Name 1', price: 19.99, quantity: 1 },
    { id: 2, name: 'Product Name 2', price: 24.99, quantity: 2 }
  ]);

  const removeItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div>

      <table>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>${item.price.toFixed(2)}</td>
              <td><input type="number" value={item.quantity} readOnly /></td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td><button onClick={() => removeItem(item.id)}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-total">
        <p>Total: ${calculateTotal()}</p>
      </div>
      <button className="checkout-button">Proceed to Checkout</button>
    </div>
  );
};

export default Cart;