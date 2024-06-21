import axiosInstance from "../utils/axiosInstance";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [values, setValues] = useState({
    nombreUsuario: "",
    correoElectronico: "",
    contrasena: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axiosInstance
      .post("/api/auth/registro", values)
      .then(function (response) {
        console.log(response);
        toast.success("Usuario registrado correctamente");
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Error al registrar al usuario");
      });
  };
  return (
    <div className="flex items-center justify-center h-screen bg-stone-900">
      <div className="bg-stone-700 p-2 rounded-lg shadow-md px-16 pt-6 pb-8 mb-4">
        <div className="max-w-xs mx-auto">
          <h2 className="text-3xl text-yellow-300 font-bold p-8 items-center">Registrarse</h2>
          <form action="" onSubmit={handleSubmit} className="formulario">
            <div className="mb-4">
              <label
                htmlFor="nombreUsuario"
                className="block text-yellow-300 text-sm font-bold mb-2"
              >
                Nombre de usuario:
              </label>
              <input
                type="text"
                name="nombreUsuario"
                onChange={(e) =>
                  setValues({ ...values, nombreUsuario: e.target.value })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 font-semibold leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="correoElectronico"
                className="block text-yellow-300 text-sm font-bold mb-2"
              >
                Correo Electronico:
              </label>
              <input
                type="email"
                name="nombreUsuario"
                onChange={(e) =>
                  setValues({
                    ...values,
                    correoElectronico: e.target.value,
                  })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 font-semibold leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="contrasena"
                className="block text-yellow-300 text-sm font-bold mb-2"
              >
                Contraseña:
              </label>
              <input
                type="password"
                name="contrasena"
                onChange={(e) =>
                  setValues({ ...values, contrasena: e.target.value })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 font-semibold leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="flex items-center justify-center pt-4">
              <button
                type="submit"
                className="bg-yellow-300 hover:bg-stone-900 transition text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Crear cuenta
              </button>
            </div>
            <div className="mt-4">
              <p className="text-center text-gray-500 text-xs">
                ¿Ya estas registrado?
                <Link to="/login">
                  <a className="text-yellow-300 hover:text-yellow-400 transition" href="#">
                    Inicia sesión
                  </a>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
