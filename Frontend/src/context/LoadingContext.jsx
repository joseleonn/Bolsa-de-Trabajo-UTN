import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const toggleLoading = (estado) =>{
    setIsLoading(estado);
  }

  return (
    <LoadingContext.Provider value={{ toggleLoading, isLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useData debe ser utilizado dentro de un loadingProvider');
  }
  return context;
};
