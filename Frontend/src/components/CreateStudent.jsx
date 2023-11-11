import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";

import { useData } from "../context/DataContext";
const CreateStudent = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { crearEstudiante } = useData();
  const onSubmit = async (data) => {
    try {
      const estudianteData = {
        idUsuario: 0, // Ajusta el ID de usuario según tu lógica
        email: data.email,
        contrasenia: data.contrasenia,
        dni: data.dni,
        nombre: data.nombre,
        apellido: data.apellido,
        celular: data.celular,
        nacionalidad: data.nacionalidad,
        pais: data.pais,
        ciudad: data.ciudad,
        direccion: data.direccion,
        CuitCuil: data.CuitCuil,
        carrera: data.carrera,
      };

      // Llama a la función para crear un estudiante, pasando los datos
      const result = await crearEstudiante(estudianteData);
      // Aquí puedes manejar la respuesta si es necesario
    } catch (error) {
      errorMessage("Error al registrar el estudiante");
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center lg:h-[60vh] lg:items-center rounded-[20px] p-[20px] mt-[100px]">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-2xl sm:text-3xl font-bold light:text-[#15171a] dark:text-[#f3f3f3]">
            Crear Estudiante
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
              className="sr-only dark:text-[#f3f3f3] light:text-[#15171a]"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg p-4 text-sm shadow-sm "
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
                {...register("dni", {
                  required: "El DNI es requerido",
                  pattern: {
                    value: /^\d{8}$/,
                    message: "El DNI debe contener 8 dígitos numéricos",
                  },
                })}
              />
              {errors.dni && (
                <span className="text-[#F31260] text-sm font-epilogue">
                  {errors.dni.message}
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
                {...register("apellido", {
                  required: {
                    value: true,
                    message: "El apellido es requerido",
                  },
                })}
              />
              {errors.apellido && (
                <span className="text-[#F31260] text-sm font-epilogue">
                  {errors.apellido.message}
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
                {...register("nacionalidad", {
                  required: {
                    value: true,
                    message: "La nacionalidad es requerida",
                  },
                })}
              />
              {errors.nacionalidad && (
                <span className="text-[#F31260] text-sm font-epilogue">
                  {errors.nacionalidad.message}
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
              className="sr-only dark:text-[#f3f3f3] light:text-[#15171a]"
            >
              Ciudad
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg p-4 text-sm shadow-sm light:text-[#15171a] dark:text-[#f3f3f3]"
                placeholder="Ciudad"
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
              className="sr-only dark:text-[#f3f3f3] light:text-[#15171a]"
            >
              Dirección
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg p-4 text-sm shadow-sm light:text-[#15171a] dark:text-[#f3f3f3]"
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
              htmlFor="CuitCuil"
              className="sr-only dark:text-[#f3f3f3] light:text-[#15171a]"
            >
              CuitCuil
            </label>
            <div className="relative">
              <input
                type="text"
                className={`w-full rounded-lg p-4 text-sm shadow-sm ${
                  errors.CuitCuil ? "border-red-500" : ""
                } light:text-[#15171a] dark:text-[#f3f3f3]`}
                placeholder="Número de CUIL"
                {...register("CuitCuil", {
                  required: "El CUIL es requerido",
                  pattern: {
                    value: /^\d{11}$/,
                    message: "El CUIL debe contener 11 dígitos numéricos",
                  },
                })}
              />
              {errors.CuitCuil && (
                <span className="text-[#F31260] text-sm font-epilogue">
                  {errors.CuitCuil.message}
                </span>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="carrera"
              className="sr-only dark:text-[#f3f3f3] light:text-[#15171a]"
            >
              Carrera
            </label>
            <div className="relative">
              <select
                className={`w-full rounded-lg p-4 text-sm shadow-sm ${
                  errors.carrera ? "border-red-500" : ""
                } light:text-[#15171a] dark:text-[#f3f3f3]`}
                {...register("carrera", {
                  required: "Debes seleccionar una carrera",
                })}
              >
                <option value="">Selecciona una Ingenieria</option>
                <option value="Sistemas">Sistemas</option>
                <option value="Quimica">Quimica</option>
                <option value="Industrial">Industrial</option>
                <option value="Mecanica">Mecanica</option>
                <option value="Electrónica">Electrónica</option>
                <option value="Electrica">Electrica</option>
                {/* Agrega más opciones de carrera según tus necesidades */}
              </select>
              {errors.carrera && (
                <span className="text-[#F31260] text-sm font-epilogue">
                  {errors.carrera.message}
                </span>
              )}
            </div>
            <div className="flex flex-wrap sm:flex-nowrap items-center p-3 gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button type="submit" color="primary">
                  Crear Estudiate
                </Button>
              </motion.div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStudent;