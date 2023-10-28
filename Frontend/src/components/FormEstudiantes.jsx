import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FormEstudiantes = () => {
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
    // Handle registration logic here
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
        <div className="flex flex-col justify-center items-center lg:h-[60vh] lg:items-center rounded-[20px] p-[20px] mt-[100px]">
          <div className="mx-auto max-w-md text-center">
            <h1 className="text-2xl sm:text-3xl font-bold light:text-[#15171a] dark:text-[#f3f3f3]">
              Registrarse Estudiante
            </h1>
          </div>

          <form
            className="mx-auto mt-8 max-w-md grid grid-cols-2 gap-4"
            onSubmit={handleSubmit(onSubmit)}
            style={{ gridTemplateColumns: "1fr 1fr" }} // Dos columnas en la cuadrícula
          >
            <div>
              <label
                htmlFor="email"
                className="sr-only dark:text-[#f3f3f3] light:text-[#15171a]"
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full rounded-lg p-4 text-sm shadow-sm light:text-[#15171a] dark:text-[#f3f3f3]"
                  placeholder="pepito@frro.utn.edu.ar"
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
              <label
                htmlFor="password"
                className="sr-only dark:text-[#f3f3f3] light:text-[#15171a]"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-lg p-4 text-sm shadow-sm "
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
              <label
                htmlFor="dni"
                className="sr-only dark:text-[#f3f3f3] light:text-[#15171a]"
              >
                DNI
              </label>
              <div className="relative">
                <input
                  type="text"
                  className={`w-full rounded-lg p-4 text-sm shadow-sm ${
                    errors.Dni ? "border-red-500" : ""
                  } light:text-[#15171a] dark:text-[#f3f3f3]`}
                  placeholder="Número de DNI"
                  {...register("Dni", {
                    required: "El DNI es requerido",
                    pattern: {
                      value: /^\d{8}$/,
                      message: "El DNI debe contener 8 dígitos numéricos",
                    },
                  })}
                />
                {errors.Dni && (
                  <span className="text-[#F31260] text-sm font-epilogue">
                    {errors.Dni.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="nombre"
                className="sr-only dark:text-[#f3f3f3] light:text-[#15171a]"
              >
                Nombre
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg p-4 text-sm shadow-sm light:text-[#15171a] dark:text-[#f3f3f3]"
                  placeholder="Nombre"
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
              <label
                htmlFor="apellido"
                className="sr-only dark:text-[#f3f3f3] light:text-[#15171a]"
              >
                Apellido
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg p-4 text-sm shadow-sm light:text-[#15171a] dark:text-[#f3f3f3]"
                  placeholder="Apellido"
                  {...register("Apellido", {
                    required: {
                      value: true,
                      message: "El apellido es requerido",
                    },
                  })}
                />
                {errors.Apellido && (
                  <span className="text-[#F31260] text-sm font-epilogue">
                    {errors.Apellido.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="nacionalidad"
                className="sr-only dark:text-[#f3f3f3] light:text-[#15171a]"
              >
                Nacionalidad
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg p-4 text-sm shadow-sm light:text-[#15171a] dark:text-[#f3f3f3]"
                  placeholder="Nacionalidad"
                  {...register("Nacionalidad", {
                    required: {
                      value: true,
                      message: "La nacionalidad es requerida",
                    },
                  })}
                />
                {errors.Nacionalidad && (
                  <span className="text-[#F31260] text-sm font-epilogue">
                    {errors.Nacionalidad.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="celular"
                className="sr-only dark:text-[#f3f3f3] light:text-[#15171a]"
              >
                Celular
              </label>
              <div className="relative">
                <input
                  type="text"
                  className={`w-full rounded-lg p-4 text-sm shadow-sm ${
                    errors.Celular ? "border-red-500" : ""
                  } light:text-[#15171a] dark:text-[#f3f3f3]`}
                  placeholder="Número de celular"
                  {...register("Celular", {
                    required: "El número de celular es requerido",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message:
                        "El número de celular debe contener exactamente 10 dígitos numéricos",
                    },
                  })}
                />
                {errors.Celular && (
                  <span className="text-[#F31260] text-sm font-epilogue">
                    {errors.Celular.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="pais"
                className="sr-only dark:text-[#f3f3f3] light:text-[#15171a]"
              >
                País
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg p-4 text-sm shadow-sm light:text-[#15171a] dark:text-[#f3f3f3]"
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
              <label
                htmlFor="ciudad"
                className="sr-only dark:text-[#f3f3f3] light:text-[#15171a]"
              >
                Ciudad
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg p-4 text-sm shadow-sm light:text-[#15171a] dark:text-[#f3f3f3]"
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
              <label
                htmlFor="direccion"
                className="sr-only dark:text-[#f3f3f3] light:text-[#15171a]"
              >
                Dirección
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg p-4 text-sm shadow-sm light:text-[#15171a] dark:text-[#f3f3f3]"
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

            <div className="col-span-2 flex justify-between items-center">
              <div>
                <p className="text-sm light:text-[#15171a] dark:text-[#f3f3f3]">
                  ¿Ya tienes una cuenta?
                  <Link to="/Login">
                    <a className="underline" href="#">
                      Iniciar Sesión.
                    </a>
                  </Link>
                </p>
              </div>

              <div className="flex gap-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button type="submit" color="primary">
                    Registrarse
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

export default FormEstudiantes;
