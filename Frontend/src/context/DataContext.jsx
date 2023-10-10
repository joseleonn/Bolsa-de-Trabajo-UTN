import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getJobs = async () => {
        try {
          const response = await axios.get('https://localhost:7197/ListaEmpleos');
    
          setJobs([...response.data]); 
        } catch (error) {
          console.error('Error al traer empleos', error);
        }
      };

      getJobs();
  },[jobs])


  return (
    <DataContext.Provider value={{ jobs, setJobs }}>
      {children}
    </DataContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};
