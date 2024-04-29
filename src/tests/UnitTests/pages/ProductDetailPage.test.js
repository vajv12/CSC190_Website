import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ProductDetailPage from './ProductDetailPage';
import { useFirebase } from '../FirebaseContext';
import * as Firestore from 'firebase/firestore';

// Mock Firebase and Router
jest.mock('../FirebaseContext', () => ({
  useFirebase: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

const mockGetDoc = jest.spyOn(Firestore, 'getDoc');
const mockGetDocs = jest.spyOn(Firestore, 'getDocs');
const mockAddDoc = jest.spyOn(Firestore, 'addDoc');

const productData = {
  id: '1',
  name: 'Sample Product',
  price: '20',
  description: 'Sample Description',
  image: ['url1.jpg', 'url2.jpg']
};

const reviewsData = [
  { userId: 'user1', rating: 5, text: 'Great!', userName: 'John' }
];

beforeEach(() => {
  useParams.mockReturnValue({ id: '1' });
  useFirebase.mockReturnValue({
    db: {}, // Provide necessary mock database object
    auth: { currentUser: { uid: 'user1', displayName: 'John' } }
  });
  mockGetDoc.mockResolvedValue({ exists: () => true, data: () => productData });
  mockGetDocs.mockResolvedValue({ docs: reviewsData.map(data => ({ data: () => data })) });
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders product details and reviews', async () => {
  render(
    <BrowserRouter>
      <ProductDetailPage />
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('Sample Product')).toBeInTheDocument();
    expect(screen.getByText('Sample Description')).toBeInTheDocument();
    expect(screen.getByText('20 USD')).toBeInTheDocument();
    expect(screen.getByText('Great!')).toBeInTheDocument();
  });
});

test('submits a new review', async () => {
  render(
    <BrowserRouter>
      <ProductDetailPage />
    </BrowserRouter>
  );

  const reviewTextarea = screen.getByRole('textbox');
  fireEvent.change(reviewTextarea, { target: { value: 'Nice product!' } });
  fireEvent.click(screen.getByRole('button', { name: 'Submit Review' }));

  await waitFor(() => {
    expect(mockAddDoc).toHaveBeenCalledWith(expect.anything(), {
      userId: 'user1',
      rating: 0, // Assumes default rating before interaction with StarRating
      text: 'Nice product!',
      userName: 'John',
      createdAt: expect.any(Date),
    });
  });
});

test('shows message when user has already reviewed', async () => {
  mockGetDocs.mockResolvedValueOnce({ docs: [{ data: () => ({ userId: 'user1', rating: 5, text: 'Great!', userName: 'John' }) }] });

  render(
    <BrowserRouter>
      <ProductDetailPage />
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('You have already reviewed this product.')).toBeInTheDocument();
  });
});

test('displays a loading message when product data is not available', async () => {
  mockGetDoc.mockResolvedValueOnce({ exists: () => false });

  render(
    <BrowserRouter>
      <ProductDetailPage />
    </BrowserRouter>
  );

  expect(screen.getByText('Loading...')).toBeInTheDocument();
});
