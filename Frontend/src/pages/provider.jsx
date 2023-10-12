import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Router } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { DataProvider } from "../context/DataContext";
import { LoadingProvider } from "../context/LoadingContext";

export function Providers({ children }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <LoadingProvider>
      <AuthProvider>
      <DataProvider>
        {children}
        </DataProvider>
        </AuthProvider>
        </LoadingProvider>
      </NextThemesProvider>
      
    </NextUIProvider>
  );
}
