import { Typewriter } from "react-simple-typewriter";
import { UTN_logo_white } from "../assets";
import { motion } from "framer-motion";

import CustomButton from "../components/CustomButton";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

const Home = () => {
  const [showText, setShowText] = useState(false);
  const [showText2, setShowText2] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowText(true);
    }, 1000); // Delay in milliseconds before showing the text
    const timeout2 = setTimeout(() => {
      setShowText2(true);
    }, 3500); // Delay in milliseconds before showing the text

    return () => {
      clearTimeout(timeout, timeout2);
    };
  }, []);
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        animate={{ opacity: 1 }}
        className="flex flex-1 justify-center items-center h-screen"
      >
        <div className="flex flex-col mt-20 max-w-[60%] max-h-screen min-w-[60%] ">
          <h1 className="text-6xl font-epilogue font-semibold  text-[#f3f3f3] tracking-tight lg:text-8xl  h-10">
            <Typewriter
              words={["Hola!"]}
              cursor
              cursorStyle=""
              typeSpeed={80}
              deleteSpeed={40}
              delaySpeed={1000}
            />
          </h1>

          <h1 className="text-6xl font-epilogue font-semibold  text-[#f3f3f3] tracking-tight lg:text-8xl mt-[50px]  ">
            {showText && (
              <Typewriter
                words={["Econtrá el trabajo de tus"]}
                cursor
                cursorStyle=""
                typeSpeed={80}
                deleteSpeed={40}
                delaySpeed={1000}
              />
            )}
            <span className=" text-6xl lg:text-8xl font-epilogue font-semibold text-blue-600">
              {" "}
              {showText2 && (
                <Typewriter
                  words={[" sueños!"]}
                  cursor
                  cursorStyle=""
                  typeSpeed={80}
                  deleteSpeed={40}
                  delaySpeed={1000}
                />
              )}
            </span>
          </h1>
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

      <div className="w-full bg-[#262526]">hola</div>
    </div>
  );
};

export default Home;
