import { Input } from '@nextui-org/react'
import React from 'react'
import { ToastContainer } from 'react-toastify'

const ChangePassword = () => {
  return (
    <section className="relative flex flex-col justify-center  items-center lg:flex-row lg:h-screen lg:items-center ">
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
      </div>

      <Input type="email" label="Email" placeholder="Ingrese su mail" />
    </div>
  </section>
  )
}

export default ChangePassword