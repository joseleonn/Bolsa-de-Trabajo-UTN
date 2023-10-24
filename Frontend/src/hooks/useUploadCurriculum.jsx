import { useState } from 'react'
import axios from 'axios'
import { useLoading } from '../context/LoadingContext'
import useNotify from './useNotify'
import { useAuth } from '../context/AuthContext'

const useUploadCurriculum = () => {
  const { toggleLoading } = useLoading()
  const { successMessage, errorMessage } = useNotify()
  const { user } = useAuth()
  const addCurriculum = async (file, studentDni) => {
    try {
      toggleLoading(true)
      const formData = new FormData()
      formData.append('files', file)
      formData.append('StudentDni', studentDni)

      const response = await axios.post(
        'https://localhost:7197/api/Student/CargarCurriculum',
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      )

      if (response.status === 200) {
        console.log('Currículum cargado con éxito')
        successMessage('Currículo cargado con exito')
      }
    } catch (error) {
      console.error('Error al cargar el currículum', error)
      errorMessage('Error al cargar el currículum')
    } finally {
      toggleLoading(false)
    }
  }

  return { addCurriculum }
}

export default useUploadCurriculum
