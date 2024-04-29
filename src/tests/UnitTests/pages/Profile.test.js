import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FirebaseContext } from '../FirebaseContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Profile from './Profile';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
}));

jest.mock('../FirebaseContext');

const mockUserData = {
  name: 'John Doe',
  profilePictureUrl: 'http://example.com/image.jpg',
  aboutMe: 'Hello, this is a bio',
  age: '30',
  reservations: [],
  tournaments: []
};

describe('Profile Component', () => {
  beforeEach(() => {
    // Set up Firebase Context
    useContextMock.mockImplementation(() => ({
      db: {}
    }));
    // Mock auth functions
    getAuth.mockReturnValue({});
    onAuthStateChanged.mockImplementation((auth, callback) => {
      const user = { uid: '123' }; // Simulate a logged-in user
      callback(user);
      return jest.fn(); // Mock the unsubscribe function
    });
    // Mock Firestore data fetching
    getDoc.mockResolvedValue({
      exists: () => true,
      data: () => mockUserData
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('loads and displays user data', async () => {
    render(
      <FirebaseContext.Provider value={{ db: {} }}>
        <Profile />
      </FirebaseContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Hello, this is a bio')).toBeInTheDocument();
      expect(screen.getByAltText('Profile')).toHaveAttribute('src', 'http://example.com/image.jpg');
    });
  });

  test('enters and exits edit mode', async () => {
    render(
      <FirebaseContext.Provider value={{ db: {} }}>
        <Profile />
      </FirebaseContext.Provider>
    );

    fireEvent.click(screen.getByText('Edit Profile'));
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Name')).toHaveValue('John Doe');
    });

    fireEvent.click(screen.getByText('Save'));
    await waitFor(() => {
      expect(setDoc).toHaveBeenCalled(); // Checks if the Firestore setDoc was called
      expect(screen.queryByPlaceholderText('Name')).toBeNull(); // After save, inputs should not be visible
    });
  });

  test('handles input changes', () => {
    render(
      <FirebaseContext.Provider value={{ db: {} }}>
        <Profile />
      </FirebaseContext.Provider>
    );

    fireEvent.click(screen.getByText('Edit Profile'));
    const nameInput = screen.getByPlaceholderText('Name');
    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    expect(nameInput).toHaveValue('Jane Doe');
  });
});
