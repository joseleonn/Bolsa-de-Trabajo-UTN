import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar, Sidebar } from "./components";
import { Home, Login } from "./pages";

function App() {
  const location = useLocation();

  return (
    <div className="relative sm:-8 p-4 bg-[#151719] min-h-screen flex flex-row ">
      {/* Mostrar Sidebar en todas las rutas excepto "/Login" */}
     
        <div className="sm:flex hidden mr-10 relative">
          <Sidebar />
        </div>


      <div className="flex-1 max-sm:w-full  mx-auto sm:pr-5">
        {/* Mostrar Navbar en todas las rutas excepto "/Login" */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
