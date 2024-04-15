import React from 'react';
import { render, screen } from '@testing-library/react';
import { FirebaseProvider, useFirebase, FirebaseContext } from '../../FirebaseContext';

// Helper component to test the use of the FirebaseContext
const ConsumerComponent = () => {
  const context = useFirebase();
  return (
    <>
      <div data-testid="auth">{context.auth ? 'auth-exists' : 'no-auth'}</div>
      <div data-testid="db">{context.db ? 'db-exists' : 'no-db'}</div>
      <div data-testid="isAuthenticated">
        {context.isAuthenticated ? 'authenticated' : 'not-authenticated'}
      </div>
    </>
  );
};

describe('FirebaseProvider and useFirebase', () => {
  it('provides the auth, db, and isAuthenticated values', () => {
    const authMock = { signIn: () => {} };
    const dbMock = { get: () => {} };
    const isAuthenticatedMock = true;

    render(
      <FirebaseProvider auth={authMock} db={dbMock} isAuthenticated={isAuthenticatedMock}>
        <ConsumerComponent />
      </FirebaseProvider>
    );

    expect(screen.getByTestId('auth').textContent).toBe('auth-exists');
    expect(screen.getByTestId('db').textContent).toBe('db-exists');
    expect(screen.getByTestId('isAuthenticated').textContent).toBe('authenticated');
  });
});
