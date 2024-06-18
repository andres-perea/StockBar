import React, { useState } from "react";
import {
  MdOutlineDashboard,
  MdOutlineLogout,
  MdLocalDrink,
  MdOutlineCategory,
  MdOutlineMenu,
  MdClose,
  MdInventory2,
  MdOutlineSearch,
} from "react-icons/md";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

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

    try {
      const response = await axiosInstance.get(`/api/items?query=${query}`);
      const data = response.data;
      setResultados(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
          className={`lg:col-span-1 fixed lg:static top-0 z-50 bg-stone-900 shadow-lg ${
            sidebar ? "w-64 lg:w-full" : "w-0 lg:w-64"
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
        <div className="col-span-5">
          <div className="p-8 lg:min-h-screen bg-stone-800 pl-10">
            <div className="">
              <div className="flex justify-between items-center">
                <h1 className="text-4xl lg:text-5xl font-bold text-yellow-300">
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
            <div className="flex flex-col justify-center p-6 rounded-lg mt-4">
              {resultados.map((bebida) => (
                <div key={bebida.id} className="mx-16 my-16">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1 rounded-lg px-2 py-2">
                      <h2 className="text-2xl text-yellow-300 font-bold mb-4">
                        Nombre del producto:
                      </h2>
                      <p className="text-xl text-yellow-300 font-semibold">
                        {bebida.nombre_producto}
                      </p>
                    </div>
                    <div className="col-span-2 sm:col-span-1 rounded-lg px-2 py-2">
                      <h2 className="text-2xl text-yellow-300 font-bold mb-4">
                        Precio:
                      </h2>
                      <p className="text-xl text-yellow-300 font-semibold">
                        {bebida.precio}
                      </p>
                    </div>
                    <div className="col-span-2 sm:col-span-1 rounded-lg px-2 py-2">
                      <h2 className="text-2xl text-yellow-300 font-bold mb-4">
                        Descripcion:
                      </h2>
                      <p className="text-xl text-yellow-300 font-semibold">
                        {bebida.descripcion}
                      </p>
                    </div>
                    <div className="col-span-2 sm:col-span-1 rounded-lg px-2 py-2">
                      <h2 className="text-2xl text-yellow-300 font-bold mb-4">
                        Cantidad disponible:
                      </h2>
                      <p className="text-xl text-yellow-300 font-semibold">
                        {bebida.cantidad_inventario}
                      </p>
                    </div>
                    <div className="col-span-2 sm:col-span-1 rounded-lg px-2 py-2">
                      <h2 className="text-2xl text-yellow-300 font-bold mb-4">
                        Categoría:
                      </h2>
                      <p className="text-xl text-yellow-300 font-semibold">
                        {bebida.categoria}
                      </p>
                    </div>
                    <div className="col-span-2 sm:col-span-1 rounded-lg px-2 py-2">
                      <h2 className="text-2xl text-yellow-300 font-bold mb-4">
                        Cantidad Vendida:
                      </h2>
                      <p className="text-xl text-yellow-300 font-semibold">
                        {bebida.cantidad_vendida}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Inventario;
