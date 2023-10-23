import React from 'react'
import { useLoading } from '../context/LoadingContext'
import axios from 'axios'
import useNotify from './useNotify'
import { useAuth } from '../context/AuthContext'
const useAplyJob = () => {
  const { toggleLoading } = useLoading()
  const { successMessage, errorMessage } = useNotify()
  const { user } = useAuth()
  const aplyJob = async (idJob) => {
    toggleLoading(true)
    try {
      const response = await axios.post(
        'https://localhost:7197/api/Job/AplicarEmpleo',
        {
          idJob,
          userEmail: user.email
        }
      )
      successMessage('Postulado Correctamente')
    } catch (error) {
      errorMessage('Error al Postularse')
      console.error('Error al Postularse', error)
    } finally {
      toggleLoading(false)
    }
  }
  return { aplyJob }
}

export default useAplyJob
