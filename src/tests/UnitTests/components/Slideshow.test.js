import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Slideshow from '../../../components/Slideshow'; 

describe('Slideshow Component', () => {
  jest.useFakeTimers();

  it('renders correctly and shows the first slide as active initially', () => {
    render(<Slideshow />);
    expect(screen.getByText("Slide 1")).toBeInTheDocument();
    expect(screen.getByText("Description for Slide 1")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Learn More' })).toBeInTheDocument();
  });

  it('changes to a specific slide when a dot is clicked', () => {
    render(<Slideshow />);
    // Click on the third dot, using the aria-label to select it
    fireEvent.click(screen.getByRole('button', { name: 'Go to slide 3' }));
    expect(screen.getByText("Slide 3")).toBeInTheDocument();
    expect(screen.getByText("Description for Slide 3")).toBeInTheDocument();
  });

  // Clean up timers after each test
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
});