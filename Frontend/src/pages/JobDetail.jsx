import { Button } from '@nextui-org/react'
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { back } from '../assets'
import useAplyJob from '../hooks/useAply'
import { ToastContainer } from 'react-toastify'

const JobDetail = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { aplyJob } = useAplyJob()

  const handleNavigate = () => {
    navigate(`/Empleos`)
  }
  return (
    <div className="dark:bg-[#18181B] shadow-xl rounded-[20px] p-[40px] mt-[70px] flex flex-wrap gap-3 items-center w-full justify-center md:justify-start">
      <ToastContainer />

      <div className="w-full">
        <h1 className="light:text-[#FFFFFF] text-center font-bold font-epilogue text-[50px] ">
          {state.title}
        </h1>

        <div className="mt-[40px]">
          <p className="font-epilogue ">{state.description}</p>

          <ul className="mt-[20px]">
            <span className="light:text-[#FFFFFF] font-epilogue font-semibold text-[30px] mt-[30px]">
              Requisitos
            </span>

            <li className="uppercase light:text-[#FFFFFF]">volar</li>
            <li>nadar</li>
            <li>inmortalidad</li>
          </ul>
          <span className="light:text-[#FFFFFF] font-epilogue font-semibold text-[30px] mt-[30px]">
            Empresa
          </span>
          <p className="light:text-[#FFFFFF]">
            Somos una empresa constructora que se dedica a construir cosas no
            construidas, construyendo de manera construida
          </p>

          <span className="light:text-[#FFFFFF] font-epilogue font-semibold text-[30px] mt-[30px]">
            Puesto {state.titulo}
          </span>
          <p className="light:text-[#FFFFFF]">{state.descripcion}</p>
        </div>
        <div className="flex justify-end mt-[10px] gap-2">
          <Button
            color="default"
            radius="full"
            size="xl"
            onPress={handleNavigate}
            className="  text-white font-epilogue border-default-200 "
          >
            Volver
          </Button>

          <Button
            className=" bg-blue-600 text-white font-epilogue border-default-200  "
            radius="full"
            onPress={() => aplyJob(state.idPuesto)}
          >
            Postularse
          </Button>
        </div>
      </div>
    </div>
  )
}

export default JobDetail
