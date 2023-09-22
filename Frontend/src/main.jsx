import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";

import { BrowserRouter as Router } from "react-router-dom";
import { Providers } from "./pages/provider.jsx";
// Define tu tema oscuro
const darkTheme = {
  type: "dark",
  palette: {
    // Aquí puedes personalizar los colores de tu tema oscuro
    // Por ejemplo:
    primary: "blue",
    secondary: "red",
    // etc.
  },
};
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Providers>
        <main className="dark text-foreground bg-background">
          <App />
        </main>
      </Providers>
    </Router>
  </React.StrictMode>
);
