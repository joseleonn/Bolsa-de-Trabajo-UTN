import { useLoading } from '../context/LoadingContext'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const useSeeCV = () => {
  const { toggleLoading } = useLoading()
  const { user } = useAuth()

  const seeCV = async (dni) => {
    try {
      toggleLoading(true)
      const response = await axios.get(
        `https://localhost:7197/api/Student/VerCurriculum/${dni}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}` // Agrega el token JWT en el encabezado 'Authorization'
          },
          responseType: 'blob' // Indica que se espera un Blob
        }
      )

      // Crea una URL de objeto de blob y abre el PDF en una nueva pestaña
      const file = new Blob([response.data], { type: 'application/pdf' })
      const fileURL = URL.createObjectURL(file)
      window.open(fileURL)
    } catch (error) {
      console.error('Error al ver cv', error)
    } finally {
      toggleLoading(false)
    }
  }

  return { seeCV }
}

export default useSeeCV
