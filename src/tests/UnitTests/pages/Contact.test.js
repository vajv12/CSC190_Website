//Default Testing Imports - Can be added to all tests
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

//Firebase Imports - Can be added to all tests that have components that use firebase, 
//then just wrap the component in <FirebaseProvider></FirebaseProvider>
import { db, auth, analytics,
  addDoc, collection, query, where, getDocs, updateDoc, serverTimestamp,
  onAuthStateChanged, sendEmailVerification } from '../../../firebaseSetup';
import { FirebaseProvider } from '../../../FirebaseContext.js'; 

//Component Imports
import Contact from '../../../pages/Contact';

beforeAll(() => {
  // Mock the Email object on the global object used by Node (which Jest uses)
  global.Email = {
    send: jest.fn().mockResolvedValue('Email sent successfully!'),
  };
});

describe('Contact Component', () => {
  it('sends an email when the form is submitted', async () => {
    render(<FirebaseProvider 
      auth={auth} 
      db={db} 
      isAuthenticated={false} 
      username={""}
    >
      <Contact />
    </FirebaseProvider>);
  
    const nameInput = screen.getByPlaceholderText('Joe Doe');
    const emailInput = screen.getByPlaceholderText('@email');
    const subjectInput = screen.getByPlaceholderText('Subject line');
    const messageInput = screen.getByPlaceholderText('Enter message...');
    const submitButton = screen.getByRole('button', { name: /submit/i });
  
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(subjectInput, { target: { value: 'Inquiry' } });
    fireEvent.change(messageInput, { target: { value: 'I have a question.' } });
  
    // Make sure button is not disabled
    expect(submitButton).not.toBeDisabled();
  
    fireEvent.click(submitButton);
  
    // Wait for the mock to be called
    await waitFor(() => expect(global.Email.send).toHaveBeenCalled());
  
  });
});
