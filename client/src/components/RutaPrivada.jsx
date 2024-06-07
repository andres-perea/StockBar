import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const isAuthenticated = () => {
    return localStorage.getItem("authToken") !== null;
  };

  return isAuthenticated() ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
