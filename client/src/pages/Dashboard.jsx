import React, { useEffect, useState } from "react";
import {
  MdOutlineDashboard,
  MdOutlineLogout,
  MdLocalDrink,
  MdOutlineCategory,
  MdOutlineMenu,
  MdClose,
  MdInventory2,
} from "react-icons/md";
import { CgDanger } from "react-icons/cg";
import { Link } from "react-router-dom";
import GraficoBebidas from "../components/Graficos";
import CantidadBebidas from "../components/CantidadBebidas";
import CantidadBebidasVendidas from "../components/CantidadBebidasVendidas";
import Pedidos from "../components/Pedidos";
import GraficoCategoriasCircular from "../components/GraficoCircular"
import CategoriasInventario from "../components/categoriasInvetario";
import "../index.css";
import axiosInstance from "../utils/axiosInstance";

function Dashboard() {
  const [sidebar, setSidebar] = useState(false);
  const [bebidas, setBebidas] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [saldo, setsaldo] = useState(null);

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    const obtenerSaldo = async () => {
      try {
        const response = await axiosInstance.get("/saldo/");
        setsaldo(response.data.saldo);
        setShowNotification(response.data.saldo < 5);
      } catch (error) {
        console.error("Error al obtener los saldos", error);
      }
    };

    const obtenerBebidas = async () => {
      try {
        const response = await axiosInstance.get("/bebidas/");
        setBebidas(response.data);
        setShowNotification(
          response.data.some((bebida) => bebida.cantidad < 5)
        );
      } catch (error) {
        console.error("Error al obtener las bebidas", error);
      }
    };

    obtenerSaldo();
    obtenerBebidas();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-6 min-h-screen overflow-hidden">
        {/* Sidebar */}
        <div
          className={`lg:col-span-1 fixed lg:static top-0 z-50 bg-stone-900 shadow-lg ${sidebar ? "w-64 lg:w-full" : "w-0 lg:w-64"
            } h-full transition-all border-r p-4 overflow-hidden lg:overflow-visible`}
        >
          <div className="text-center p-8">
            <h1 className="font-bold tracking-[4px] text-yellow-300">
              BarManage
            </h1>
          </div>
          <nav className="flex flex-col justify-between h-[calc(100vh-8rem)] pt-10">
            <ul>
              <Link to="/dashboard">
                <li className="border-b border-yellow-300">
                  <a className="flex items-center gap-4 p-4 text-white hover:bg-yellow-300 transition-colors">
                    <MdOutlineDashboard />
                    Dashboard
                  </a>
                </li>
              </Link>
              <Link to="/bebidas">
                <li className="border-b border-yellow-300">
                  <a className="flex items-center gap-4 p-4 text-white hover:bg-yellow-300 transition-colors">
                    <MdLocalDrink />
                    Bebidas
                  </a>
                </li>
              </Link>
              <Link to="/inventario">
                <li className="border-b border-yellow-300">
                  <a className="flex items-center gap-4 p-4 text-white hover:bg-yellow-300 transition-colors">
                    <MdInventory2 />
                    Historial Inventario
                  </a>
                </li>
              </Link>
              <Link to="/categorias">
                <li className="border-b border-yellow-300">
                  <a className="flex items-center gap-4 p-4 text-white hover:bg-yellow-300 transition-colors">
                    <MdOutlineCategory />
                    Categorías
                  </a>
                </li>
              </Link>
            </ul>
            <button
              onClick={handleLogout}
              className="flex items-center gap-5 p-4 text-white hover:bg-yellow-300 transition-colors"
            >
              <MdOutlineLogout />
              Cerrar Sesión
            </button>
          </nav>
        </div>
        <button
          onClick={handleSidebar}
          className="lg:hidden fixed bottom-4 right-4 bg-stone-900 p-2 text-yellow-300 font-bold rounded-full text-2xl z-50"
        >
          {sidebar ? <MdClose /> : <MdOutlineMenu />}
        </button>
        {/* Contenido */}
        <div className="lg:col-span-5 p-8 fixed ml-5 lg:ml-60 lg:min-h-screen bg-stone-800 pl-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-yellow-300">
            Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <CantidadBebidas />
            <CantidadBebidasVendidas />
            <CategoriasInventario />
          </div>
          <div className="bg-white p-6 rounded-lg mt-4">
            <GraficoBebidas />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
            <div className="bg-white p-6 rounded-lg mt-4">
              <Pedidos />
            </div>
            <div className="col-span-2 bg-white p-6 rounded-lg mt-4">
              <GraficoCategoriasCircular />
            </div>
          </div>
          {showNotification && (
            <div className="fixed bottom-10 right-10 text-white font-semibold my-4 px-4 py-2 rounded flex flex-col items-start space-y-2">
              {bebidas.map(
                (bebida) =>
                  bebida.cantidad < 5 && (
                    <p
                      key={bebida.id}
                      className="flex items-center bg-red-600 border px-4 py-2 mb-2 rounded"
                    >
                      <CgDanger className="text-white text-2xl mr-2" /> Stock
                      bajo del producto {bebida.nombre}
                    </p>
                  )
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
