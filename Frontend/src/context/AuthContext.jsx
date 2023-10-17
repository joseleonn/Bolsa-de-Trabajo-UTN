import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import useNotify from '../hooks/useNotify';
import { useLoading } from './LoadingContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: '',
    token: '',
  });
  const [isLogin, setIsLogin] = useState(false);
const {errorMessage, successMessage} = useNotify()
const {toggleLoading} = useLoading();
const login = async (email, contrasenia) => {
    toggleLoading(true);
    try {

      const response = await axios.post('https://localhost:7197/api/Auth/login', {
        email,
        contrasenia,
      });
      setUser({email: email, token: response.data}); // Almacena el usuario autenticado en el estado
      setIsLogin(true);
      successMessage('Accediste Correctamente');

    } catch (error) {
      errorMessage("Error al acceder")
      console.error('Error al iniciar sesión', error);
    }finally{
      toggleLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, isLogin, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};
