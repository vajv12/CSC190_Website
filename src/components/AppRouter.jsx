import React from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

// This function or component decides which Router to use
// during testing it needs to use a different one so navigation works with Jest properly
const AppRouter = ({ children }) => {
    return <BrowserRouter>{children}</BrowserRouter>;
};

export default AppRouter;
