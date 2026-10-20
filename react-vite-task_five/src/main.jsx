import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/scss/all.scss";

import { RouterProvider } from "react-router-dom";
import router from "./router";
import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
    "$1",
  );
  const [authToken, setAuthToken] = useState(token);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
