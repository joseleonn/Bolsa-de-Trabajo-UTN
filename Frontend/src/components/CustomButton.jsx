import React from "react";

const CustomButton = ({ btnType, title, handleClick, styles }) => {
  return (
    <div>
      <button
        type={btnType}
        className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[54px] hover:bg-[#afb2b7] transition ${styles}`}
        onClick={handleClick}
      >
        {" "}
        {title}
      </button>
    </div>
  );
};

export default CustomButton;
