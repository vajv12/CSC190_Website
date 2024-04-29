import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { FirebaseProvider } from '../../../FirebaseContext.js'; 
import { db, auth, analytics,
  addDoc, collection, query, where, getDocs, updateDoc, serverTimestamp,
  onAuthStateChanged, sendEmailVerification } from '../../../firebaseSetup';

import { ProductPage } from '../../../pages/Product'; 

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({})),
  collection: jest.fn(),
  getDocs: jest.fn().mockResolvedValue({
    docs: [
      {
        id: '1',
        data: () => ({
          name: 'Sample Product',
          price: '20',
          image: 'url',
        }),
      },
    ],
  }),
}));

jest.mock('../../../FirebaseContext', () => ({
  useFirebase: () => ({
    db: {},
    auth: {},
  }),
}));

jest.mock('firebase/analytics', () => ({
  getAnalytics: jest.fn(),
  isSupported: jest.fn(() => Promise.resolve(false)),  
}));

describe('ProductPage Component Tests', () => {
  test('renders ProductPage component', () => {
    render(
      <FirebaseProvider
        auth={auth}
        db={db}
        isAuthenticated={false}
        username={""}
      >
        <ProductPage />
      </FirebaseProvider>
    );

    expect(screen.getByText('Products')).toBeInTheDocument();
  });

  test('allows user to enter text in search input', () => {
    render(
      <FirebaseProvider
        auth={auth}
        db={db}
        isAuthenticated={false}
        username={""}
      >
        <ProductPage />
      </FirebaseProvider>
    );

    const input = screen.getByPlaceholderText('Search Products');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');
  });

  test('select filter changes correctly', () => {
    render(
      <FirebaseProvider
        auth={auth}
        db={db}
        isAuthenticated={false}
        username={""}
      >
        <ProductPage />
      </FirebaseProvider>
    );

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'pokemon' } });
    expect(select.value).toBe('pokemon');
  });
});