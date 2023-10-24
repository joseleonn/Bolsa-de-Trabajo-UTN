import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import useNotify from '../hooks/useNotify'
import { useLoading } from './LoadingContext'
import jwtDecode from 'jwt-decode'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    idUser: 0,
    email: '',
    tipoUsuario: '',
    token: ''
  })
  const [isLogin, setIsLogin] = useState(false)
  const { errorMessage, successMessage } = useNotify()
  const { toggleLoading } = useLoading()

  const login = async (email, contrasenia) => {
    toggleLoading(true)
    try {
      const response = await axios.post(
        'https://localhost:7197/api/Auth/login',
        {
          email,
          contrasenia
        }
      )
      setUser({
        idUser: jwtDecode(response.data).nameid,
        email: jwtDecode(response.data).email,
        tipoUsuario: jwtDecode(response.data).Tipo_Usuario,
        token: response.data
      }) // Almacena el usuario autenticado en el estado

      setIsLogin(true)
      successMessage('Accediste Correctamente')
    } catch (error) {
      errorMessage('Error al acceder')
      console.error('Error al iniciar sesión', error)
    } finally {
      toggleLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, isLogin, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook personalizado para acceder al contexto
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider')
  }
  return context
}
