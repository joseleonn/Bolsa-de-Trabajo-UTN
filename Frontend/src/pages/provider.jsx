import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Router } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";

export function Providers({ children }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
      <AuthProvider>

        {children}
        </AuthProvider>
      </NextThemesProvider>
      
    </NextUIProvider>
  );
}
