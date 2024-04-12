import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cart from '../../../pages/Cart'; // Adjust the path as necessary

describe('Cart Component', () => {
  it('renders the cart with initial items', () => {
    render(<Cart />);
    expect(screen.getByText('Product Name 1')).toBeInTheDocument();
    expect(screen.getByText('Product Name 2')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /remove/i })).toHaveLength(2);
  });

  it('removes an item from the cart when remove is clicked', () => {
    render(<Cart />);
    const removeButtons = screen.getAllByRole('button', { name: /remove/i });
    expect(screen.getAllByRole('row')).toHaveLength(2); // Expect 2 rows initially, one for each item
    fireEvent.click(removeButtons[0]); // Click the remove button for the first item
    expect(screen.queryByText('Product Name 1')).not.toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(1); // Expect only 1 row after one item is removed
  });

  it('calculates the total correctly', () => {
    render(<Cart />);
    expect(screen.getByText('Total: $69.97')).toBeInTheDocument();
    const removeButtons = screen.getAllByRole('button', { name: /remove/i });
    fireEvent.click(removeButtons[1]); // Remove second item
    expect(screen.getByText('Total: $19.99')).toBeInTheDocument();
  });

  it('proceed to checkout button renders', () => {
    render(<Cart />);
    expect(screen.getByRole('button', { name: /proceed to checkout/i })).toBeInTheDocument();
  });
});
