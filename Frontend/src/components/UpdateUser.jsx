import { Button, Input } from '@nextui-org/react'
import React, { useState } from 'react'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'
import useModifyStudent from '../hooks/useModifyStudent'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const UpdateUser = () => {
  const { studentData, setStudentData } = useData()
  const { user } = useAuth()
  const { modifyStudent } = useModifyStudent()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: user.email,
    nombre: studentData.nombre,
    dni: studentData.dni,
    apellido: studentData.apellido,
    celular: studentData.celular,
    nacionalidad: studentData.nacionalidad,
    pais: studentData.pais,
    ciudad: studentData.ciudad,
    direccion: studentData.direccion,
    curriculum: '',
    tipoUsuario: 0,
    contrasenia: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    try {
      await modifyStudent(formData)
      setStudentData({
        ...formData,
        curriculum: studentData.curriculum,
        tipoUsuario: studentData.tipoUsuario
      })
    } catch (error) {
      console.error('Error al modificar los datos', error)
    }
  }
  const handleNavigate = () => {
    navigate(`/perfil`)
  }
  return (
    <div className="dark:bg-[#18181B] shadow-xl rounded-[20px] p-[40px] mt-[70px] flex flex-wrap gap-3 items-center w-full justify-center md:justify-start">
      <h1 className="w-full text-2xl uppercase font-bold text-center">
        Modificar Mis Datos
      </h1>
      <ToastContainer />
      <form onSubmit={handleFormSubmit} action="submit" className="w-full">
        <div className="w-full flex-col ">
          <div className="min-w-1/2  flex p-2 gap-2">
            <Input
              name="email"
              fullWidth
              size="lg"
              type="email"
              label="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <Input
              fullWidth
              name="nombre"
              size="lg"
              type="text"
              label="Nombre"
              value={formData.nombre}
              onChange={handleInputChange}
            />
          </div>
          <div className="min-w-1/2 flex  p-2 gap-2">
            <Input
              fullWidth
              name="dni"
              size="lg"
              type="text"
              label="DNI"
              disabled
              value={formData.dni}
            />
            <Input
              fullWidth
              size="lg"
              name="apellido"
              type="text"
              label="Apellido"
              value={formData.apellido}
              onChange={handleInputChange}
            />
          </div>
          <div className="min-w-1/2 flex  p-2 gap-2">
            <Input
              fullWidth
              size="lg"
              name="celular"
              type="text"
              label="Celular"
              value={formData.celular}
              onChange={handleInputChange}
            />
            <Input
              fullWidth
              name="nacionalidad"
              size="lg"
              type="text"
              label="Nacionalidad"
              value={formData.nacionalidad}
              onChange={handleInputChange}
            />
          </div>
          <div className="min-w-1/2 flex p-2 gap-2">
            <Input
              fullWidth
              size="lg"
              name="pais"
              type="text"
              label="Pais"
              value={formData.pais}
              onChange={handleInputChange}
            />
            <Input
              fullWidth
              size="lg"
              name="ciudad"
              type="text"
              label="Ciudad"
              value={formData.ciudad}
              onChange={handleInputChange}
            />
          </div>
          <div className="min-w-1/2 flex p-2 gap-2">
            <Input
              fullWidth
              size="lg"
              type="text"
              name="direccion"
              label="Direccion"
              value={formData.direccion}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex">
          <Button type="submit" fullWidth color="primary" className="p-2 m-2">
            Modificar
          </Button>
          <Button
            color="default"
            fullWidth
            onPress={handleNavigate}
            className="p-2 m-2"
          >
            Volver
          </Button>
        </div>
      </form>
    </div>
  )
}

export default UpdateUser
