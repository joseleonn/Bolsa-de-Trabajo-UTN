import React from "react";
import RegisterForm from "../components/RegisterForm";
import { motion } from "framer-motion";
const Register = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <RegisterForm />
    </motion.div>
  );
};
export default Register;
