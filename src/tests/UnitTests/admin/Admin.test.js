import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Admin from '../../../admin/Admin';

describe('Admin Component', () => {
  it('renders correctly and displays the admin page title', () => {
    render(<Admin />);

    // Check if the Admin Page title is present
    const titleElement = screen.getByText('Admin Page');
    expect(titleElement).toBeInTheDocument();

    // Check that the title is specifically within an h1 tag
    expect(titleElement.tagName).toBe('H1');
  });
});
