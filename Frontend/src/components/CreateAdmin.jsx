import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const CreateAdmin = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Lógica para enviar los datos del formulario, por ejemplo, hacer una solicitud al servidor.
    // Después de completar la lógica, puedes redirigir a la página deseada.
    console.log(data);
    // navigate("/ruta-deseada"); // Descomentar y ajustar según tu aplicación
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center lg:h-[60vh] lg:items-center dark:bg-[#18181B] light:bg-[#ffffff] rounded-[20px] p-[20px] mt-[100px]">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-2xl sm:text-3xl font-bold light:text-[#15171a] dark:text-[#f3f3f3]">
            Crear Admin
          </h1>
        </div>

        <form
          className="mx-auto mt-8 max-w-md space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label
              htmlFor="email"
              className="sr-only light:text-[#15171a] dark:text-[#f3f3f3]"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm light:text-[#15171a] dark:text-[#f3f3f3]"
                placeholder="correo@empresa.com"
                {...register("email", {
                  required: { value: true, message: "El email es requerido" },
                })}
              />
              {errors.email && (
                <span className="text-[#F31260] text-sm font-epilogue">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="sr-only light:text-[#15171a] dark:text-[#f3f3f3]"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm"
                placeholder="Contraseña"
                {...register("contrasenia", {
                  required: {
                    value: true,
                    message: "La contraseña es requerida",
                  },
                })}
              />
              {errors.contrasenia && (
                <span className="text-[#F31260] text-sm font-epilogue">
                  {errors.contrasenia.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center p-3 gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
              <Button type="submit" color="primary">
                Crear Admin
              </Button>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAdmin;
