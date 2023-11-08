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
    <div className="relative sm:-8 p-4 dark:bg-[#151719] min-h-screen flex flex-row">
      <ToastContainer />
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>

      <div className="flex-1 max-sm:w-full mx-auto sm:pr-5">
        <Navbar />
        <BotButton />
        {isLoading && <LoadingSpinner />}
        <Routes>
          <Route path="/Register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/cambiar-contrasena" element={<ChangePassword />} />
          <Route
            path="/cambiar-contrasena/codigo"
            element={<CodeChangePassword />}
          />
          <Route
            path="/cambiar-contrasena/formulario"
            element={<ChangePasswordForm />}
          />
          <Route path="/404" element={<Error404 />} />

          {isLogin && (
            <>
              <Route path="/postulaciones" element={<MyAplicatedJobs />} />
              <Route path="/empleos" element={<Jobs />} />
              <Route path="/empleos/:id" element={<JobDetail />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/modificarusuario" element={<UpdateUser />} />
              {user.tipoUsuario === "3" && (
                <Route path="/Admin" element={<AdminPanel />} />
              )}
              {user.tipoUsuario !== "3" && (
                <Route path="/Admin" element={() => <Navigate to="/404" />} />
              )}
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
