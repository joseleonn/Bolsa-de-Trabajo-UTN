import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
  const { login } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      console.log(data.email);
      console.log(data.password);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };
  return (
    <div>
      <div className=" flex flex-col justify-center  items-center  lg:h-[60vh] lg:items-cente dark:bg-[#18181B] light:bg-[#ffffff] rounded-[20px] p-[20px] mt-[100px] ">
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
                {...register("email", {
                  required: { value: true, message: "El email es requerido" },
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@frro\.utn\.edu\.ar$/,
                    message: "El correo debe terminar en @frro.utn.edu.ar",
                  },
                })}
              />
              {errors.email && (
                <span className="text-[#F31260] text-sm font-epilogue ">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Contraseña
            </label>

            <div className="relative ">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm"
                placeholder="Contraseña"
                {...register("password", {
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
                  className="text-gray-400 hover:text-gray-600 "
                />
              </span>
              {errors.password && (
                <span className="text-[#F31260]  text-sm font-epilogue  ">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex flex-col">
              <p className="text-sm light:text-[#15171a] dark:text-[#f3f3f3] mb-4 sm:mb-0">
                No estás registrado?
                <a className="underline" href="#">
                  Regístrate.
                </a>
              </p>
              <p className="text-sm light:text-[#15171a] dark:text-[#f3f3f3] mb-4 sm:mb-0">
                <Link to="/cambiar-contrasena" className="underline" href="#">
                  Cambiar contraseña.
                </Link>
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center p-3 gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button color="primary">Iniciar Sesion</Button>
              </motion.div>
              <Link to="/">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button type="submit">Volver</Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
