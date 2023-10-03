import { Button } from "@nextui-org/react";
import { UTN_logo_white } from "../assets";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  console.log(errors);
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <section className="relative flex flex-col justify-center  items-center lg:flex-row lg:h-screen lg:items-center">
        {/* Contenido del formulario */}
        <div className="w-full px-4 py-8 sm:px-6 sm:py-12 lg:w-1/2 lg:px-8 lg:py-24 dark:bg-[#262526]  rounded-[20px] shadow-xl ">
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

          <form className="mx-auto mt-8 max-w-md space-y-4" onSubmit={onSubmit}>
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
              <p className="text-sm light:text-[#15171a] dark:text-[#f3f3f3] mb-4 sm:mb-0">
                No estás registrado?
                <a className="underline" href="#">
                  Regístrate.
                </a>
              </p>
              <div className="flex flex-wrap sm:flex-nowrap items-center p-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-blue-600 text-[#f3f3f3] hover:bg-blue-800 font-epilogue font-semibold text-[16px] leading-[26px] min-h-[52px] px-4 rounded-[54px] mb-2 sm:mb-0 sm:mr-2"
                >
                  Iniciar sesion
                </motion.button>
                <Link to={"/"}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-blue-300 text-[#f3f3f3] hover:bg-blue-800 font-epilogue font-semibold text-[16px] leading-[20px] min-h-[52px] px-4 rounded-[54px] mb-2 sm:mb-0 sm:ml-2"
                  >
                    Volver
                  </motion.button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </motion.div>
  );
};

export default Login;
