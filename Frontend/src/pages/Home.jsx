import { Typewriter } from "react-simple-typewriter";
import { UTN_logo_white } from "../assets";
import CustomButton from "../components/CustomButton";

const Home = () => {
  return (
    <div className="">
      <h1 className="text-3xl  font-epilogue font-semibold  text-[#f3f3f3] tracking-tight sm:text-7xl text-white h-10 max-w-[60%] mt-20">
        <Typewriter
          words={["Hola!", "Encontra el trabajo de tu sueños!"]}
          loop={1}
          cursor
          typeSpeed={120}
          deleteSpeed={50}
          delaySpeed={1000}

          // onLoopDone={handleDone}
          // onType={handleType}
        />
      </h1>

      <div className="hidden lg:flex justify-end  -mr-[20px] -mt-[60px] ">
        <div className="">
          <img
            src={UTN_logo_white}
            alt="Universidad Tecnologica Nacional"
            className="h-[60vh] w-[60vh] m-0 "
          />
          <h1 className="hidden lg:flex text-center font-epilogue text-[#f3f3f3] text-[80px] font-bold ml-[80px] -mt-[60px]">
            U T N
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
