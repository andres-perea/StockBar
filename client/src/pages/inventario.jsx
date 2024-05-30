import React, { useState, useEffect } from "react";
import {
  MdOutlineDashboard,
  MdOutlineLogout,
  MdLocalDrink,
  MdInbox,
  MdOutlineCategory,
  MdOutlineMenu,
  MdClose,
  MdInventory2,
  MdOutlineSearch,
} from "react-icons/md";
import { Link } from "react-router-dom";

function Inventario() {
  const [sidebar, setSidebar] = useState(false);
  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState([]);

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  const manejarCambio = (e) => {
    setQuery(e.target.value);
  };

  const manejarBuscador = async () => {
    if (query.trim() === "") {
      return;
    }
    const response = await fetch(
      `http://localhost:3000/api/items?query=${query}`
    );
    const data = await response.json();
    setResultados(data);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-6 min-h-screen overflow-hidden ">
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
                <Link to="/dashboard">
                  <li>
                    <a
                      href=""
                      className="flex items-center gap-4 hover:bg-red-600 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold focus:outline-none overflow-y-auto"
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
                      className="flex items-center gap-4 hover:bg-red-600 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold focus:outline-none overflow-y-auto"
                    >
                      <MdLocalDrink />
                      Bebidas
                    </a>
                  </li>
                </Link>
                <Link to="/inventario">
                  <div className="border-b border-gray-300"></div>
                  <li>
                    <a
                      href=""
                      className="flex items-center gap-4 hover:bg-red-600 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold focus:outline-none overflow-y-auto"
                    >
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
                      className="flex items-center gap-4 hover:bg-red-600 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold focus:outline-none overflow-y-auto"
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
                      className="flex items-center gap-4 hover:bg-red-600 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold focus:outline-none overflow-y-auto"
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
                className="flex items-center gap-5 hover:bg-red-600 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold focus:outline-none overflow-y-auto"
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
              <div className="flex justify-between items-center">
                <h1 className="text-4xl lg:text-5xl font-bold">
                  Historial inventario
                </h1>
                <div className="flex space-x-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={query}
                      onChange={manejarCambio}
                      placeholder="Buscar..."
                      className="pl-2 pr-4 py-2 border rounded-lg w-full font-bold"
                    />
                    <MdOutlineSearch
                      className="h-7 w-7 absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-800 cursor-pointer justify-center"
                      onClick={manejarBuscador}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg mt-4">
              <ul>
                {resultados.map((bebida) => (
                  <li key={bebida.id}>
                    {" "}
                    {bebida.nombre} <br /> {bebida.precio}{" "}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Inventario;
