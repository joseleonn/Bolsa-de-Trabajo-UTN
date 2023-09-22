import { Typewriter } from "react-simple-typewriter";
import { UTN_logo_white } from "../assets";
import { motion } from "framer-motion";

import { Guia } from "../components";
import { StudentsGuia, CompaniesGuia } from "../constants";

const Home = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        animate={{ opacity: 1 }}
        className="flex flex-1  h-screen"
      >
        <div className="flex flex-col justify-center   ">
          <div>
            <h1 className="text-8xl font-epilogue font-semibold  dark:text-[#f3f3f3] tracking-tight lg:text-8xl  light:text-[#000000]">
              Bolsa de <span className="text-blue-600"> Trabajo</span>
            </h1>
          </div>
          <div className="ml-[5px]   min-h-[150px] ">
            <h4 className="text-xl font-epilogue   dark:text-[#7f8084] tracking-tight lg:text-2xl light:text-[#000000]  ">
              <Typewriter
                words={[
                  "Encontrá el trabajo de tus sueños.",
                  "Oportunidades Laborales.",
                  "Contacta con Empresas.",
                ]}
                cursor
                cursorStyle=""
                typeSpeed={80}
                deleteSpeed={40}
                delaySpeed={1000}
                loop={100}
              />
            </h4>
          </div>
        </div>
        <div className="hidden lg:flex mt-20 ">
          <div className="">
            <img
              src={UTN_logo_white}
              alt="Universidad Tecnologica Nacional"
              className="h-[60vh] w-[60vh] m-0 "
            />

            <h1 className="hidden flex justify-center lg:flex text-center font-epilogue text-[#f3f3f3] text-[80px] font-bold -mt-20">
              U T N
            </h1>
          </div>
        </div>
      </motion.div>

      {/* Guide for students */}
      <Guia
        title="Bolsa de trabajo para Estudiantes"
        description=" La Secretaría de Asuntos Universitarios de la Universidad Tecnológica
        Nacional Facultad Regional Rosario, te invita a ingresar tu CV en el
        Sistema Virtual de Búsqueda de Empleo para que encuentres el trabajo o
        la pasantía que estás buscando. Esta es una base en la cual podes
        actualizar tus datos cuantas veces quieras (y es recomendable que lo
        hagas periódicamente) e inscribirte a las ofertas que proponen las
        empresas o instituciones."
        StudentOrCompany={StudentsGuia}
      />

      {/* Guide for Companies */}

      <Guia
        title="Información para Empresas"
        description="Para publicar búsquedas laborales en el Sistema Virtual de Búsqueda de Empleo se deberá cumplir con lo siguiente:"
        StudentOrCompany={CompaniesGuia}
      />
    </div>
  );
};

export default Home;
