import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("authToken") || "");
  const [reservationId, setReservationId] = useState(null);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("authToken", newToken);
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem("authToken");
  };

  const setReservaId = (id) => {
    setReservationId(id);
  };

  return (
    <AuthContext.Provider
      value={{ token, login, logout, reservationId, setReservaId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
