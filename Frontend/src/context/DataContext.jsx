import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useLoading } from '../context/LoadingContext';
import useNotify from '../hooks/useNotify';
const DataContext = createContext();

const student = '1';
const companyId = '2';
export const DataProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [empresa, setEmpresa] = useState({
    idEmpresa: 0,
    idUsuario: 0,
    nombre: '',
    pais: '',
    ciudad: '',
    direccion: '',
    cuitCuil: ''
  });

  const [userData, setUserData] = useState({});
  const [studentData, setStudentData] = useState({
    email: '',
    dni: '',
    nombre: '',
    apellidos: '',
    celular: '',
    nacionalidad: '',
    pais: '',
    ciudad: '',
    direccion: '',
    curriculum: '',
    CuitCuil: '',
    carrera: '',
    estado: 0,
    curriculum: ''
  });
  const [jobsAplicated, setJobsAplicated] = useState([]);
  const { toggleLoading, isLoading } = useLoading();
  const { successMessage, errorMessage } = useNotify();
  const { user } = useAuth();
  const [dataFetched, setDataFetched] = useState(false);

  const crearEmpresa = async (data) => {
    try {
      toggleLoading(true);
      console.log(data);

      const response = await axios.post(
        'https://localhost:7197/CargarEmpresa',
        {
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
          Carrera: '0'
        }
      );
      // La empresa se creó con éxito
      successMessage('La empresa se creó con éxito.');
    } catch (error) {
      // Manejar errores de la solicitud
      errorMessage('Ocurrió un error al crear la empresa.');
    } finally {
      toggleLoading(false); // Finalizar el estado de carga
    }
  };

  const crearEstudiante = async (data) => {
    try {
      toggleLoading(true);
      console.log(data);
      // Copia los datos para manipulación antes de la solicitud
      const estudianteData = {
        email: data.email,
        contrasenia: data.contrasenia,
        curriculum: null,
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
        curriculum: null
      };

      // Lógica adicional aquí, si es necesario

      // Realiza la llamada al backend
      const response = await axios.post(
        'https://localhost:7197/api/Student/CrearUsuarioEstudiante',
        estudianteData
      );

      // Puedes mostrar un mensaje de éxito
      if (response.status === 201) {
        // const newUser = {
        //   idUsuario: response.data.idUsuario,
        //   email: response.data.email,
        //   contrasenia: response.data.email,
        //   tipoUsuario: response.data.tipoUsuario,
        //   cuitCuil: null,
        //   carrera: null
        // };
        // setUserData((prevUserData) => [...prevUserData, newUser]);
        successMessage('El estudiante se creó con éxito.');
      }
    } catch (error) {
      // Maneja los errores de la solicitud
      errorMessage('Ocurrió un error al crear el estudiante.');
    } finally {
      toggleLoading(false); // Finaliza el estado de carga
    }
  };
  useEffect(() => {
    const getJobs = async () => {
      if (user) {
        try {
          const response = await axios.get(
            'https://localhost:7197/ListaEmpleos',
            {
              headers: {
                Authorization: `Bearer ${user.token}` // Agrega el token JWT en el encabezado 'Authorization'
              }
            }
          );
          setJobs([...response.data]);
        } catch (error) {
          console.error('Error al traer empleos', error);
        }
      }
    };

    getJobs();
  }, [jobs, user]);
  useEffect(() => {
    const getEmpresas = async () => {
      {
        try {
          const response = await axios.get(
            'https://localhost:7197/ListaEmpresas',
            {
              headers: {
                Authorization: `Bearer ${user.token}` // Agrega el token JWT en el encabezado 'Authorization'
              }
            }
          );
          setEmpresa([...response.data]);
        } catch (error) {
          console.error('Error al traer empresas', error);
        }
      }
    };

    getEmpresas();
  }, [user]);

  useEffect(() => {
    const getDataStudent = async () => {
      if (user.tipoUsuario === student) {
        try {
          const response = await axios.get(
            `https://localhost:7197/api/Student/${user.idUser}`,
            {
              headers: {
                Authorization: `Bearer ${user.token}` // Agrega el token JWT en el encabezado 'Authorization'
              }
            }
          );
          setStudentData({ ...response.data });
        } catch (error) {
          console.error('Error al traer empleos', error);
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
                Authorization: `Bearer ${user.token}` // Agrega el token JWT en el encabezado 'Authorization'
              }
            }
          );
          setJobsAplicated([...response.data]);
        } catch (error) {
          console.error('Error al traer empleos', error);
        }
      }
    };
    getJobsAplicated();
  }, [user]);

  useEffect(() => {
    const getDataCompany = async () => {
      if (user.tipoUsuario === companyId) {
        try {
          const response = await axios.get(
            `https://localhost:7197/BuscarEmpresa/${user.idUser}`,
            {
              headers: {
                Authorization: `Bearer ${user.token}` // Agrega el token JWT en el encabezado 'Authorization'
              }
            }
          );
          setEmpresa({ ...response.data });
        } catch (error) {
          console.error('Error al traer la empresa', error);
        }
      }
    };

    getDataCompany();
  }, [user]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && !dataFetched) {
        try {
          const response = await axios.get(
            'https://localhost:7197/api/Usuario',
            {
              headers: {
                Authorization: `Bearer ${user.token}`
              }
            }
          );
          setUserData([...response.data]);
          setDataFetched(true); // Marca que la solicitud se ha completado
        } catch (error) {
          console.error('Error al traer usuarios', error);
        }
      }
    };

    fetchUserData();
    console.log(userData);
  }, [user, dataFetched]);

  const handleDelete = async (userId) => {
    try {
      console.log(userId);
      const response = await axios.post(
        `https://localhost:7197/api/Admin/DeleteUser/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}` // Agrega el token JWT en el encabezado 'Authorization'
          }
        }
      );
      setUserData((prevUserData) =>
        prevUserData.filter((user) => user.idUsuario !== userId)
      );

      successMessage('Usuario Eliminado!');
    } catch (error) {
      console.error('Error al eliminar usuario empleos', error);
      errorMessage('Error al eliminar usuario');
    } finally {
      toggleLoading(false);
    }
  };

  const addjob = async (data) => {
    try {
      toggleLoading(true);
      console.log(data);

      const response = await axios.post('https://localhost:7197/CargarEmpleo', {
        idEmpresa: data.idEmpresa,
        idUsuario: user.idUser,
        descripcion: data.descripcion,
        titulo: data.titulo,
        carrera: data.carrera
      });
      // La empresa se creó con éxito
      successMessage('El puesto se creó con éxito.');
    } catch (error) {
      // Manejar errores de la solicitud
      errorMessage('Ocurrió un error al crear el puesto.');
    } finally {
      toggleLoading(false); // Finalizar el estado de carga
    }
  };

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
        userData,
        handleDelete,
        addjob,
        empresa
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
    throw new Error('useData debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};
