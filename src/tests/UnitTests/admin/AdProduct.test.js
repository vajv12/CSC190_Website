import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

//Firebase Imports - Can be added to all tests that have components that use firebase, 
//then just wrap the component in <FirebaseProvider></FirebaseProvider>
import { db, auth, analytics,
  addDoc, collection, query, where, getDocs, updateDoc, serverTimestamp,
  onAuthStateChanged, sendEmailVerification } from '../../../firebaseSetup';
import { FirebaseProvider } from '../../../FirebaseContext.js'; 

//Component Import
import AddProductForm from '../../../admin/AdProduct'; 

describe('AddProductForm Component', () => {
  beforeEach(() => {
    render(<FirebaseProvider 
      auth={auth} 
      db={db} 
    >
      <AddProductForm />
    </FirebaseProvider>
    );
  });

  it('renders all form fields and buttons', () => {
    expect(screen.getByLabelText('Product Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Price')).toBeInTheDocument();
    expect(screen.getByLabelText('Category')).toBeInTheDocument();
    expect(screen.getByLabelText('Product Description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Product' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Another Image' })).toBeInTheDocument();
  });

  it('allows input in the text fields', () => {
    const productNameInput = screen.getByLabelText('Product Name');
    fireEvent.change(productNameInput, { target: { value: 'New Product' } });
    expect(productNameInput.value).toBe('New Product');
  });

  it('toggles checkbox states', () => {
    const featuredCheckbox = screen.getByLabelText('Featured Product');
    fireEvent.click(featuredCheckbox);
    expect(featuredCheckbox).toBeChecked();
  });

  it('adds another image field when button is clicked', () => {
    const addImageButton = screen.getByRole('button', { name: 'Add Another Image' });
    fireEvent.click(addImageButton);
    const imageInputs = screen.getAllByPlaceholderText(/^Image URL/);
    expect(imageInputs).toHaveLength(2); // initially 1 image input, after click should be 2
  });

  it('submits the form and displays the confirmation modal', () => {
    const submitButton = screen.getByRole('button', { name: 'Add Product' });
    fireEvent.click(submitButton);
    expect(screen.getByText('Confirm Product Addition')).toBeInTheDocument();
  });
});
