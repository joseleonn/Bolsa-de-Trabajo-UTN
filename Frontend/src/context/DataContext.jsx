import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const {user} = useAuth()
  useEffect(() => {
    const getJobs = async () => {
      if(user){
        try {
          const response = await axios.get('https://localhost:7197/ListaEmpleos', {
            headers: {
              'Authorization': `Bearer ${user.token}` // Agrega el token JWT en el encabezado 'Authorization'
            }
          });    
          setJobs([...response.data]); 
        } catch (error) {
          console.error('Error al traer empleos', error);
        }
      }
      };

      getJobs();
  },[jobs, user])


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
