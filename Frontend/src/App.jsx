import { Route, Routes, useNavigate } from "react-router-dom";
import {
  BotButton,
  ChangePassword,
  ChangePasswordForm,
  CodeChangePassword,
  Navbar,
  Perfil,
  Sidebar,
  UpdateUser,
  AdminABM,
  ModalCreateAdmin,
  CreateUserAdmin,
  CreateStudent,
} from "./components";
import {
  AdminPanel,
  Error404,
  Home,
  JobDetail,
  Jobs,
  Login,
  MyAplicatedJobs,
  Register,
} from "./pages";
import { useAuth } from "./context/AuthContext";
import LoadingSpinner from "./components/LoadingSpinner";
import { useLoading } from "./context/LoadingContext";
import { ToastContainer } from "react-toastify";

function App() {
  const { isLogin, user } = useAuth();
  const { isLoading } = useLoading();
  return (
    <div className="relative sm:-8 p-4 dark:bg-[#151719]  min-h-screen flex flex-row ">
      {/* Mostrar Sidebar en todas las rutas excepto "/Login" */}
      <ToastContainer />
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>

      <div className="flex-1 max-sm:w-full  mx-auto sm:pr-5 ">
        {/* Mostrar Navbar en todas las rutas  */}
        <Navbar />

        <BotButton />
        {isLoading && <LoadingSpinner />}
        <Routes>
          <Route path="/Register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="*" element={<Login />} />
          <Route path="/cambiar-contrasena" element={<ChangePassword />} />
          <Route
            path="/cambiar-contrasena/codigo"
            element={<CodeChangePassword />}
          />
          <Route
            path="/cambiar-contrasena/formulario"
            element={<ChangePasswordForm />}
          />

          {isLogin && (
            <>
              <Route path="/postulaciones" element={<MyAplicatedJobs />} />
              <Route path="/empleos" element={<Jobs />} />
              <Route path="/empleos/:id" element={<JobDetail />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/modificarusuario" element={<UpdateUser />} />
              {user.tipoUsuario === "3" ? (
                <Route path="/Admin" element={<AdminPanel />} />
              ) : (
                <>
                  {" "}
                  <Route path="/Login" element={<Login />} />
                </>
              )}
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
