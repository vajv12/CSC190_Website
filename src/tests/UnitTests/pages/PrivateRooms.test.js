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
import PrivateRooms from '../../../pages/PrivateRooms'; 


describe('PrivateRooms Component', () => {
  test('displays an alert if trying to book a past date', () => {
      const mockAlert = jest.spyOn(window, 'alert');
      render(
        <FirebaseProvider 
          auth={auth} 
          db={db} 
          isAuthenticated={false} 
          username={""}
        >
          <PrivateRooms />
        </FirebaseProvider>);
      const dateInput = screen.getByLabelText(/Date:/i);
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1); // Set to yesterday
      fireEvent.change(dateInput, { target: { value: pastDate.toISOString().slice(0, 10) } });

      const reserveButton = screen.getByRole('button', { name: /Reserve Now/i });
      fireEvent.click(reserveButton);

      expect(mockAlert).toHaveBeenCalledWith('You cannot book for past dates.');

      mockAlert.mockRestore(); 
  });

  test('alerts to fill in all required fields', () => {
    const mockAlert = jest.spyOn(window, 'alert');
    render(
      <FirebaseProvider 
        auth={auth} 
        db={db} 
        isAuthenticated={false} 
        username={""}
      >
        <PrivateRooms />
      </FirebaseProvider>);
      const reserveButton = screen.getByRole('button', { name: /Reserve Now/i });
      fireEvent.click(reserveButton);

      expect(mockAlert).toHaveBeenCalledWith('Please fill in all required fields.');
      mockAlert.mockRestore(); 
  });

});