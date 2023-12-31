import { useState } from 'react';
import { search, menu, UTN_logo, UTNletra } from '../assets';
import CustomButton from './CustomButton';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { navlinks } from '../constants';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Button } from '@nextui-org/react';
import ModalCreateAdmin from './ModalCreateAdmin';
import ModalCreateJob from './ChangePassword/ModalCreatejob';

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isLogin, logout } = useAuth();
  const { user } = useAuth();
  const location = useLocation();
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="sm:flex  flex-row justify-between gap-4 mt-2 max-w-full   ">
      <div className="sm:flex hidden lg:flex-1  flex flex-row max-w-[458px]   py-2 pl-4 pr-2 h-[52px] bg-[#f3f3f3] rounded-[100px]">
        <input
          type="text"
          placeholder="Buscar empleos"
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-black bg-transparent outline-none "
        />
        <div className="w-[72px] h-full rounded-[20px] bg-[#afb2b7] flex justify-center items-center cursor-pointer">
          <img
            src={search}
            alt="search"
            className="w-[15px] h-[15px] object-contain"
          />
        </div>
      </div>
      <div className="sm:flex hidden gap-4 ">
        {isLogin ? (
          <>
            {user.tipoUsuario === '2' && <ModalCreateJob />}
            <Link to="/">
              <Button
                color="danger"
                size="lg"
                onPress={handleLogout}
                styles="bg-red-600 text-white hover:bg-red-800 "
              >
                Cerrar Sesion
              </Button>
            </Link>
            {user.tipoUsuario == 3 && (
              <Link to="/Admin">
                <Button color="primary" size="lg">
                  Admin Panel
                </Button>
              </Link>
            )}
          </>
        ) : (
          <div className="flex gap-3">
            {' '}
            <Link to="/Login">
              <CustomButton
                btnType=""
                title="Iniciar Sesion"
                // handleClick=""
                styles="bg-[#f3f3f3] text-[#15171a] hover:bg-[#afb2b7] "
              />
            </Link>
            <Link to="/Register">
              <CustomButton
                btnType=""
                title="Registrarse"
                // handleClick={}
                styles="bg-blue-600 text-[#f3f3f3] hover:bg-blue-800 "
              />
            </Link>
          </div>
        )}
      </div>

      {/* MOVIL */}
      <div
        className={`fixed w-full  mt-[-25px] z-50 bg-[#18181B] h-[70px] flex justify-between sm:hidden p-4 `}
      >
        <Link className=" h-[70px] " to="/">
          <img src={UTNletra} alt="logo" className=" " />
        </Link>

        <motion.nav
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          className="menu  mr-[40px] max-w-[200px]  sm:hidden "
        >
          <div className="flex  justify-end mt-[4px]">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsOpen(!isOpen)}
              className=" "
            >
              <img src={menu} alt="movil menu" className="w-[40px] h-[40px] " />
            </motion.button>
          </div>
          <motion.ul
            variants={{
              open: {
                clipPath: 'inset(0% 0% 0% 0% round 10px)',
                transition: {
                  type: 'spring',
                  bounce: 0,
                  duration: 0.7,
                  delayChildren: 0.3,
                  staggerChildren: 0.05
                }
              },
              closed: {
                clipPath: 'inset(10% 50% 90% 50% round 10px)',
                transition: {
                  type: 'spring',
                  bounce: 0,
                  duration: 0.3
                }
              }
            }}
            className="bg-[#f3f3f3] p-4 gap-5 flex flex-col "
          >
            {navlinks.map((link) => (
              <motion.li
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 flex font-epilogue uppercase font-semibold text-[#262526]  cursor-pointer justify-start items-center "
                key={link.name}
                onClick={() => {
                  if (!link.disabled) {
                    navigate(link.link);
                  }
                }}
                variants={itemVariants}
              >
                <img
                  src={link.imgUrl}
                  alt="icon"
                  className="w-[20px] h-[20px] mr-3 cursor-pointer"
                />
                {link.name}
              </motion.li>
            ))}
            <li>
              {isLogin ? (
                <>
                  {user.tipoUsuario === '2' && <ModalCreateJob />}
                  {user.tipoUsuario === '3' && (
                    <Link to="/Admin">
                      <Button color="primary" fullWidth size="md">
                        {' '}
                        Admin Panel
                      </Button>
                    </Link>
                  )}

                  <Link to="/">
                    <Button
                      color="danger"
                      size="md"
                      fullWidth
                      onPress={handleLogout}
                      className="mt-1"
                      styles="bg-red-600 text-white hover:bg-red-800 "
                    >
                      Cerrar Sesion
                    </Button>
                  </Link>
                </>
              ) : (
                <div className="sm:hidden flex gap-3 justify-center  ">
                  <Link to="/Login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9 }}
                      // handleClick=""
                      className="bg-[#afb2b7] rounded-[10px] p-2 font-epilogue text-l font-semibold text-[#15171a] hover:bg-[#7f8084] mb-2  "
                    >
                      Acceder
                    </motion.button>
                  </Link>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    // handleClick={}
                    className="bg-blue-600 rounded-[10px] p-2 font-epilogue text-l font-semibold  text-[#f3f3f3] hover:bg-blue-800 mb-2 "
                  >
                    Inscribirse
                  </motion.button>
                </div>
              )}
            </li>
          </motion.ul>
        </motion.nav>
      </div>
    </div>
  );
};

export default Navbar;
