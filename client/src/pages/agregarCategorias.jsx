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
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function AgregarCategorias() {
  const [sidebar, setSidebar] = useState(false);
  const [values, setValues] = useState({
    nombre: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/categorias/agregarCategorias", values)
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
        className={`lg:col-span-1 fixed lg:static top-0 z-50 bg-white ${
          sidebar ? "w-64" : "w-0"
        } lg:w-full h-full transition-all border-r p-4`}
      >
        {/* LOGO */}
        <div className="text-center p-8">
          <h1 className="font-bold uppercase tracking-[4px] focus:outline-none overflow-y-auto ">
            BarManage
          </h1>
        </div>
        <div className="flex flex-col justify-between pt-10 h-[calc(100vh - 16rem)]">
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
        </div>
          {/* Cerrar sesión */}
          <div className="flex flex-col mt-96 gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-5 hover:bg-red-600 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold focus:outline-none overflow-y-auto"
            >
              <MdOutlineLogout />
              Cerrar Sesión
            </button>
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
        <div className="p-4 lg:min-h-screen bg-gray-200 pl-10">
          <div className="">
            <h1 className="text-4xl lg:text-5xl font-semibold">Categorías</h1>
          </div>
          <div className="flex justify-center bg-white p-2 rounded-lg mt-4">
            <div className="w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Agregar Categoría</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="nombre"
                    className="block text-sm font-bold mb-2"
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
