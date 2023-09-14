import { Button } from "@nextui-org/react";
import { UTN_logo_white } from "../assets";

import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="relative flex flex-col justify-center  items-center lg:flex-row lg:h-screen lg:items-center">
      
      

      {/* Contenido del formulario */}
      <div className="w-full px-4 py-8 sm:px-6 sm:py-12 lg:w-1/2 lg:px-8 lg:py-24 bg-[#f3f3f3] rounded-[20px] shadow-xl ">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#15171a]">Bolsa De Trabajo</h1>
          <p className="mt-4 text-[#15171a]">Universidad Tecnológica Nacional</p>
          <p className="text-[#15171a]">Facultad Regional Rosario</p>
        </div>

        <form className="mx-auto mt-8 max-w-md space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="pepito@frro.utn.edu.ar"
              />

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
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Contraseña"
              />

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
            <Button color="primary" variant="solid">
              Iniciar sesión
            </Button>
            <Link to={"/"}>
              <Button color="primary" variant="flat">
                Volver
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
