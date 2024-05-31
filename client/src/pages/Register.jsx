import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/registro",
        {
          nombreUsuario,
          correoElectronico,
          contrasena,
        }
      );
      console.log(response);
      console.log(response.data);
      if (response.status === 200) {
        console.log(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Register failed");
      console.log(error);
    }
  };
  return (
    <div class="flex items-center justify-center h-screen bg-gray-200">
      <div class="bg-neutral-50 p-2 rounded-lg shadow-md px-16 pt-6 pb-8 mb-4">
        <div class="max-w-xs mx-auto">
          <h2 className="text-3xl text-blue-600 font-bold p-8 items-center uppercase">
            Registrarse
          </h2>
          <form action="" onSubmit={handleSubmit} className="formulario">
            <div className="mb-4">
              <label
                htmlFor="nombreUsuario"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Nombre de usuario:
              </label>
              <input
                type="text"
                name="nombreUsuario"
                id="nombreUsuario"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="correoElectronico"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Correo Electronico:
              </label>
              <input
                type="email"
                name="nombreUsuario"
                id="correoElectronico"
                value={correoElectronico}
                onChange={(e) => setCorreoElectronico(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="contrasena"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Contraseña:
              </label>
              <input
                type="password"
                name="contrasena"
                id="contrasena"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="flex items-center justify-center pt-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Crear cuenta
              </button>
            </div>
            {error && (
              <div className="text-red-500 text-center mt-4">{error}</div>
            )}
            <div className="mt-4">
              <p class="text-center text-gray-500 text-xs">
                ¿Ya estas registrado?
                <Link to="/">
                  <a class="text-blue-400 hover:text-blue-800" href="#">
                    Inicia Sesion
                  </a>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
