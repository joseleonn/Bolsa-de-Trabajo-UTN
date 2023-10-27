import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RegisterForm = () => {
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
    <div>
      <div className="flex flex-col justify-center items-center lg:h-[60vh] lg:items-center dark:bg-[#18181B] light:bg-[#ffffff] rounded-[20px] p-[20px] mt-[100px]">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-2xl sm:text-3xl font-bold light:text-[#15171a] dark:text-[#f3f3f3]">
            Registrarse
          </h1>
        </div>

        <form
          className="mx-auto mt-8 max-w-md space-y-4"
          onSubmit={handleSubmit(onSubmit)}
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
                className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm light:text-[#15171a] dark:text-[#f3f3f3]"
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
            <label
              htmlFor="dni"
              className="sr-only dark:text-[#f3f3f3] light:text-[#15171a]"
            >
              DNI
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm light:text-[#15171a] dark:text-[#f3f3f3]"
                placeholder="Número de DNI"
                {...register("Dni", {
                  required: { value: true, message: "El DNI es requerido" },
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
                className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm light:text-[#15171a] dark:text-[#f3f3f3]"
                placeholder="Nombre"
                {...register("Nombre", {
                  required: { value: true, message: "El nombre es requerido" },
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
                className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm light:text-[#15171a] dark:text-[#f3f3f3]"
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
                className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm light:text-[#15171a] dark:text-[#f3f3f3]"
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
                className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm light:text-[#15171a] dark:text-[#f3f3f3]"
                placeholder="Número de celular"
                {...register("Celular", {
                  required: {
                    value: true,
                    message: "El número de celular es requerido",
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
                className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm light:text-[#15171a] dark:text-[#f3f3f3]"
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
                className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm light:text-[#15171a] dark:text-[#f3f3f3]"
                placeholder="Ciudad"
                {...register("Ciudad", {
                  required: { value: true, message: "La ciudad es requerida" },
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
                className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm light:text-[#15171a] dark:text-[#f3f3f3]"
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
              <p className="text-sm light:text-[#15171a] dark:text-[#f3f3f3] mb-4 sm:mb-0">
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
  );
};

export default RegisterForm;
