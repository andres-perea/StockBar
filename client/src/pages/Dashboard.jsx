import React from "react";
import Bebidas from "./Bebidas";

function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="">
      <h1 className="">Dashboard</h1>
      <div>
        <Bebidas />
        <button className="boton" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
