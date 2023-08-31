import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UTN_logo, sun } from "../assets";
import { navlinks } from "../constants";
import { motion } from "framer-motion";

const Icon = ({ styles, name, imgUrl, isActive, disable, handleClick }) => (
  <motion.div
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className={`w-[48px] h-[48px] rounded-full ${
      isActive && isActive === name && "bg-[#afb2b7]"
    } flex justify-center items-center ${
      !disable && "cursor-pointer"
    } ${styles}`}
    onClick={handleClick}
  >
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
    ) : (
      <img
        src={imgUrl}
        alt="fund_logo"
        className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
      />
    )}
  </motion.div>
);
const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link className="" to="/">
        <Icon styles="w-[70px] h-[70px] bg-[#f3f3f3]  " imgUrl={UTN_logo} />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#f3f3f3] rounded-[54px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>
        <Icon styles="bg-[1c1c24] shadow-secondary" imgUrl={sun} />
      </div>
    </div>
  );
};

export default Sidebar;
