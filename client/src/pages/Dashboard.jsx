import "bootstrap-icons";
import "remixicon";
import "bootstrap";

import React from "react";
import Bebidas from "./Bebidas";

function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="a">
      <h1 className={style.a}>Dashboard</h1>
      /*
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
