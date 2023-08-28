import { search } from "../assets";
import CustomButton from "./CustomButton";

const Navbar = () => {
  return (
    <div className="sm:flex hidden flex-row justify-between gap-4 mt-2">
      <div className="lg:flex-1  flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#f3f3f3] rounded-[100px]">
        <input
          type="text"
          placeholder="Buscar empleos"
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none "
        />
        <div className="w-[72px] h-full rounded-[20px] bg-[#afb2b7] flex justify-center items-center cursor-pointer">
          <img
            src={search}
            alt="search"
            className="w-[15px] h-[15px] object-contain"
          />
        </div>
      </div>
      <div className="flex gap-4 mr-[15px] ">
        <CustomButton
          btnType=""
          title="Iniciar Sesion"
          handleClick=""
          styles="bg-[#f3f3f3] text-[#262526] hover:bg-[#afb2b7] "
        />

        <CustomButton
          btnType=""
          title="Inscribirse"
          handleClick=""
          styles="bg-blue-600 text-[#f3f3f3] hover:bg-blue-800 "
        />
      </div>
    </div>
  );
};

export default Navbar;
