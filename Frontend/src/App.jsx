import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar, Perfil, Sidebar } from "./components";
import { Error404, Home, JobDetail, Jobs, Login } from "./pages";
import { useAuth } from "./context/AuthContext";

function App() {
  const {isLogin} = useAuth();
  return (
    <div className="relative sm:-8 p-4 dark:bg-[#151719]  min-h-screen flex flex-row ">
      {/* Mostrar Sidebar en todas las rutas excepto "/Login" */}

      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>

      <div className="flex-1 max-sm:w-full  mx-auto sm:pr-5 ">
        {/* Mostrar Navbar en todas las rutas  */}
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="*" element={<Login />} />

{isLogin && (
  <>
          <Route path="/empleos" element={<Jobs />} />
          <Route path="/empleos" element={<Jobs />} />
          <Route path="/empleos/:id" element={<JobDetail />} />
          <Route path="/perfil" element={<Perfil />} />
          </>
)}
          

        </Routes>
      </div>
    </div>
  );
}

export default App;
