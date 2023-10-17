import { Button, Input } from '@nextui-org/react'
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useLoading } from '../../context/LoadingContext'
import useNotify from '../../hooks/useNotify'
import { useAuth } from '../../context/AuthContext'
import 'react-toastify/dist/ReactToastify.css';


const ChangePassword = () => {
  const [email, setEmail] = useState('')
  const [send, setSend ] = useState(false)
  const navigate = useNavigate();
  const {toggleLoading} = useLoading();
  const {errorMessage, successMessage} = useNotify()
  const {setUser} = useAuth()
  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    toggleLoading(true);
    try {

      const response = await axios.post(`https://localhost:7197/api/Usuario/GenerarToken/${email}`);
      successMessage('Token Enviado');
      if(response.status === 200){
        setSend(true)
        setUser({email: email})
        navigate("/cambiar-contrasena/codigo")
      }
    } catch (error) {
      errorMessage("Error al enviar Token")
      console.error('Error al enviar Token', error);
    }finally{
      toggleLoading(false);
    }
  }
  return (
    <section className=" flex flex-col justify-center  items-center  lg:h-[60vh] lg:items-center  rounded-[20px] p-[20px] mt-[100px] ">
    <ToastContainer/>
    {/* Contenido del formulario */}
    <div className="w-full px-4 py-8 sm:px-6 sm:py-12 lg:w-1/2 lg:px-8 lg:py-24 dark:bg-[#18181B]  rounded-[20px] shadow-xl ">
     
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-2xl sm:text-3xl font-bold light:text-[#15171a] dark:text-[#f3f3f3]">
          Bolsa De Trabajo
        </h1>
        <p className="mt-4 light:text-[#15171a] dark:text-[#f3f3f3]">
          Universidad Tecnológica Nacional
        </p>
        <p className="light:text-[#15171a] dark:text-[#f3f3f3]">
          Facultad Regional Rosario
        </p>
        <p className="light:text-[#7F8084] dark:text-[#7F8084]">
          Ingrese el mail y espere el codigo
        </p>
      </div>
<form onSubmit={handleSubmit}>
      <Input isRequired type="email" label="Email" placeholder="Ingrese su mail" className="mt-[20px]" value={email} onChange={(e) => setEmail(e.target.value)} />
      <div className='flex gap-2'>
      <Button type='submit' color="primary" className='mt-[20px]' fullWidth={true}>Enviar Codigo</Button>
      <Link className='w-full' to="/Login">
      <Button  className='mt-[20px]' fullWidth={true}>Volver</Button>
      </Link>
      </div>
      </form>
    </div>
  </section>
  )
}

export default ChangePassword