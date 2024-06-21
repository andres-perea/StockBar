import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
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
  MdInventory2,
} from "react-icons/md";
import "../index.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Bebidas() {
  const [bebidas, setBebidas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    axiosInstance.get("/bebidas/").then((response) => {
      setBebidas(response.data);
    });

    axiosInstance.get("/categorias/").then((response) => {
      setCategorias(response.data);
    });
  }, []);

  async function handleDelete(codigo) {
    if (typeof codigo !== "number" || isNaN(codigo)) {
      console.error("ID de bebida inválido");
      return;
    }

    try {
      await axiosInstance.delete(`/bebidas/eliminar/${codigo}`);
      toast.success("Bebida eliminada correctamente");
    } catch (error) {
      console.error("Error al eliminar la bebida", error);
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
        <div className="lg:min-h-screen bg-stone-800 pl-10">
          <div className="">
            <h1 className="text-4xl lg:text-5xl p-2 font-bold text-yellow-300">
              Bebidas
            </h1>
          </div>
          <div className="p-8 flex justify-center overflow-x-auto">
            <table className="border-collapse border border-slate-400 w-full text-center">
              <thead>
                <tr>
                  <th className="border border-slate-600 text-lg text-gray-200">
                    Codigo
                  </th>
                  <th className="border border-slate-600 text-lg text-gray-200">
                    Nombre
                  </th>
                  <th className="border border-slate-600 text-lg text-gray-200">
                    Cantidad
                  </th>
                  <th className="border border-slate-600 text-lg text-gray-200">
                    Precio
                  </th>
                  <th className="border border-slate-600 text-lg text-gray-200">
                    Descripción
                  </th>
                  <th className="border border-slate-600 text-lg text-gray-200">
                    Categoria
                  </th>
                  <th className="border border-slate-600 text-lg text-gray-200">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody>
                {bebidas.map((bebida) => (
                  <tr key={bebida.codigo}>
                    <td className="border border-slate-600 font-bold bg-gray-100 text-gray-600">
                      {bebida.codigo}
                    </td>
                    <td className="border border-slate-600 font-bold bg-gray-100 text-gray-600">
                      {bebida.nombre}
                    </td>
                    <td className="border border-slate-600 font-bold bg-gray-100 text-gray-600">
                      {bebida.cantidad}
                    </td>
                    <td className="border border-slate-600 font-bold bg-gray-100 text-gray-600">
                      {bebida.precio}
                    </td>
                    <td className="border border-slate-600 font-bold bg-gray-100 text-gray-600">
                      {bebida.descripcion}
                    </td>
                    <td className="border border-slate-600 font-bold bg-gray-100 text-gray-600">
                      {categorias.find(
                        (categoria) => categoria.id === bebida.categoria_id
                      )?.nombre || "Sin categoria"}
                    </td>
                    <td className="border border-slate-600 bg-gray-100">
                      <div className="flex flex-row justify-center">
                        <button
                          className="bg-red-500 hover:bg-red-600 transition-all text-white p-1 text-2xl m-1"
                          onClick={() => handleDelete(bebida.codigo)}
                        >
                          <MdDelete />
                        </button>
                        <button className="bg-amber-300 hover:bg-amber-400 transition-all text-white p-1 text-2xl m-1">
                          <Link to={`/actualizarBebida/${bebida.codigo}`}>
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
            <Link to="/agregarBebida">
              <button className="hover:bg-green-700 hover:scale-110 transition duration-400 bg-green-600 text-white font-bold p-2 rounded-lg">
                Agregar bebida
              </button>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Bebidas;
