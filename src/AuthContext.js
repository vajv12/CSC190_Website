//makes firebase auth variable available to all components that need it
//uses React's Context API
import React, { createContext, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children, auth }) => {
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

//usage to load auth variable from any component:
// import { useAuth } from './path/to/AuthContext'; //update the path accordingly
// const auth = useAuth();