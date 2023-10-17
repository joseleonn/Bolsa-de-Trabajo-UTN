import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { LoginForm } from "../components";
const Login = () => {
  const {isLogin } = useAuth()
  const navigate = useNavigate();
  const [isChange, setIsChange] = useState(false)
  const isChangeActive = (status) =>{
    setIsChange(status)
  }


  useEffect(() => {
    if (isLogin) {
      navigate('/empleos')
    }
  },[isLogin])
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <section className="flex justify-center h-screen  ">
        <ToastContainer/>
        {/* Contenido del formulario */}
        <LoginForm isChangeActive={isChangeActive}/>
      </section>
    </motion.div>
  );
};

export default Login;
