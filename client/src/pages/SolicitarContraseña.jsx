import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast, ToastContainer } from "react-toastify";

const SolicitarContraseña = () => {
  const [correoElectronico, setCorreoElectronico] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post(
        "/api/auth/solicitar-cambio-contrasena",
        { correoElectronico }
      );
      toast.success("Correo enviado correctamente");      
    } catch (error) {
      toast.error("Error al enviar la solicitud");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-stone-900">
        <div className="bg-stone-700 p-2 rounded-lg shadow-md  px-8 pt-6 pb-8 mb-4">
          <div className="max-w-xs mx-auto">
            <h2 className="text-3xl text-yellow-300 font-bold p-8 items-center text-center">
              Solicitar cambio de contraseña
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-yellow-300 pt-1 text-sm font-bold mb-2">
                  Correo electronico:
                  <input
                    type="email"
                    value={correoElectronico}
                    onChange={(e) => setCorreoElectronico(e.target.value)}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </label>
              </div>
              <div className="flex items-center justify-center pt-4">
                <button
                  type="submit"
                  className="bg-yellow-300 hover:bg-stone-900 transition text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Solicitar
                </button>
              </div>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
};

export default SolicitarContraseña;