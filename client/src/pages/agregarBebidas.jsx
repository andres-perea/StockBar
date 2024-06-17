import axios from "axios";
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
} from "react-icons/md";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AgregarBebidas() {
  const [sidebar, setSidebar] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [values, setValues] = useState({
    nombre: "",
    cantidad: "",
    precio: "",
    descripcion: "",
    categoria_id: "",
  });

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("archivo", selectedFile);
      formData.append("nombre", values.nombre);
      formData.append("cantidad", values.cantidad);
      formData.append("precio", values.precio);
      formData.append("descripcion", values.descripcion);
      formData.append("categoria_id", values.categoria_id);

      const response = await axios.post(
        "http://localhost:3000/bebidas/agregarBebidas",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      toast.success("Bebida registrada correctamente");
    } catch (error) {
      console.error(error);
      toast.error("Error al registrar la bebida");
    }
  };

  useEffect(() => {
    axios.get("http://localhost:3000/categorias/").then((response) => {
      setCategorias(response.data);
    });
  });

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
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-yellow-300">
              Agregar bebida
            </h1>
          </div>
          <div className="flex justify-center bg-stone-900 p-2 rounded-lg mt-2">
            <div className="w-full max-w-md">
              <form onSubmit={handleSubmit} enctype="multipart/form-data">
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
                <div className="mb-4">
                  <label
                    htmlFor="cantidad"
                    className="block text-sm font-bold mb-2 text-yellow-300"
                  >
                    Cantidad:{" "}
                  </label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) =>
                      setValues({ ...values, cantidad: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="precio"
                    className="block text-sm font-bold mb-2 text-yellow-300"
                  >
                    Precio:{" "}
                  </label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) =>
                      setValues({ ...values, precio: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="descripcion"
                    className="block text-sm font-bold mb-2 text-yellow-300"
                  >
                    Descripción:
                  </label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) =>
                      setValues({ ...values, descripcion: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="imagen"
                    className="block text-sm font-bold mb-2 text-yellow-300"
                  >
                    Imagen:
                  </label>
                  <input
                    type="file"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleFileChange}
                    name="archivo"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="categorias"
                    className="block text-sm font-bold mb-2 text-yellow-300"
                  >
                    Selecciona una categoria:
                  </label>
                  <select
                    name=""
                    id=""
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) =>
                      setValues({ ...values, categoria_id: e.target.value })
                    }
                  >
                    <option value="0">. . .</option>
                    {categorias.map((categoria) => (
                      <option value={categoria.id}>{categoria.nombre}</option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 transition duration-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Agregar Producto
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

export default AgregarBebidas;
