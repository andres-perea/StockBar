import React, { useEffect, useState } from "react";
import {
  MdOutlineDashboard,
  MdOutlineLogout,
  MdLocalDrink,
  MdInbox,
  MdOutlineCategory,
  MdOutlineMenu,
  MdClose,
} from "react-icons/md";
import "../index.css";
import { Link } from "react-router-dom";
import GraficoBebidas from "../components/Graficos";

function Dashboard() {
  const [sidebar, setSidebar] = useState(false);

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <>
      <div className="min-h-screen grid grid-col-1 lg:grid-cols-6">
        {/* Sidebar */}
        <div
          className={`fixed lg:static w-[80%] md:w-[40%] lg:w-full top-0 z-50 bg-white transition-all ${
            sidebar ? "-left-0" : "-left-full"
          } w-full h-full col-span-1 p-8 border-r`}
        >
          {/* LOGO */}
          <div className="text-center p-8">
            <h1 className="font-bold tracking-[4px]">StockBar</h1>
          </div>
          <div className="flex flex-col justify-between h-[500px]">
            {/* MENU */}
            <nav>
              <ul>
                <li>
                  <a
                    href=""
                    className="flex 
                  items-center 
                  gap-4 
                  hover:bg-red-600 
                  p-4 
                  text-gray-500 
                  hover:text-white 
                  rounded-lg 
                  transition-colors 
                  font-semibold"
                  >
                    <MdOutlineDashboard />
                    Dashboard
                  </a>
                </li>
                <Link to="/bebidas">
                  <li>
                    <a
                      href=""
                      className="flex 
                  items-center 
                  gap-4
                  hover:bg-red-600 
                  p-4 
                  text-gray-500 
                  hover:text-white 
                  rounded-lg 
                  transition-colors 
                  font-semibold"
                    >
                      <MdLocalDrink />
                      Bebidas
                    </a>
                  </li>
                </Link>
                <li>
                  <a
                    href=""
                    className="flex 
                  items-center 
                  gap-4 
                  hover:bg-red-600 
                  p-4 
                  text-gray-500 
                  hover:text-white 
                  rounded-lg 
                  transition-colors 
                  font-semibold"
                  >
                    <MdInbox />
                    Pedidos
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    className="flex 
                  items-center 
                  gap-4 
                  hover:bg-red-600 
                  p-4 
                  text-gray-500 
                  hover:text-white 
                  rounded-lg 
                  transition-colors 
                  font-semibold"
                  >
                    <MdOutlineCategory />
                    Categorias
                  </a>
                </li>
              </ul>
            </nav>
            {/* Cerrar sesion */}
            <div className="flex flex-col gap-4">
              <button
                onClick={handleLogout}
                className="flex 
                  items-center 
                  gap-5 
                  hover:bg-red-600 
                  p-4 
                  text-gray-500 
                  hover:text-white 
                  rounded-lg 
                  transition-colors 
                  font-semibold"
              >
                <MdOutlineLogout />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
        {/* Boton menu */}
        <button
          onClick={handleSidebar}
          className="lg:hidden absolute bottom-4 right-4 bg-red-600 p-2 text-white rounded-full text-2x1"
        >
          {sidebar ? <MdClose /> : <MdOutlineMenu />}
        </button>
        {/* Content */}
        <div className="col-span-5">
          <div className="p-4 h-full bg-gray-200">
            <div className="">
              <h1 className="text-5xl font-semibold">Dashboard</h1>
            </div>
            <div className="flex flex-row jutify-center bg-white p-2 rounded-lg mt-4">
              <GraficoBebidas />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
