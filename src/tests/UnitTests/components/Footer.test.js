//Default Testing Imports - Can be added to all tests
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

//Firebase Imports - Can be added to all tests that have components that use firebase, 
//then just wrap the component in <FirebaseProvider></FirebaseProvider>
import { db, auth, analytics,
  addDoc, collection, query, where, getDocs, updateDoc, serverTimestamp,
  onAuthStateChanged, sendEmailVerification } from '../../../firebaseSetup';
import { FirebaseProvider } from '../../../FirebaseContext.js'; 

//Component Imports
import Footer from '../../../components/Footer';

describe('Footer Component', () => {
  it('renders the footer with all elements', () => {
    render(
      
      <FirebaseProvider auth={auth} db={db}>
        <BrowserRouter>
          <Footer />
        </BrowserRouter>
      </FirebaseProvider>
    );

    // Check for navigation links
    expect(screen.getByText('Products')).toHaveAttribute('href', '/pages/Product');
    expect(screen.getByText('About')).toHaveAttribute('href', '/pages/About');
    expect(screen.getByText('Contact Us')).toHaveAttribute('href', '/pages/Contact');
    expect(screen.getByText('Feedback')).toHaveAttribute('href', '/pages/Contact'); // Confirm this is intended to be the same as Contact Us

    // Check for external link
    expect(screen.getByText('Card Finder')).toHaveAttribute('href', 'https://greatescapegamesllc.tcgplayerpro.com/');

    // Check for MUI icons presence using data-testid
    expect(screen.getByTestId('InstagramIcon')).toBeInTheDocument();
    expect(screen.getByTestId('FacebookIcon')).toBeInTheDocument();
    expect(screen.getByTestId('YouTubeIcon')).toBeInTheDocument(); // Ensure you add a similar data-testid for the YouTube icon if it's missing
  
    // Check for Discord image
    expect(screen.getByAltText('Description')).toHaveAttribute('src', expect.stringContaining('discord.png'));

    // Check static text content
    expect(screen.getByText('Sacramento Location:')).toBeInTheDocument();
    expect(screen.getByText('1250 Howe Ave #3a, Sacramento, CA 95825')).toBeInTheDocument();

  });
});
