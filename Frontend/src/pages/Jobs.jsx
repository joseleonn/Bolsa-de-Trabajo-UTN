import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CardJob } from '../components'
import { useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'

const Jobs = () => {
  const navigate = useNavigate()
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const { jobs } = useData()
  useEffect(() => {
    // Activa la animación después de un pequeño retraso
    setTimeout(() => {
      setShouldAnimate(true)
    }, 200)
  }, [])

  const handleNavigate = (job) => {
    navigate(`/Empleos/${job.idPuesto}`, { state: job })
  }

  return (
    <div className="mt-[100px] flex flex-wrap gap-3 items-center w-full justify-center md:justify-start">
      {jobs.map((job, index) => (
        <motion.div
          key={job.idPuesto}
          initial={{ opacity: 0, y: 20 }}
          animate={
            shouldAnimate ? { opacity: 1, y: 0 } : {} // Solo anima cuando shouldAnimate es verdadero
          }
          transition={{ duration: 0.5, delay: index * 0.2 }} // Añade un pequeño retraso a cada animación
        >
          <CardJob
            title={job.titulo}
            company={job.idEmpresa}
            description={job.descripcion}
            handleClick={() => handleNavigate(job)}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default Jobs
