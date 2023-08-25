import { useState } from "react";
import { Navbar } from "./components";

function App() {
  return (
    <div className="relative sm:-8 p-4 bg-[#262526] min-h-screen flex flex-row ">
      <div className="ml-[10px] mt-[10px] flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
      </div>
    </div>
  );
}

export default App;
