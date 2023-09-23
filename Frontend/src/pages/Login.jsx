import { Button } from "@nextui-org/react";
import { UTN_logo_white } from "../assets";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm();
  console.log(errors);
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <section className="relative flex flex-col justify-center  items-center lg:flex-row lg:h-screen lg:items-center">
      {/* Contenido del formulario */}
      <div className="w-full px-4 py-8 sm:px-6 sm:py-12 lg:w-1/2 lg:px-8 lg:py-24 dark:bg-[#f3f3f3] rounded-[20px] shadow-xl ">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#15171a]">
            Bolsa De Trabajo
          </h1>
          <p className="mt-4 text-[#15171a]">
            Universidad Tecnológica Nacional
          </p>
          <p className="text-[#15171a]">Facultad Regional Rosario</p>
        </div>

        <form className="mx-auto mt-8 max-w-md space-y-4" onSubmit={onSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm"
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

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                {/* Icono de correo */}
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Contraseña
            </label>

            <div className="relative">
              <input
                type="password"
                className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm"
                placeholder="Contraseña"
                {...register("password", {
                  required: {
                    value: true,
                    message: "La contraseña es requerida",
                  },
                })}
              />
              {errors.password && (
                <span className="text-[#F31260]  text-sm font-epilogue  ">
                  {errors.password.message}
                </span>
              )}

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                {/* Icono de contraseña */}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between">
            <p className="text-sm text-[#15171a] mb-4 sm:mb-0">
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
  );
};

export default Login;
