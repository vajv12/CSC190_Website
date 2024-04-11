import React from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

// This function or component decides which Router to use
// during testing it needs to use a different one so navigation works with Jest properly
const AppRouter = ({ children }) => {
  const isTest = process.env.NODE_ENV === 'test';

  if (isTest) {
    return <MemoryRouter>{children}</MemoryRouter>
  } else {
    return <BrowserRouter>{children}</BrowserRouter>;
  }
};

export default AppRouter;
