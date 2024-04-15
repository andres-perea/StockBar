import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/pedidos/").then((response) => {
      setPedidos(response.data);
    });
  });

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 min-h-screen">
      {/* Sidebar */}
      <div
        className={`lg:col-span-1 fixed lg:static top-0 z-50 bg-white ${
          sidebar ? "w-80" : "w-0"
        } lg:w-full h-full transition-all border-r p-8`}
      >
        {/* LOGO */}
        <div className="text-center p-8">
          <h1 className="font-bold uppercase tracking-[4px]">StockBar</h1>
        </div>
        <div className="flex flex-col justify-between h-[calc(100vh - 16rem)]">
          {/* MENU */}
          <nav>
            <ul>
              <Link to="/dashboard">
                <li>
                  <a
                    href=""
                    className="flex items-center gap-4 hover:bg-red-600 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold"
                  >
                    <MdOutlineDashboard />
                    Dashboard
                  </a>
                </li>
              </Link>
              <Link to="/bebidas">
                <li>
                  <a
                    href=""
                    className="flex items-center gap-4 hover:bg-red-600 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold"
                  >
                    <MdLocalDrink />
                    Bebidas
                  </a>
                </li>
              </Link>
              <Link to="/pedidos">
                <li>
                  <a
                    href=""
                    className="flex items-center gap-4 hover:bg-red-600 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold"
                  >
                    <MdInbox />
                    Pedidos
                  </a>
                </li>
              </Link>
              <Link to="/categorias">
                <li>
                  <a
                    href=""
                    className="flex items-center gap-4 hover:bg-red-600 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold"
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
              className="flex items-center gap-5 hover:bg-red-600 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold"
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
        <div className="p-4 lg:min-h-screen bg-gray-200">
          <div className="">
            <h1 className="text-4xl lg:text-5xl font-semibold">Pedidos</h1>
          </div>
          <div className="flex justify-center bg-white p-2 rounded-lg mt-4">
            <table className="border-collapse border border-slate-400 w-full text-center">
              <thead>
                <tr>
                  <th className="border border-slate-600 text-lg text-gray-600">
                    Nombre del Producto
                  </th>
                  <th className="border border-slate-600 text-lg text-gray-600">
                    Cantidad Vendida
                  </th>
                  <th className="border border-slate-600 text-lg text-gray-600">
                    Precio de Venta
                  </th>
                  <th className="border border-slate-600 text-lg text-gray-600">
                    Acción
                  </th>
                </tr>
                {pedidos.map((pedido) => (
                  <tr key={pedido.id}>
                    <td className="border border-slate-600 font-bold bg-gray-100 text-gray-600">
                      {pedido.nombre}
                    </td>
                    <td className="border border-slate-600 font-bold bg-gray-100 text-gray-600">
                      {pedido.cantidad}
                    </td>
                    <td className="border border-slate-600 font-bold bg-gray-100 text-gray-600">
                      {pedido.precio}
                    </td>
                    <td className="border border-slate-600 p-2 font-bold bg-gray-100 text-gray-600">
                      <div className="flex flex-row justify-center">
                        <button className="bg-green-600 p-2 hover:bg-green-700 transition-all text-white p-1 text-sm m-1">
                          Entrega Realizada
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pedidos;
