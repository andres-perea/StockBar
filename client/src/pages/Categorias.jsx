import React, { useEffect, useState } from "react";
import {
  MdOutlineDashboard,
  MdOutlineLogout,
  MdLocalDrink,
  MdOutlineCategory,
  MdOutlineMenu,
  MdClose,
  MdDelete,
  MdOutlineUpdate,
  MdInventory2,
} from "react-icons/md";
import { Link } from "react-router-dom";
import "../index.css";
import axiosInstance from "../utils/axiosInstance";
import { ToastContainer, toast } from "react-toastify";

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    axiosInstance.get("/categorias/").then((response) => {
      setCategorias(response.data);
    });
  });

  async function handleDelete(id) {
    if (typeof id !== "number" || isNaN(id)) {
      console.error("ID de categoria invalido");
      return;
    }

    try {
      await axiosInstance.delete(`/categorias/eliminar/${id}`);
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
      <div className="col-span-5 ">
        <div className="p-4 lg:min-h-screen bg-stone-800 pl-10">
          <div className="">
            <h1 className="text-4xl lg:text-5xl font-bold text-yellow-300">Categorías</h1>
          </div>
          <div className="p-8 flex justify-center overflow-x-auto">
            <table className="border-collapse border border-slate-400 w-full text-center">
              <thead>
                <tr>
                  <th className="border border-slate-400 text-lg text-gray-200">
                    Nombre
                  </th>
                  <th className="border border-slate-400 text-lg text-gray-200">
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
