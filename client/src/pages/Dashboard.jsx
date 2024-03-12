import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <div className="">
      <h1 className="">Dashboard</h1>;
      <button onClick={handleLogout}>Cerrar sesion</button>;
    </div>
  );
}

export default Dashboard;
