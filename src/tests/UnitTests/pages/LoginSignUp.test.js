//tests UI of the signup/login form, without making any real firebase calls
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

//Firebase Imports - Can be added to all tests that have components that use firebase, 
//then just wrap the component in <FirebaseProvider></FirebaseProvider>
import { db, auth, analytics,
  addDoc, collection, query, where, getDocs, updateDoc, serverTimestamp,
  onAuthStateChanged, sendEmailVerification } from '../../../firebaseSetup';
import { FirebaseProvider } from '../../../FirebaseContext.js';

//Component Imports
import LoginSignUp from '../../../pages/LoginSignUp';


describe('LoginSignUp Component', () => {
  test('renders and defaults to Sign Up action', () => {
    render(<FirebaseProvider 
      auth={auth} 
      db={db} 
      isAuthenticated={false} 
      username={""}
    >
      <LoginSignUp />
    </FirebaseProvider>);
    expect(screen.getByText('Create Account')).toBeInTheDocument();
    expect(screen.queryByText('Forgot Password')).not.toBeInTheDocument();
  });

  test('toggles to Login view when Login is clicked', async () => {
    render(<FirebaseProvider 
      auth={auth} 
      db={db} 
      isAuthenticated={false} 
      username={""}
    >
      <LoginSignUp />
    </FirebaseProvider>);
    const user = userEvent.setup();
    const loginButton = screen.getByText('Login');
    await user.click(loginButton);
      
    const testElement = await screen.getByText('Forgot Password?');
    expect(testElement).toBeInTheDocument();
  });

  test('creates a new account with too short of a username', async () => {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);//generate random 6 digit number
    let username = `bot${randomNumber}`;
    username = 'usr';
    const email = `${username}@gmail.com`;
    const password = 'password';

    render(<FirebaseProvider 
      auth={auth} 
      db={db} 
      isAuthenticated={false} 
      username={""}
    >
      <LoginSignUp />
    </FirebaseProvider>);
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
    const testElement = await screen.getByText('Username must be more than 4 characters.');
    expect(testElement).toBeInTheDocument();
  });
  
  test('creates a new account with too long of a username', async () => {
    let username = 'user123123123123';
    const email = `${username}@gmail.com`;
    const password = 'password';

    render(<FirebaseProvider 
      auth={auth} 
      db={db} 
      isAuthenticated={false} 
      username={""}
    >
      <LoginSignUp />
    </FirebaseProvider>);
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
    const testElement = await screen.getByText('Username must be 12 characters or less.');
    expect(testElement).toBeInTheDocument();
  });
  
  
});
