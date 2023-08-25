import CustomButton from "./CustomButton";

const Navbar = () => {
  return (
    <div className="sm:flex hidden flex-row justify-end gap-4">
      <CustomButton
        btnType=""
        title="Ingresar"
        handleClick=""
        styles="bg-white text-[#262526] "
      />
    </div>
  );
};

export default Navbar;
