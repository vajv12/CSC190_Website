import React from 'react';
import { render, screen } from '@testing-library/react';
import AppRouter from '../../../components/AppRouter';

describe('AppRouter', () => {
  it('renders children correctly', () => {
    // Render the AppRouter with a test child
    render(
      <AppRouter>
        <div>Test Child</div>
      </AppRouter>
    );

    // Check if the text from the child component is in the document
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});
