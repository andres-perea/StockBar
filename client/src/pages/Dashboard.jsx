import React, { useState } from "react";
import {
  MdOutlineDashboard,
  MdOutlineLogout,
  MdLocalDrink,
  MdInbox,
  MdOutlineCategory,
  MdOutlineMenu,
  MdClose,
  MdInventory2
} from "react-icons/md";
import { Link } from "react-router-dom";
import GraficoBebidas from "../components/Graficos";
import Saldos from "../components/Saldos";
import CantidadBebidas from "../components/CantidadBebidas";
import "../index.css";

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
    <div className="flex grid grid-cols-1 lg:grid-cols-6 min-h-screen overflow-hidden ">
      {/* Sidebar */}
      <div
        className={`lg:col-span-1 fixed lg:static top-0 z-50 bg-white ${
          sidebar ? "w-64" : "w-0"
        } lg:w-full h-full transition-all border-r p-4`}
      >
        {/* LOGO */}
        <div className="text-center p-8">
          <h1 className="font-bold uppercase tracking-[4px] focus:outline-none overflow-y-auto ">
            StockBar
          </h1>
        </div>
        <div className="flex flex-col justify-between h-[calc(100vh - 16rem)]">
          {/* MENU */}
          <nav>
            <div className="border-b border-gray-300"></div>
            <ul>
              <Link>
                <li>
                  <a
                    href=""
                    className="flex items-center gap-4 hover:bg-red-600 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold focus:outline-none overflow-y-auto p-4"
                  >
                    <MdOutlineDashboard />
                    Dashboard
                  </a>
                </li>
              </Link>
              <Link to="/bebidas">
                <div className="border-b border-gray-300"></div>
                <li>
                  <a
                    href=""
                    className="flex items-center gap-4 hover:bg-red-600 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold focus:outline-none overflow-y-auto p-4"
                  >
                    <MdLocalDrink />
                    Bebidas
                  </a>
                </li>
              </Link>
              <Link to="/inventario">
                  <div className="border-b border-gray-300"></div>
                  <li>
                    <a href="" className="flex items-center gap-4 hover:bg-red-600 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold focus:outline-none overflow-y-auto p-4">
                        <MdInventory2 />
                        Historial inventario
                    </a>
                  </li>
                </Link>
              <Link to="/pedidos">
                <div className="border-b border-gray-300"></div>
                <li>
                  <a
                    href=""
                    className="flex items-center gap-4 hover:bg-red-600 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold focus:outline-none overflow-y-auto p-4"
                  >
                    <MdInbox />
                    Pedidos
                  </a>
                </li>
              </Link>
              <Link to="/categorias">
                <div className="border-b border-gray-300"></div>
                <li>
                  <a
                    href=""
                    className="flex items-center gap-4 hover:bg-red-600 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold focus:outline-none overflow-y-auto p-4"
                  >
                    <MdOutlineCategory />
                    Categorías
                  </a>
                </li>
              </Link>
            </ul>
          </nav>
          {/* Cerrar sesión */}
          <div className="flex flex-col pt-36 gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-5 hover:bg-red-600 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold focus:outline-none overflow-y-auto p-4"
            >
              <MdOutlineLogout />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
      {/* Botón menú */}
      <button
        onClick={handleSidebar}
        className="lg:hidden absolute bottom-4 right-4 bg-red-600 p-2 text-white rounded-full text-2xl"
      >
        {sidebar ? <MdClose /> : <MdOutlineMenu />}
      </button>
      {/* Contenido */}
      <div className="col-span-5">
        <div className="p-8 lg:min-h-screen bg-gray-200 pl-10">
          <div className="">
            <h1 className="text-4xl lg:text-5xl font-bold">Dashboard</h1>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col left-0 mt-4">
              <CantidadBebidas />
            </div>
            <div className="flex flex-col left-0 mt-4">
              <Saldos />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg mt-4">
            <GraficoBebidas />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
