import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          nombreUsuario,
          contrasena,
        }
      );
      console.log(response);
      console.log(response.data);
      if (response.status === 200) {
        console.log(response.data.message);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="bg-neutral-50 p-2 rounded-lg shadow-md px-8 pt-6 pb-8 mb-4">
        <div className="max-w-xs mx-auto">
          <h2 className="text-3xl text-blue-600 font-bold p-8 items-center uppercase">
            Iniciar Sesión
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombreUsuario"
              >
                Nombre de usuario:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nombreUsuario"
                name="nombreUsuario"
                type="text"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="contrasena"
              >
                Contraseña:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="contrasena"
                name="contrasena"
                type="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-center pt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Iniciar Sesión
              </button>
            </div>
            {error && (
              <div className="text-red-500 text-center mt-4">{error}</div>
            )}
            <div className="mt-4">
              <p className="text-center text-gray-500 text-xs">
                ¿No tienes una cuenta?
                <a href="/registro">
                  <span className="text-blue-500 hover:text-blue-800">
                    {" "}
                    Regístrate
                  </span>
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
