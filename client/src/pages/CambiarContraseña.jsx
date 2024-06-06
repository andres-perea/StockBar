import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CambiarContraseña = () => {
  const { token } = useParams();
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/cambiar-contrasena",
        { token, nuevaContrasena }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error al cambiar la contraseña");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="bg-neutral-50 p-2 rounded-lg shadow-md  px-8 pt-6 pb-8 mb-4">
        <div className="max-w-xs mx-auto">
          <h2 className="text-3xl text-blue-600 font-bold p-8 items-center text-center">
            Cambiar contraseña
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nueva Contraseña:
                <input
                  type="password"
                  value={nuevaContrasena}
                  onChange={(e) => setNuevaContrasena(e.target.value)}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
            </div>
            <div className="flex items-center justify-center pt-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cambiar
              </button>
            </div>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default CambiarContraseña;
