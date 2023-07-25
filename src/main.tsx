import React from "react";
import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import ThemeProvider, { ThemedGlobalStyle } from "./theme";
import router from "./router/router";
import { Provider as ToastComponentProvider } from "@radix-ui/react-toast";
import ToastContextProvider from "./contexts/toast/ToastProvider";
import UserProvider from "./contexts/user/UserProvider";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <UserProvider>
        <ToastComponentProvider duration={3000}>
          <ToastContextProvider>
            <ThemedGlobalStyle />
            <RouterProvider router={router} />
          </ToastContextProvider>
        </ToastComponentProvider>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
);
