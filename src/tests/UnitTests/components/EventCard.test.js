import React from 'react';
import { render, screen } from '@testing-library/react';
import EventCard from '../../../components/EventCard'; // Adjust the path as necessary

describe('EventCard Component', () => {
  const mockEvent = {
    date: '2024-04-14',
    name: 'Spring Festival',
    image: 'spring-festival.jpg',
    detailUrl: 'http://example.com/event-details'
  };

  it('renders correctly with given event data', () => {
    render(<EventCard event={mockEvent} />);

    // Check if the event card is in the document
    expect(screen.getByTestId('event-card')).toBeInTheDocument();

    // Check for date display
    expect(screen.getByText('2024-04-14')).toBeInTheDocument();

    // Check for name display
    expect(screen.getByText('Spring Festival')).toBeInTheDocument();

    // Check for image and alt text
    const image = screen.getByRole('img', { name: 'Spring Festival' });
    expect(image).toHaveAttribute('src', 'spring-festival.jpg');
    expect(image).toHaveAttribute('alt', 'Spring Festival');

    // Check for detail link
    const detailsButton = screen.getByRole('link', { name: 'Details' });
    expect(detailsButton).toHaveAttribute('href', 'http://example.com/event-details');
  });

});
