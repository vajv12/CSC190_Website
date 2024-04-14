import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ItemCard from '../../../components/ItemCard'; // Update the path as per your project structure

describe('ItemCard Component', () => {
  const mockItem = {
    id: '123',
    name: 'Vintage Clock',
    description: 'A classic vintage clock perfect for home decor.',
    image: 'http://example.com/vintage-clock.jpg'
  };

  it('renders correctly with given item data', () => {
    render(
      <BrowserRouter>
        <ItemCard item={mockItem} />
      </BrowserRouter>
    );

    // Check if the component renders with a test id
    expect(screen.getByTestId('item-card')).toBeInTheDocument();

    // Check if the link navigates to the correct URL
    expect(screen.getByRole('link')).toHaveAttribute('href', '/product/123');

    // Check if the background image is correctly set
    const itemCard = screen.getByTestId('item-card');
    expect(itemCard.style.backgroundImage).toBe(`url(${mockItem.image})`);

    // Check for the presence of item name and description
    expect(screen.getByText('Vintage Clock')).toBeInTheDocument();
    expect(screen.getByText('A classic vintage clock perfect for home decor.')).toBeInTheDocument();
  });

});
