import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FormEmpresas = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Handle registration logic for empresas here
    console.log(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <div className="flex flex-col justify-center items-center lg:h-[60vh] lg:items-center dark:bg-[#18181B] light:bg-[#ffffff] rounded-[20px] p-[20px] mt-[100px]">
          <div className="mx-auto max-w-md text-center">
            <h1 className="text-2xl sm:text-3xl font-bold  light:text-[#15171a] dark:text-[#f3f3f3]">
              Registrarse como Empresa
            </h1>
          </div>

          <form
            className="mx-auto mt-8 max-w-md space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label htmlFor="email" className="sr-only text-[#15171a]">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm text-[#15171a]"
                  placeholder="correo@empresa.com"
                  {...register("Email", {
                    required: { value: true, message: "El email es requerido" },
                  })}
                />
                {errors.Email && (
                  <span className="text-[#F31260] text-sm font-epilogue">
                    {errors.Email.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm"
                  placeholder="Contraseña"
                  {...register("Contrasenia", {
                    required: {
                      value: true,
                      message: "La contraseña es requerida",
                    },
                  })}
                />
                <span
                  className="absolute top-4 right-4 grid place-content-center cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    className="text-gray-400 hover:text-gray-600"
                  />
                </span>
                {errors.Contrasenia && (
                  <span className="text-[#F31260] text-sm font-epilogue">
                    {errors.Contrasenia.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="nombre" className="sr-only text-[#15171a]">
                Nombre de la Empresa
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm text-[#15171a]"
                  placeholder="Nombre de la empresa"
                  {...register("Nombre", {
                    required: {
                      value: true,
                      message: "El nombre es requerido",
                    },
                  })}
                />
                {errors.Nombre && (
                  <span className="text-[#F31260] text-sm font-epilogue">
                    {errors.Nombre.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="pais" className="sr-only text-[#15171a]">
                País
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm text-[#15171a]"
                  placeholder="País"
                  {...register("Pais", {
                    required: { value: true, message: "El país es requerido" },
                  })}
                />
                {errors.Pais && (
                  <span className="text-[#F31260] text-sm font-epilogue">
                    {errors.Pais.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="ciudad" className="sr-only text-[#15171a]">
                Ciudad
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm text-[#15171a]"
                  placeholder="Ciudad"
                  {...register("Ciudad", {
                    required: {
                      value: true,
                      message: "La ciudad es requerida",
                    },
                  })}
                />
                {errors.Ciudad && (
                  <span className="text-[#F31260] text-sm font-epilogue">
                    {errors.Ciudad.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="direccion" className="sr-only text-[#15171a]">
                Dirección
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm text-[#15171a]"
                  placeholder="Dirección"
                  {...register("Direccion", {
                    required: {
                      value: true,
                      message: "La dirección es requerida",
                    },
                  })}
                />
                {errors.Direccion && (
                  <span className="text-[#F31260] text-sm font-epilogue">
                    {errors.Direccion.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="flex flex-col">
                <p className="text-sm text-[#15171a] mb-4 sm:mb-0">
                  ¿Ya tienes una cuenta?
                  <Link to="/Login">
                    <a className="underline" href="#">
                      Iniciar Sesión.
                    </a>
                  </Link>
                </p>
              </div>

              <div className="flex flex-wrap sm:flex-nowrap items-center p-3 gap-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button type="submit" color="primary">
                    Registrarse como Empresa
                  </Button>
                </motion.div>
                <Link to="/">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button>Volver</Button>
                  </motion.div>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default FormEmpresas;
