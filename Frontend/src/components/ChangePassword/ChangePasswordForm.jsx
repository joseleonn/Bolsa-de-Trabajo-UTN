import React from 'react'
import { Button, Input } from '@nextui-org/react'
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useLoading } from '../../context/LoadingContext'
import useNotify from '../../hooks/useNotify'
import { useAuth } from '../../context/AuthContext'
import 'react-toastify/dist/ReactToastify.css';

const ChangePasswordForm = () => {
    const [newPassword, setNewPassowrd ] = useState("")
    const [reNewPassword, setReNewPassowrd ] = useState("")

    const navigate = useNavigate();
    const {toggleLoading} = useLoading();
    const {errorMessage, successMessage} = useNotify()
    const {user} = useAuth()
    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        toggleLoading(true);
        try {
        
            if(newPassword === reNewPassword){
                const response = await axios.post(`https://localhost:7197/api/Usuario/CambiarContrasenia`, {
                  email:user.email,
                  contrasenia: newPassword
                });
                successMessage('Contraseña cambiada!');
                if(response.status === 200){
                  navigate("/Login")
            }
         
          }
        } catch (error) {
          errorMessage("Error al cambiar la Contraseña")
        }finally{
          toggleLoading(false);
        }
      }
  return (
    <section className=" flex flex-col justify-center  items-center  lg:h-[60vh] lg:items-center   rounded-[20px] p-[20px] mt-[100px]  ">
    <ToastContainer/>
    {/* Contenido del formulario */}

<form onSubmit={handleSubmit} className='bg-[#18181B] p-[20px] rounded-[20px]'>
      <Input isRequired type="password" label="Contraseña" placeholder="Ingrese el codigo" className="mt-[20px]" value={newPassword} onChange={(e) => setNewPassowrd(e.target.value)} />
      <Input isRequired type="password" label="Repetir Contraseña" placeholder="Ingrese el codigo" className="mt-[20px]" value={reNewPassword} onChange={(e) => setReNewPassowrd(e.target.value)} />

      <div className='flex gap-2'>
      <Button type='submit' color="primary" className='mt-[20px]' fullWidth={true}>Cambiar</Button>
      <Link className='w-full' to="/Login">
      <Button  className='mt-[20px]' fullWidth={true}>Volver</Button>
      </Link>
      </div>
      </form>
  </section>
  )
}

export default ChangePasswordForm