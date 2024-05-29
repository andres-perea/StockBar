import React, { useEffect, useState } from "react";
import {
  MdOutlineDashboard,
  MdOutlineLogout,
  MdLocalDrink,
  MdInbox,
  MdOutlineCategory,
  MdOutlineMenu,
  MdClose,
  MdDelete,
  MdOutlineUpdate,
} from "react-icons/md";
import { Link } from "react-router-dom";
import "../index.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/categorias/").then((response) => {
      setCategorias(response.data);
    });
  });

  async function handleDelete(id) {
    if (typeof id !== "number" || isNaN(id)) {
      console.error("ID de categoria invalido");
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/categorias/eliminar/${id}`);
      toast.success("Categoria eliminada correctamente");
    } catch (error) {
      console.error("Error al eliminar la categoria", error);
    }
  }

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 min-h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`lg:col-span-1 fixed lg:static top-0 z-50 bg-white ${
          sidebar ? "w-64" : "w-0"
        } lg:w-full h-full transition-all border-r p-4`}
      >
        {/* LOGO */}
        <div className="text-center p-8">
          <h1 className="font-bold uppercase tracking-[4px] focus:outline-none overflow-y-auto" >StockBar</h1>
        </div>
        <div className="flex flex-col justify-between h-[calc(100vh - 16rem)]">
          {/* MENU */}
          <nav>
            <ul>
              <Link to="/dashboard">
                <li>
                  <a
                    href=""
                    className="flex items-center gap-4 hover:bg-red-600 p-4 text-gray-500 hover:text-white  transition-colors font-semibold focus:outline-none overflow-y-auto border-b border-gray-300"
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
                    className="flex items-center gap-4 hover:bg-red-600 p-4 text-gray-500 hover:text-white  transition-colors font-semibold focus:outline-none overflow-y-auto border-b border-gray-300"
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
                  className="flex items-center gap-4 hover:bg-red-600 p-4 text-gray-500 hover:text-white  transition-colors font-semibold focus:outline-none overflow-y-auto border-b border-gray-300"
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
                    className="flex items-center gap-4 hover:bg-red-600 p-4 text-gray-500 hover:text-white  transition-colors font-semibold focus:outline-none overflow-y-auto border-b border-gray-300"
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
              className="flex items-center gap-5 hover:bg-red-600 p-4 text-gray-500 hover:text-wh ite  transition-colors font-semibold focus:outline-none overflow-y-auto "
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
      <div className="col-span-5 ">
        <div className="p-4 lg:min-h-screen bg-gray-200 pl-10">
          <div className="">
            <h1 className="text-4xl lg:text-5xl font-semibold">Categorías</h1>
          </div>
          <div className="p-8 flex justify-center overflow-x-auto">
            <table className="border-collapse border border-slate-400 w-full text-center">
              <thead>
                <tr>
                  <th className="border border-slate-600 text-lg text-gray-600">
                    Nombre
                  </th>
                  <th className="border border-slate-600 text-lg text-gray-600">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody>
                {categorias.map((categoría) => (
                  <tr key={categoría.id}>
                    <td className="border border-slate-600 font-bold bg-gray-100 text-gray-600">
                      {categoría.nombre}
                    </td>
                    <td className="border border-slate-600 bg-gray-100">
                      <div className="flex flex-row justify-center">
                        <button
                          className="bg-red-500 hover:bg-red-600 transition-all text-white p-1 text-2xl m-1"
                          onClick={() => handleDelete(categoría.id)}
                        >
                          <MdDelete />
                        </button>
                        <button className="bg-amber-300 hover:bg-amber-400 transition-all text-white p-1 text-2xl m-1">
                          <Link to={`/actualizarCategoria/${categoría.id}`}>
                            <MdOutlineUpdate />
                          </Link>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="absolute top-4 right-4 p-4">
            <Link to="/agregarCategoria">
              <button className="hover:bg-green-700 hover:scale-110 transition duration-400 bg-green-600 text-white font-bold p-2 rounded-lg">
                Agregar categoría
              </button>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Categorias;
