import React from 'react'
import { useLoading } from '../context/LoadingContext'
import axios from 'axios'
import useNotify from './useNotify'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
const useAplyJob = () => {
  const { toggleLoading } = useLoading()
  const { successMessage, errorMessage } = useNotify()
  const { user } = useAuth()
  const { setJobsAplicated, jobs } = useData()
  const aplyJob = async (idJob) => {
    const jobSelected = (idJob) => {
      return jobs.find((job) => job.idPuesto === idJob)
    }
    toggleLoading(true)
    try {
      const response = await axios.post(
        'https://localhost:7197/api/Job/AplicarEmpleo',
        {
          idJob: idJob,
          userEmail: user.email
        }
      )
      if (response.status === 200) {
        successMessage('Postulado Correctamente')
        setJobsAplicated((prevJobsAplicated) => [
          ...prevJobsAplicated,
          jobSelected(idJob)
        ])
      }
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
