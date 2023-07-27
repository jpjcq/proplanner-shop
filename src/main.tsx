import React from "react";
import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import ThemeProvider, { ThemedGlobalStyle } from "./theme";
import router from "./router/router";
import ToastProvider from "./contexts/toast/ToastProvider";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <ThemedGlobalStyle />
        <RouterProvider router={router} />
      </ToastProvider>
    </ThemeProvider>
  </React.StrictMode>
);
