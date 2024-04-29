import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SacramentoEvent from './SacramentoEvent';

const mockEvent = {
  id: '1',
  title: 'Test Event',
  date: '2024-05-01',
  description: 'This is a test event',
  location: 'Sacramento',
  price: 10,
  image: 'test-image.jpg',
  stripeLink: 'https://example.com/checkout'
};

jest.mock('../FirebaseContext', () => ({
  useFirebase: () => ({
    db: jest.fn()
  })
}));

describe('SacramentoEvent Component', () => {
  it('renders event information correctly', () => {
    render(<SacramentoEvent event={mockEvent} />);
    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText('Date: 2024-05-01')).toBeInTheDocument();
    expect(screen.getByText('Description: This is a test event')).toBeInTheDocument();
    expect(screen.getByText('Location: Sacramento')).toBeInTheDocument();
    expect(screen.getByText('Price: 10')).toBeInTheDocument();
    expect(screen.getByAltText('Test Event')).toBeInTheDocument();
  });

  it('renders sign up button initially', () => {
    render(<SacramentoEvent event={mockEvent} />);
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });
});
