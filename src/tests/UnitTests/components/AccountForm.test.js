//Default Testing Imports - Can be added to all tests
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

//Firebase Imports - Can be added to all tests that have components that use firebase, 
//then just wrap the component in <FirebaseProvider></FirebaseProvider>
import { db, auth, analytics,
  addDoc, collection, query, where, getDocs, updateDoc, serverTimestamp,
  onAuthStateChanged, sendEmailVerification } from '../../../firebaseSetup';
import { setDoc, getDoc } from 'firebase/firestore';
import { FirebaseProvider } from '../../../FirebaseContext.js'; 

//Component Imports
import AccountForm from '../../../components/UserAuth/AccountForm';

describe('AccountForm Component', () => {
  const setup = (type2) => {
    render(
      <FirebaseProvider auth={auth} db={db}>
        <AccountForm
                  usernamePlaceholder="Username"
                  emailPlaceholder="Email"
                  passwordPlaceholder="Password"
                  type={type2}
                  auth={auth}
                  db={db}
                />
      </FirebaseProvider>
    );
  };

  it('renders the create account form correctly', async () => {
    setup('createAccount');
    
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('handles create account button click with valid inputs', async () => {
    setup('createAccount');
    const usernameInput = screen.getByPlaceholderText('Username');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const createButton = screen.getByText('Create Account');

    fireEvent.change(usernameInput, { target: { value: 'newuser123' } });
    fireEvent.change(emailInput, { target: { value: 'newuser@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(createButton);

    await waitFor(() => {
      expect(screen.findByText('Username already taken. Try something else.'));
    });
  });

  it('renders the sign in form correctly', async () => {
    setup('signIn');
    
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('handles sign in button click with valid inputs', async () => {
    setup('signIn');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const signInButton = screen.getByText('Sign In');

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'mypassword' } });

    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(screen.findByText('Invalid email or password. Please try again.'));
    });
  });

});