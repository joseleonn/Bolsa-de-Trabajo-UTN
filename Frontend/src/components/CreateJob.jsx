import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
const carreraOptions = {
  1: "Ingeniería Civil",
  2: "Ingeniería Eléctrica",
  3: "Ingeniería Química",
  4: "Ingeniería Mecánica",
  5: "Ingeniería en Sistemas de Información",
};

const CreateJob = () => {
  const { addjob, empresa } = useData();
  const { user } = useAuth(empresa.idEmpresa);
  // Find the company that matches the idUser
  //const matchingCompany = empresa.find(
  //  (comp) => comp.idUsuario.toString() === user.idUser
  //);
  //console.log(matchingCompany);
  //// Extract idEmpresa if matchingCompany exists, otherwise set to null
  //const Empresaid = matchingCompany ? matchingCompany.idEmpresa : null;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const jobData = {
        idEmpresa: empresa.idEmpresa,
        descripcion: data.descripcion,
        titulo: data.titulo,
        disponible: true, // Convert string to boolean
        carrera: data.carrera,
      };
      console.log(jobData);

      const result = await addjob(jobData);
      // Handle success or navigate to another page if needed
    } catch (error) {
      console.error("Error al agregar el trabajo", error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center lg:h-[60vh] lg:items-center dark:bg-[#18181B] light:bg-[#ffffff] rounded-[20px] p-[20px] mt-[100px]">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-2xl sm:text-3xl font-bold light:text-[#15171a] dark:text-[#f3f3f3]">
            Agregar Trabajo
          </h1>
        </div>

        <form
          className="mx-auto mt-8 max-w-md space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label htmlFor="descripcion" className="sr-only">
              Descripción
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm"
                placeholder="Descripción"
                {...register("descripcion", {
                  required: "La descripción es requerida",
                })}
              />
              {errors.descripcion && (
                <span className="text-[#F31260] text-sm font-epilogue">
                  {errors.descripcion.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="titulo" className="sr-only">
              Título
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm"
                placeholder="Título"
                {...register("titulo", {
                  required: "El título es requerido",
                })}
              />
              {errors.titulo && (
                <span className="text-[#F31260] text-sm font-epilogue">
                  {errors.titulo.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="carrera" className="sr-only">
              Carrera
            </label>
            <div className="relative">
              <select
                {...register("carrera", {
                  required: "La carrera es requerida",
                })}
                className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm"
              >
                {Object.entries(carreraOptions).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              {errors.carrera && (
                <span className="text-[#F31260] text-sm font-epilogue">
                  {errors.carrera.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center p-3 gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
              <Button type="submit" color="primary">
                Agregar Trabajo
              </Button>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateJob;
