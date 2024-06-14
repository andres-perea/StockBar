import React, { useEffect, useState } from "react";
import {
  MdOutlineDashboard,
  MdOutlineLogout,
  MdLocalDrink,
  MdInbox,
  MdOutlineCategory,
  MdOutlineMenu,
  MdClose,
  MdInventory2,
} from "react-icons/md";
import { CgDanger } from "react-icons/cg";
import { Link } from "react-router-dom";
import GraficoBebidas from "../components/Graficos";
import Saldos from "../components/Saldos";
import CantidadBebidas from "../components/CantidadBebidas";
import HistorialInventario from "../components/HistorialInventario";
import CantidadBebidasVendidas from "../components/CantidadBebidasVendidas";
import Pedidos from "../components/Pedidos";
import "../index.css";
import axios from "axios";

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
        const response = await axios.get("http://localhost:3000/saldo/");
        setsaldo(response.data.saldo);
        if (response.data.saldo < 5) {
          setShowNotification(true);
        } else {
          setShowNotification(false);
        }
      } catch (error) {
        console.error("Error al obtener los saldos", error);
      }
    };

    const obtenerBebidas = async () => {
      try {
        const response = await axios.get("http://localhost:3000/bebidas/");
        setBebidas(response.data);
        if (response.data.some((bebida) => bebida.cantidad < 5)) {
          setShowNotification(true);
        } else {
          setShowNotification(false);
        }
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
        className={`lg:col-span-1 fixed lg:static top-0 z-50 bg-stone-900 shadow-lg ${
          sidebar ? "w-64" : "w-0"
        } lg:w-full h-full transition-all border-r p-4`}
      >
        {/* LOGO */}
        <div className="text-center p-8">
          <h1 className="font-bold uppercase tracking-[4px] focus:outline-none overflow-y-auto  text-yellow-300">
            BarManage
          </h1>
        </div>
        <div className="flex flex-col justify-between pt-10 h-[calc(100vh - 16rem)]">
          {/* MENU */}
          <nav>
            <div className="border-b border-yellow-300"></div>
            <ul>
              <Link>
                <li>
                  <a
                    href=""
                    className="flex items-center gap-4 hover:bg-yellow-300 p-4 text-white hover:text-white  transition-colors font-semibold focus:outline-none overflow-y-auto "
                  >
                    <MdOutlineDashboard />
                    Dashboard
                  </a>
                </li>
              </Link>
              <Link to="/bebidas">
                <div className="border-b border-yellow-300"></div>
                <li>
                  <a
                    href=""
                    className="flex items-center gap-4 hover:bg-yellow-300 p-4 text-white hover:text-white  transition-colors font-semibold focus:outline-none overflow-y-auto"
                  >
                    <MdLocalDrink />
                    Bebidas
                  </a>
                </li>
              </Link>
              <Link to="/inventario">
                <div className="border-b border-yellow-300"></div>
                <li>
                  <a
                    href=""
                    className="flex items-center gap-4 hover:bg-yellow-300 p-4 text-white hover:text-white transition-colors font-semibold focus:outline-none overflow-y-auto"
                  >
                    <MdInventory2 />
                    Historial inventario
                  </a>
                </li>
              </Link>
              <Link to="/categorias">
                <div className="border-b border-yellow-300"></div>
                <li>
                  <a
                    href=""
                    className="flex items-center gap-4 hover:bg-yellow-300 p-4 text-white hover:text-white transition-colors font-semibold focus:outline-none overflow-y-auto"
                  >
                    <MdOutlineCategory />
                    Categorías
                  </a>
                </li>
              </Link>
              <div className="border-b border-yellow-300"></div>
            </ul>
          </nav>
        </div>
          {/* Cerrar sesión */}
          <div className="flex flex-col mt-96 gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-5 hover:bg-yellow-300 p-4 text-white hover:text-white transition-colors font-semibold focus:outline-none overflow-y-auto"
            >
              <MdOutlineLogout />
              Cerrar Sesión
            </button>
          </div>
      </div> 
      {/* End Sidebar */}    
      {/* Botón menú */}
      <button
                onClick={handleSidebar}
                className="lg:hidden absolute bottom-4 right-4 bg-red-600 p-2 text-white rounded-full text-2xl">
                {sidebar ? <MdClose /> : <MdOutlineMenu />}
      </button>
      {/* Contenido */}
      <div className="col-span-5">
        <div className="p-8 lg:min-h-screen bg-stone-800 pl-10">
          <div className="">
            <h1 className="text-4xl lg:text-5xl font-bold text-yellow-300">Dashboard</h1>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col left-0 mt-4">
              <CantidadBebidas />

            </div>
            <div className="flex flex-col left-0 mt-4">
              <CantidadBebidasVendidas />
            </div>
            <div className="flex flex-col left-0 mt-4">
              <HistorialInventario />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg mt-4">
            <GraficoBebidas />
          </div>
          <div className="grid grid-cols-3">
            <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg mt-4">
              <Pedidos />
            </div>
          </div>
          {showNotification && (
            <div className="fixed bottom-10 right-10 text-white font-semibold my-4 px-4 py-2 rounded flex flex-col items-start space-y-2">
              {bebidas.map(
                (bebida) =>
                  bebida.cantidad < 20 && (
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
      </div>
      </>
  );
}

export default Dashboard;
