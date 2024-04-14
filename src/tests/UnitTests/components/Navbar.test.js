//Testing Imports
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

//Firebase Imports - Can be added to all tests that have components that use firebase, 
//then just wrap the component in <FirebaseProvider></FirebaseProvider>
import { db, auth, analytics,
  addDoc, collection, query, where, getDocs, updateDoc, serverTimestamp,
  onAuthStateChanged, sendEmailVerification } from '../../../firebaseSetup';
import { setDoc, getDoc } from 'firebase/firestore';
import { FirebaseProvider } from '../../../FirebaseContext.js'; 

//Component Imports
import Navbar from '../../../components/Navbar';  

describe('Navbar Component', () => {
  it('renders the logo and primary navigation links', () => {
    render(<FirebaseProvider 
      auth={auth} 
      db={db} 
      isAuthenticated={false} 
      username={""}
    >
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </FirebaseProvider>
    );

    // Check if the logo is rendered
    expect(screen.getByAltText('Great Escape Games Logo')).toBeInTheDocument();

    // Check for main navigation links
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Private Rooms')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  // Optionally, check for presence of search input if it's always visible
  it('renders the search input', () => {
    render(
      <FirebaseProvider 
      auth={auth} 
      db={db} 
      isAuthenticated={false} 
      username={""}
    >
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </FirebaseProvider>
    );
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });
});

