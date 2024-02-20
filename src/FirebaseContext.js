//makes firebase auth and db variable available to all components that need it
//uses React's Context API
import React, { createContext, useContext } from 'react';

export const FirebaseContext = createContext();

export const FirebaseProvider = ({ children, auth, db, isAuthenticated}) => {
  return (
    <FirebaseContext.Provider value={{ auth, db, isAuthenticated}}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);

//usage to load auth variable from any component(hooks don't work in class based components, only functional):
// import { useFirebase } from './path/to/FirebaseContext'; //update the path accordingly
// const {auth, db} = useFirebase();