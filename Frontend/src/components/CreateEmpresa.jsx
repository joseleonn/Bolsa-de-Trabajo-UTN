import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useData } from "../context/DataContext";

const CreateEmpresa = () => {
  const { crearEmpresa } = useData();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const empresaData = {
        idEmpresa: 0,
        idUsuario: 0,
        nombre: data.nombre,
        pais: data.pais,
        ciudad: data.ciudad,
        direccion: data.direccion,
        email: data.email,
        contrasenia: data.contrasenia,
        celular: data.celular,
        CuitCuil: data.CuitCuil,
        Carrera: null,
      };
      const result = await crearEmpresa(empresaData);
    } catch (error) {
      errorMessage("Error al registrar la empresa");
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center lg:h-[60vh] lg:items-center dark:bg-[#18181B] light:bg-[#ffffff] rounded-[20px] p-[20px] mt-[100px]">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-2xl sm:text-3xl font-bold  light:text-[#15171a] dark:text-[#f3f3f3]">
            Crear Empresa
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

          <div>
            <label
              htmlFor="nombre"
              className="sr-only light:text-[#15171a] dark:text-[#f3f3f3]"
            >
              Nombre de la Empresa
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm light:text-[#15171a] dark:text-[#f3f3f3]"
                placeholder="nombre de la empresa"
                {...register("nombre", {
                  required: {
                    value: true,
                    message: "El nombre es requerido",
                  },
                })}
              />
              {errors.nombre && (
                <span className="text-[#F31260] text-sm font-epilogue">
                  {errors.nombre.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="pais"
              className="sr-only light:text-[#15171a] dark:text-[#f3f3f3]"
            >
              País
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm light:text-[#15171a] dark:text-[#f3f3f3]"
                placeholder="País"
                {...register("pais", {
                  required: { value: true, message: "El país es requerido" },
                })}
              />
              {errors.pais && (
                <span className="text-[#F31260] text-sm font-epilogue">
                  {errors.pais.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="ciudad"
              className="sr-only light:text-[#15171a] dark:text-[#f3f3f3]"
            >
              Ciudad
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm light:text-[#15171a] dark:text-[#f3f3f3]"
                placeholder="ciudad"
                {...register("ciudad", {
                  required: {
                    value: true,
                    message: "La ciudad es requerida",
                  },
                })}
              />
              {errors.ciudad && (
                <span className="text-[#F31260] text-sm font-epilogue">
                  {errors.ciudad.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="direccion"
              className="sr-only light:text-[#15171a] dark:text-[#f3f3f3]"
            >
              Dirección
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm light:text-[#15171a] dark:text-[#f3f3f3]"
                placeholder="Dirección"
                {...register("direccion", {
                  required: {
                    value: true,
                    message: "La dirección es requerida",
                  },
                })}
              />
              {errors.direccion && (
                <span className="text-[#F31260] text-sm font-epilogue">
                  {errors.direccion.message}
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
                  errors.celular ? "border-red-500" : ""
                } light:text-[#15171a] dark:text-[#f3f3f3]`}
                placeholder="Número de celular"
                {...register("celular", {
                  required: "El número de celular es requerido",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message:
                      "El número de celular debe contener exactamente 10 dígitos numéricos",
                  },
                })}
              />
              {errors.celular && (
                <span className="text-[#F31260] text-sm font-epilogue">
                  {errors.celular.message}
                </span>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="CuitCuil"
              className="sr-only dark:text-[#f3f3f3] light:text-[#15171a]"
            >
              CUIT
            </label>
            <div className="relative">
              <input
                type="text"
                className={`w-full rounded-lg p-4 text-sm shadow-sm ${
                  errors.CuitCuil ? "border-red-500" : ""
                } light:text-[#15171a] dark:text-[#f3f3f3]`}
                placeholder="Número de CUIT"
                {...register("CuitCuil", {
                  required: "El CUIT es requerido",
                  pattern: {
                    value: /^[0-9]{11}$/,
                    message:
                      "El número de CUIT debe contener exactamente 11 dígitos numéricos",
                  },
                })}
              />
              {errors.CuitCuil && (
                <span className="text-[#F31260] text-sm font-epilogue">
                  {errors.CuitCuil.message}
                </span>
              )}
              <div className="flex flex-wrap sm:flex-nowrap items-center p-3 gap-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button type="submit" color="primary">
                    Crear Empresa
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEmpresa;
