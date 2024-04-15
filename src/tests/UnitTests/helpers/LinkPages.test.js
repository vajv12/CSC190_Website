import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Linkpages from '../../../helpers/Linkpages';

describe('Linkpages', () => {
  // Function to setup the test environment
  const setup = () => render(
    <Router>
      <Linkpages />
    </Router>
  );

  it('renders all links with correct paths', () => {
    setup();

    // Define an array of expected links
    const links = [
      { text: 'Home', path: '/pages/Home' },
      { text: 'Product', path: '/pages/Product' },
      { text: 'Event', path: '/pages/Event' },
      { text: 'Private Rooms', path: '/pages/PrivateRooms' },
      { text: 'About', path: '/pages/About' },
      { text: 'Contact', path: '/pages/Contact' },
      { text: 'Profile', path: '/pages/Profile' },
    ];

    // Iterate over each link and assert its presence and correctness
    links.forEach(link => {
      const linkElement = screen.getByText(link.text);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement.closest('a')).toHaveAttribute('href', link.path);
    });
  });
});
