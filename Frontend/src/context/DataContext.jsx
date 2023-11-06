import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useLoading } from "../context/LoadingContext";
import useNotify from "../hooks/useNotify";
const DataContext = createContext();

const student = "1";
export const DataProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [studentData, setStudentData] = useState({
    email: "",
    dni: "",
    nombre: "",
    apellidos: "",
    celular: "",
    nacionalidad: "",
    pais: "",
    ciudad: "",
    direccion: "",
    curriculum: "",
  });
  const [jobsAplicated, setJobsAplicated] = useState([]);
  const { toggleLoading, isLoading } = useLoading();
  const { successMessage, errorMessage } = useNotify();
  const { user } = useAuth();

  const crearEmpresa = async (data) => {
    try {
      toggleLoading(true);

      const response = await axios.post(
        "https://localhost:7197/CargarEmpresa",
        {
          idEmpresa: 0,
          idUsuario: 1,
          nombre: data.nombre,
          pais: data.pais,
          ciudad: data.ciudad,
          direccion: data.direccion,
        }
      );
      // La empresa se creó con éxito
      successMessage("La empresa se creó con éxito.");
    } catch (error) {
      // Manejar errores de la solicitud
      errorMessage("Ocurrió un error al crear la empresa.");
    } finally {
      toggleLoading(false); // Finalizar el estado de carga
    }
  };

  const crearEstudiante = async (data) => {
    try {
      toggleLoading(true);

      const response = await axios.post(
        "https://localhost:7197/api/Student/CrearUsuarioEstudiante",
        {
          idUsuario: data.idUsuario,
          email: data.email,
          contrasenia: data.contrasenia,
          tipoUsuario: data.tipoUsuario,
          dni: data.dni,
          nombre: data.nombre,
          curriculum: data.curriculum,
          apellido: data.apellido,
          celular: data.celular,
          nacionalidad: data.nacionalidad,
          pais: data.pais,
          ciudad: data.ciudad,
          direccion: data.direccion,
        }
      );

      // Si la solicitud es exitosa, puedes manejar la respuesta aquí si es necesario

      // Puedes mostrar un mensaje de éxito
      successMessage("El estudiante se creó con éxito.");
    } catch (error) {
      // Maneja los errores de la solicitud
      errorMessage("Ocurrió un error al crear el estudiante.");
    } finally {
      toggleLoading(false); // Finaliza el estado de carga
    }
  };
  useEffect(() => {
    const getJobs = async () => {
      if (user) {
        try {
          const response = await axios.get(
            "https://localhost:7197/ListaEmpleos",
            {
              headers: {
                Authorization: `Bearer ${user.token}`, // Agrega el token JWT en el encabezado 'Authorization'
              },
            }
          );
          setJobs([...response.data]);
        } catch (error) {
          console.error("Error al traer empleos", error);
        }
      }
    };

    getJobs();
  }, [jobs, user]);

  useEffect(() => {
    const getDataStudent = async () => {
      if (user.tipoUsuario === student) {
        try {
          const response = await axios.get(
            `https://localhost:7197/api/Student/${user.idUser}`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`, // Agrega el token JWT en el encabezado 'Authorization'
              },
            }
          );
          setStudentData({ ...response.data });
        } catch (error) {
          console.error("Error al traer empleos", error);
        }
      }
    };

    getDataStudent();
  }, [user]);

  useEffect(() => {
    const getJobsAplicated = async () => {
      if (user.tipoUsuario === student) {
        try {
          const response = await axios.get(
            `https://localhost:7197/api/Job/MisPostulaciones/${user.idUser}`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`, // Agrega el token JWT en el encabezado 'Authorization'
              },
            }
          );
          setJobsAplicated([...response.data]);
        } catch (error) {
          console.error("Error al traer empleos", error);
        }
      }
    };

    getJobsAplicated();
  }, [user]);
  return (
    <DataContext.Provider
      value={{
        jobs,
        setJobs,
        studentData,
        setStudentData,
        jobsAplicated,
        setJobsAplicated,
        crearEmpresa,
        crearEstudiante,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData debe ser utilizado dentro de un AuthProvider");
  }
  return context;
};
