import { onAuthStateChanged } from 'firebase/auth';
import React, { useState, useEffect, createContext, useContext } from 'react';
import { auth } from '../firebase';

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  accountHolder: null,
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (accountHolder) => {
      setState((prevState) => ({ ...prevState, accountHolder }));
    });
    return unsubscribe;
  }, []);

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
