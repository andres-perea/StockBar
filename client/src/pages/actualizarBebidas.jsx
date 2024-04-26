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
          className={`fixed lg:static w-[80%] md:w-[40%] lg:w-full top-0 z-50 bg-white transition-all ${
            sidebar ? "-left-0" : "-left-full"
          } w-full h-full col-span-1 p-8 border-r`}
        >
          {/* LOGO */}
          <div className="text-center p-8">
            <h1 className="font-bold tracking-[4px]">StockBar</h1>
          </div>
          <div className="flex flex-col justify-between h-[650px]">
            {/* MENU */}
            <nav>
              <ul>
                <Link to="/dashboard">
                  <li>
                    <a
                      href=""
                      className="flex 
                  items-center 
                  gap-4 
                  hover:bg-red-600 
                  p-4 
                  text-gray-500 
                  hover:text-white 
                  rounded-lg 
                  transition-colors 
                  font-semibold"
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
                      className="flex 
                  items-center 
                  gap-4
                  hover:bg-red-600 
                  p-4 
                  text-gray-500 
                  hover:text-white 
                  rounded-lg 
                  transition-colors 
                  font-semibold"
                    >
                      <MdLocalDrink />
                      Bebidas
                    </a>
                  </li>
                </Link>
                <li>
                  <a
                    href=""
                    className="flex 
                  items-center 
                  gap-4 
                  hover:bg-red-600 
                  p-4 
                  text-gray-500 
                  hover:text-white 
                  rounded-lg 
                  transition-colors 
                  font-semibold"
                  >
                    <MdInbox />
                    Pedidos
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    className="flex 
                  items-center 
                  gap-4 
                  hover:bg-red-600 
                  p-4 
                  text-gray-500 
                  hover:text-white 
                  rounded-lg 
                  transition-colors 
                  font-semibold"
                  >
                    <MdOutlineCategory />
                    Categorias
                  </a>
                </li>
              </ul>
            </nav>
            {/* Cerrar sesion */}
            <div className="flex flex-col gap-4">
              <button
                onClick={handleLogout}
                className="flex 
                  items-center 
                  gap-5 
                  hover:bg-red-600 
                  p-4 
                  text-gray-500 
                  hover:text-white 
                  rounded-lg 
                  transition-colors 
                  font-semibold"
              >
                <MdOutlineLogout />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
        {/* Boton menu */}
        <button
          onClick={handleSidebar}
          className="lg:hidden absolute bottom-4 right-4 bg-red-600 p-2 text-white rounded-full text-2x1"
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
