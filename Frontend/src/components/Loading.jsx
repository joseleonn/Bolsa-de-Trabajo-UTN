import React from "react";
import { motion } from "framer-motion";
import { UTN_logo } from "../assets";

const Loading = () => {
  return (
    <div className="card fixed inset-0 flex items-center justify-center ">
      <div className="w-32 h-32 relative">
        <svg viewBox="0 0 100 100" className="absolute w-full h-full">
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="10"
            stroke="gray"
            initial={{ strokeDasharray: "0 100" }}
            animate={{ strokeDasharray: "100 0" }}
            transition={{ ease: "linear", duration: 2, repeat: Infinity }}
          />
        </svg>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <motion.div
            className="w-20 h-20 bg-[#f3f3f3] p-[5px] rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <img src={UTN_logo} alt="LOGO" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
