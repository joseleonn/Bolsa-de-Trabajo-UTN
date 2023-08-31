import React from "react";
import { motion } from "framer-motion";

const CustomButton = ({ btnType, title, handleClick, styles }) => {
  return (
    <div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        type={btnType}
        className={`font-epilogue font-semibold text-[16px] leading-[26px]  min-h-[52px] px-4 rounded-[54px]  transition ${styles}`}
        onClick={handleClick}
      >
        {title}
      </motion.button>
    </div>
  );
};

export default CustomButton;
