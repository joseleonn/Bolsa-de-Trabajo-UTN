import { Button, Input } from '@nextui-org/react'
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useLoading } from '../../context/LoadingContext'
import useNotify from '../../hooks/useNotify'
import 'react-toastify/dist/ReactToastify.css';

const CodeChangePassword = () => {
    const [code, setCode] = useState('')
    const [isValid, setIsValid ] = useState(false)
    const navigate = useNavigate();
    const {toggleLoading} = useLoading();
    const {errorMessage, successMessage} = useNotify()
    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        toggleLoading(true);
        try {
    
          const response = await axios.post(`https://localhost:7197/api/Usuario/VerificarToken/${code}`);
          successMessage('Token Correcto');
          if(response.status === 200){
            setIsValid(true)
            navigate("/cambiar-contrasena/formulario")
          }
        } catch (error) {
          errorMessage("Token Invalido")
        }finally{
          toggleLoading(false);
        }
      }
  return (
    <section className=" flex flex-col justify-center  items-center  lg:h-[60vh] lg:items-center bg- rounded-[20px] p-[20px] mt-[100px] ">
    <ToastContainer/>
    {/* Contenido del formulario */}

<form onSubmit={handleSubmit} className='bg-[#18181B] p-[20px] rounded-[20px]'>
      <Input isRequired type="number" label="Codigo" placeholder="Ingrese el codigo" className="mt-[20px]" value={code} onChange={(e) => setCode(e.target.value)} />
      <div className='flex gap-2'>
      <Button type='submit' color="primary" className='mt-[20px]' fullWidth={true}>Enviar Codigo</Button>
      <Link className='w-full' to="/Login">
      <Button  className='mt-[20px]' fullWidth={true}>Volver</Button>
      </Link>
      </div>
      </form>
  </section>
  )
}

export default CodeChangePassword