import React from 'react'
import { useLoading } from '../context/LoadingContext'
import axios from 'axios'
import useNotify from './useNotify'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
const useModifyStudent = () => {
  const { toggleLoading } = useLoading()
  const { successMessage, errorMessage } = useNotify()
  const { user } = useAuth()
  const navigate = useNavigate()

  const modifyStudent = async (studentDTO) => {
    toggleLoading(true)
    try {
      const response = await axios.post(
        'https://localhost:7197/api/Student/ModificarAlumno',
        studentDTO,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      )

      if (response.status === 200) {
        successMessage('Datos modificados Correctamente')
        navigate('/perfil')
      }
    } catch (error) {
      errorMessage('Error al modificar')
      console.error('Error al modificar', error)
    } finally {
      toggleLoading(false)
    }
  }
  return { modifyStudent }
}

export default useModifyStudent
