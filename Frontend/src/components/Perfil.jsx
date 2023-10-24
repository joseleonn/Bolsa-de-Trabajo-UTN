import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import { Button, Divider, Input } from '@nextui-org/react'
import useSeeCV from '../hooks/useSeeCV'
import { useNavigate } from 'react-router-dom'
import useUploadCurriculum from '../hooks/useUploadCurriculum'
import { ToastContainer } from 'react-toastify'
const Perfil = () => {
  const [selectedFile, setSelectedFile] = useState(null)

  const { user } = useAuth()
  const { studentData } = useData()
  const { seeCV } = useSeeCV()
  const { addCurriculum } = useUploadCurriculum()
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate(`/modificarusuario`)
  }
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const UploadCurriculum = async () => {
    if (selectedFile) {
      await addCurriculum(selectedFile, studentData.dni)
    } else {
      alert('No se seleccionó ningún archivo')
    }
  }
  return (
    <div className="w-full flex justify-center  ">
      <ToastContainer />
      <div className="dark:bg-[#18181B] shadow-xl rounded-[20px] p-[40px] mt-[70px] h-[500px] flex flex-wrap gap-3 w-1/2 items-center justify-center md:justify-start">
        <div className="w-full">
          <div className="flex justify-between p-2">
            <span>{user.email}</span>
            <Button onPress={handleNavigate} size="sm">
              Modificar
            </Button>
          </div>
          <Divider></Divider>
          {studentData && (
            <div className="flex flex-col p-[5px] gap-2">
              <span> DNI {studentData.dni}</span>
              <span>NOMBRE {studentData.nombre}</span>
              <span>APELLIDO {studentData.apellido}</span>
              <span>CEL: {studentData.celular}</span>
              <span>NACIONALIDAD: {studentData.nacionalidad}</span>
              <span>PAIS: {studentData.pais}</span>
              <span>CIUDAD: {studentData.ciudad}</span>
              <span>DIRECION: {studentData.direccion}</span>

              {studentData.curriculum ? (
                <Button
                  color="default"
                  size="sm"
                  className="p-[10px]"
                  onPress={() => seeCV(studentData.dni)}
                >
                  Ver Curriculum
                </Button>
              ) : (
                <div className="p-2 border rounded-[20px]">
                  <span className="text-gray-400">
                    No tienes curriculum cargado
                  </span>
                </div>
              )}

              <Input
                fullWidth
                size="sm"
                type="file"
                onChange={handleFileChange}
              />

              <Button fullWidth color="primary" onPress={UploadCurriculum}>
                Cargar Curriculum
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Perfil
