import React from 'react';
import { render, screen } from '@testing-library/react';
import SacramentoEvent from '../../../pages/Sacramento';
import EventCalendar from '../../../pages/Sacramento';
import Slider from 'react-slick';

// Mock react-slick as it might use browser-specific features not supported in a Jest environment
jest.mock('react-slick', () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>, // Simplify Slider to a div for testing
}));

describe('SacramentoEvent', () => {
  it('renders the event details', () => {
    const event = { title: 'Event 1', date: '2024-02-27', time: '10:00 AM' };
    render(<SacramentoEvent event={event} />);

    expect(screen.getByText('Event 1')).toBeInTheDocument();
    expect(screen.getByText('2024-02-27')).toBeInTheDocument();
    expect(screen.getByText('10:00 AM')).toBeInTheDocument();
  });
});

describe('EventCalendar', () => {
  it('renders a carousel with event items', () => {
    render(<EventCalendar />);
    const events = [
      { title: 'Event 1', date: '2024-02-27', time: '10:00 AM' },
      { title: 'Event 2', date: '2024-02-28', time: '2:00 PM' },
    ];

    // Check if the carousel and all events are rendered
    expect(screen.getByText('Event Calendar')).toBeInTheDocument();
    events.forEach(event => {
      expect(screen.getByText(event.title)).toBeInTheDocument();
      expect(screen.getByText(event.date)).toBeInTheDocument();
      expect(screen.getByText(event.time)).toBeInTheDocument();
    });
  });
});
