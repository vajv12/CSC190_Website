import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import DropdownLocations from '../../../helpers/DropdownLocations';

describe('DropdownLocations', () => {
  // Wrapping the component with Router due to the use of Link component
  const setup = () => render(
    <Router>
      <DropdownLocations />
    </Router>
  );

  it('should not show dropdown content initially', () => {
    setup();
    expect(screen.queryByText('Sacramento')).not.toBeInTheDocument();
    expect(screen.queryByText('Rocklin')).not.toBeInTheDocument();
  });

  it('should toggle dropdown content visibility on click', () => {
    setup();
    const trigger = screen.getByText('Events');
    fireEvent.click(trigger); // Opens dropdown
    expect(screen.getByText('Sacramento')).toBeInTheDocument();
    expect(screen.getByText('Rocklin')).toBeInTheDocument();
    
    fireEvent.click(trigger); // Closes dropdown
    expect(screen.queryByText('Sacramento')).not.toBeInTheDocument();
    expect(screen.queryByText('Rocklin')).not.toBeInTheDocument();
  });

  it('should contain correct links for locations', () => {
    setup();
    fireEvent.click(screen.getByText('Events')); // Opens dropdown
    
    const sacramentoLink = screen.getByText('Sacramento');
    const rocklinLink = screen.getByText('Rocklin');
    expect(sacramentoLink.closest('a')).toHaveAttribute('href', '/pages/Sacramento');
    expect(rocklinLink.closest('a')).toHaveAttribute('href', '/pages/Rocklin');
  });
});
