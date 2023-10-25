import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from './AuthContext'

const DataContext = createContext()

const student = '1'
export const DataProvider = ({ children }) => {
  const [jobs, setJobs] = useState([])
  const [studentData, setStudentData] = useState({
    email: '',
    dni: '',
    nombre: '',
    apellidos: '',
    celular: '',
    nacionalidad: '',
    pais: '',
    ciudad: '',
    direccion: '',
    curriculum: ''
  })
  const [jobsAplicated, setJobsAplicated] = useState([])

  const { user } = useAuth()
  useEffect(() => {
    const getJobs = async () => {
      if (user) {
        try {
          const response = await axios.get(
            'https://localhost:7197/ListaEmpleos',
            {
              headers: {
                Authorization: `Bearer ${user.token}` // Agrega el token JWT en el encabezado 'Authorization'
              }
            }
          )
          setJobs([...response.data])
        } catch (error) {
          console.error('Error al traer empleos', error)
        }
      }
    }

    getJobs()
  }, [jobs, user])

  useEffect(() => {
    const getDataStudent = async () => {
      if (user.tipoUsuario === student) {
        try {
          const response = await axios.get(
            `https://localhost:7197/api/Student/${user.idUser}`,
            {
              headers: {
                Authorization: `Bearer ${user.token}` // Agrega el token JWT en el encabezado 'Authorization'
              }
            }
          )
          setStudentData({ ...response.data })
        } catch (error) {
          console.error('Error al traer empleos', error)
        }
      }
    }

    getDataStudent()
  }, [user])

  useEffect(() => {
    const getJobsAplicated = async () => {
      if (user.tipoUsuario === student) {
        try {
          const response = await axios.get(
            `https://localhost:7197/api/Job/MisPostulaciones/${user.idUser}`,
            {
              headers: {
                Authorization: `Bearer ${user.token}` // Agrega el token JWT en el encabezado 'Authorization'
              }
            }
          )
          setJobsAplicated([...response.data])
        } catch (error) {
          console.error('Error al traer empleos', error)
        }
      }
    }

    getJobsAplicated()
  }, [user])
  return (
    <DataContext.Provider
      value={{
        jobs,
        setJobs,
        studentData,
        setStudentData,
        jobsAplicated,
        setJobsAplicated
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

// Hook personalizado para acceder al contexto
export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData debe ser utilizado dentro de un AuthProvider')
  }
  return context
}
