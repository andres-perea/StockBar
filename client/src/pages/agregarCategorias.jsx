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
import "../index.css";
import axiosInstance from "../utils/axiosInstance";
import { ToastContainer, toast } from "react-toastify";

function AgregarCategorias() {
  const [sidebar, setSidebar] = useState(false);
  const [values, setValues] = useState({
    nombre: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axiosInstance
      .post("/categorias/agregarCategorias", values)
      .then(function (response) {
        console.log(response);
        toast.success("Categoria registrada correctamente");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
        <div className="p-4 lg:min-h-screen bg-stone-800 pl-10">
          <div className="">
            <h1 className="text-4xl lg:text-5xl font-bold text-yellow-300">
              Agregar categoria
            </h1>
          </div>
          <div className="flex justify-center bg-stone-900 p-2 rounded-lg mt-4">
            <div className="w-full max-w-md">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="nombre"
                    className="block text-sm font-bold mb-2 text-yellow-300"
                  >
                    Nombre:{" "}
                  </label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) =>
                      setValues({ ...values, nombre: e.target.value })
                    }
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 transition duration-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Agregar Categoría
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AgregarCategorias;
