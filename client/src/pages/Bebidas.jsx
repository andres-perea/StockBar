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
  MdDelete,
  MdOutlineUpdate,
} from "react-icons/md";
import "../index.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Bebidas() {
  const [bebidas, setBebidas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/bebidas/").then((response) => {
      setBebidas(response.data);
    });

    axios.get("http://localhost:3000/categorias/").then((response) => {
      setCategorias(response.data);
    });
  }, []);

  async function handleDelete(id) {
    if (typeof id !== "number" || isNaN(id)) {
      console.error("ID de bebida inválido");
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/bebidas/eliminar/${id}`);
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
        className={`lg:col-span-1 fixed lg:static top-0 z-50 bg-white ${
          sidebar ? "w-80" : "w-0"
        } lg:w-full h-full transition-all border-r p-8`}
      >
        {/* LOGO */}
        <div className="text-center p-8">
          <h1 className="uppercase font-bold tracking-[4px]">StockBar</h1>
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
              <li>
                <a
                  href=""
                  className="flex items-center gap-4 hover:bg-red-600 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold"
                >
                  <MdInbox />
                  Pedidos
                </a>
              </li>
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
            <h1 className="text-4xl lg:text-5xl p-2 font-semibold">Bebidas</h1>
          </div>
          <div className="p-8 flex justify-center overflow-x-auto">
            <table className="border-collapse border border-slate-400 w-full text-center">
              <thead>
                <tr>
                  <th className="border border-slate-600 text-lg text-gray-600">
                    Nombre
                  </th>
                  <th className="border border-slate-600 text-lg text-gray-600">
                    Cantidad
                  </th>
                  <th className="border border-slate-600 text-lg text-gray-600">
                    Precio
                  </th>
                  <th className="border border-slate-600 text-lg text-gray-600">
                    Categoria
                  </th>
                  <th className="border border-slate-600 text-lg text-gray-600">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody>
                {bebidas.map((bebida) => (
                  <tr key={bebida.id}>
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
                      {categorias.find(
                        (categoria) => categoria.id === bebida.categoria_id
                      )?.nombre || "Sin categoria"}
                    </td>
                    <td className="border border-slate-600 bg-gray-100">
                      <div className="flex flex-row justify-center">
                        <button
                          className="bg-red-500 hover:bg-red-600 transition-all text-white p-1 text-2xl m-1"
                          onClick={() => handleDelete(bebida.id)}
                        >
                          <MdDelete />
                        </button>
                        <button className="bg-amber-300 hover:bg-amber-400 transition-all text-white p-1 text-2xl m-1">
                          <Link to={`/actualizarBebida/${bebida.id}`}>
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
