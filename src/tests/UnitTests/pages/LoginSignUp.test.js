//tests UI of the signup/login form, without making any real firebase calls
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginSignUp from '../../../pages/LoginSignUp';
import * as FirebaseContext from '../../../FirebaseContext';

// Mock the Firebase services and context
jest.mock('../FirebaseContext', () => ({
  useFirebase: jest.fn(),
}));

const mockSendPasswordResetEmail = jest.fn();
const mockCreateUserWithEmailAndPassword = jest.fn();
const mockSignInWithEmailAndPassword = jest.fn();
const mockSetDoc = jest.fn();

beforeEach(() => {
  // Reset mock calls before each test
  mockSendPasswordResetEmail.mockReset();
  mockCreateUserWithEmailAndPassword.mockReset();
  mockSignInWithEmailAndPassword.mockReset();
  mockSetDoc.mockReset();

  // Setup default implementation
  FirebaseContext.useFirebase.mockImplementation(() => ({
    auth: {}, // Mock the auth object as needed
    db: {}, // Mock the db object as needed
    isAuthenticated: false, // Adjust based on tests
    sendPasswordResetEmail: mockSendPasswordResetEmail,
    createUserWithEmailAndPassword: mockCreateUserWithEmailAndPassword,
    signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
    setDoc: mockSetDoc,
  }));
});

describe('LoginSignUp Component', () => {
  test('renders and defaults to Sign Up action', () => {
    render(<LoginSignUp />);
    expect(screen.getByText('Create Account')).toBeInTheDocument();
    expect(screen.queryByText('Forgot Password')).not.toBeInTheDocument();
  });

  test('toggles to Login view when Login is clicked', async () => {
    render(<LoginSignUp />);
    const user = userEvent.setup();
    const loginButton = screen.getByText('Login');
    console.log(loginButton);
    await user.click(loginButton);
    await waitFor(() => {
      expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
    });
  });

  test('creates a new account with too short of a username', async () => {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);//generate random 6 digit number
    let username = `bot${randomNumber}`;
    username = 'usr';
    const email = `${username}@gmail.com`;
    const password = 'password';

    render(<LoginSignUp />);
    const user = userEvent.setup();

    const usernameInput = screen.getByPlaceholderText('Username');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('Create Account'); 

    // Fill out the form
    await user.type(usernameInput, username);
    await user.type(emailInput, email);
    await user.type(passwordInput, password);

    // Submit the form
    await user.click(submitButton);

    // Wait for the username to appear on the page, which means account was created successfully
    await waitFor(() => {
      expect(screen.getByText("Username must be more than 4 characters.")).toBeInTheDocument();
    });
  });
  
  test('creates a new account with too long of a username', async () => {
    let username = 'user123123123123';
    const email = `${username}@gmail.com`;
    const password = 'password';

    render(<LoginSignUp />);
    const user = userEvent.setup();

    const usernameInput = screen.getByPlaceholderText('Username');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('Create Account'); 

    // Fill out the form
    await user.type(usernameInput, username);
    await user.type(emailInput, email);
    await user.type(passwordInput, password);

    // Submit the form
    await user.click(submitButton);

    // Wait for the username to appear on the page, which means account was created successfully
    await waitFor(() => {
      expect(screen.getByText("Username must be 12 characters or less.")).toBeInTheDocument();
    });
  });
});
