import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
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
import "../index.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ActualizarBebidas({ id }) {
  const [sidebar, setSidebar] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    cantidad: "",
    precio: "",
    categoria_id: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const location = useLocation();
  const bebidaId = location.pathname.split("/")[2];

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3000/bebidas/editar/" + bebidaId, formData)
      .then(() => {
        toast.success("Bebida actualizada correctamente");
      })
      .catch((error) => {
        console.error("Error al actualizar la bebida seleccionada", error);
      });
  };

  useEffect(() => {
    axios.get("http://localhost:3000/categorias/").then((response) => {
      setCategorias(response.data);
    });
  });

  return (
    <>
      <div className="min-h-screen grid grid-col-1 lg:grid-cols-6">
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
        {/* Content */}
        <div className="col-span-5">
          <div className="p-4 h-full bg-gray-200">
            <div className="">
              <h1 className="text-5xl font-semibold">Bebidas</h1>
            </div>
            <div className="flex flex-row items-center jutify-center bg-white p-4 rounded-lg mt-2">
              <div className="w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Actualizar Bebidas</h2>
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
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="cantidad"
                      className="block text-sm font-bold mb-2"
                    >
                      Cantidad:{" "}
                    </label>
                    <input
                      type="text"
                      name="cantidad"
                      value={formData.cantidad}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="precio"
                      className="block text-sm font-bold mb-2"
                    >
                      Precio:{" "}
                    </label>
                    <input
                      type="text"
                      name="precio"
                      value={formData.precio}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="precio"
                      className="block text-sm font-bold mb-2"
                    >
                      Categoria:{" "}
                    </label>
                    <select
                      name="categoria_id"
                      value={formData.categoria_id}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={handleChange}
                    >
                      <option value="0">. . .</option>
                      {categorias.map((categoria) => (
                        <option value={categoria.id}>{categoria.nombre}</option>
                      ))}
                    </select>
                  </div>
                  <button className="bg-amber-300 hover:bg-amber-500 transition duration-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Actualizar Datos
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default ActualizarBebidas;
