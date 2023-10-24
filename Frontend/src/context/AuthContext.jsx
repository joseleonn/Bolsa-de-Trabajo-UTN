import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import useNotify from '../hooks/useNotify'
import { useLoading } from './LoadingContext'
import jwtDecode from 'jwt-decode'

const AuthContext = createContext()
const TOKEN_KEY = 'authToken' // Una clave para el token en el Local Storage

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
  // Función para guardar el token en el Local Storage
  const saveTokenToLocalStorage = (token) => {
    localStorage.setItem(TOKEN_KEY, token)
  }

  // Función para verificar si existe un token válido en el Local Storage
  const checkTokenInLocalStorage = () => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      const decodedToken = jwtDecode(token)
      if (decodedToken.exp * 1000 > Date.now()) {
        setUser({
          idUser: decodedToken.nameid,
          email: decodedToken.email,
          tipoUsuario: decodedToken.Tipo_Usuario,
          token: token
        })
        setIsLogin(true)
      }
    }
  }

  useEffect(() => {
    checkTokenInLocalStorage()
  }, [])

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
      })
      // Guardar el token en el Local Storage
      saveTokenToLocalStorage(response.data)
      setIsLogin(true)
      successMessage('Accediste Correctamente')
    } catch (error) {
      errorMessage('Error al acceder')
      console.error('Error al iniciar sesión', error)
    } finally {
      toggleLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
  }
  return (
    <AuthContext.Provider value={{ user, login, isLogin, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider')
  }
  return context
}
