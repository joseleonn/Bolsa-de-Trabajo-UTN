import React from "react";
import { UTN_logo } from "../assets";

const Navbar = () => {
  return (
    <div className="bg-[#262526] flex w-full">
      <div className="border bg-white border-2 rounded-full  border-[#262526] ">
        <img
          src={UTN_logo}
          alt="Universidad Tecnologica Nacional"
          className="w-[70px] h-[70px] p-1"
        />
      </div>
    </div>
  );
};

export default Navbar;
