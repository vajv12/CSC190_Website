import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PrivateRooms from './PrivateRooms';

jest.mock('../FirebaseContext', () => ({
  useFirebase: jest.fn(() => ({
    db: jest.fn(),
  })),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    onAuthStateChanged: jest.fn(),
  })),
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
  getDoc: jest.fn(),
  updateDoc: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(() => ({
    empty: true,
    docs: [],
  })),
  serverTimestamp: jest.fn(),
}));

describe('PrivateRooms Component', () => {
  it('renders form fields and submit button', () => {
    render(<PrivateRooms />);
    
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Location')).toBeInTheDocument();
    expect(screen.getByLabelText('Room')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reserve Now' })).toBeInTheDocument();
  });

  it('shows payment section after successful form submission', async () => {
    render(<PrivateRooms />);

    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2024-04-30' } });
    fireEvent.change(screen.getByLabelText('Location'), { target: { value: 'sacramento' } });
    fireEvent.change(screen.getByLabelText('Room'), { target: { value: 'Dragon' } });

    fireEvent.click(screen.getByRole('button', { name: 'Reserve Now' }));

    await waitFor(() => {
      expect(screen.getByText('Payment Section')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Proceed to Payment' })).toBeInTheDocument();
    });
  });
});
