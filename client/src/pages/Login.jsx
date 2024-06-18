import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import "../index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [values, setValues] = useState({
    nombreUsuario: "",
    contrasena: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const values = {
      nombreUsuario: event.target.nombreUsuario.value,
      contrasena: event.target.contrasena.value,
    };
  
    axiosInstance
      .post("/api/auth/login", values, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        toast.success('Login successful');
        console.log(response.data);
          navigate("/dashboard");

      })
      .catch(function (error) {
        if (error.response) {
          console.log('Error response:', error.response.data);
          toast.error(`${error.response.data.message}`);
        } else if (error.request) {
          console.log('Error request:', error.request);
          toast.error("No se recibió respuesta del servidor");
        } else {
          console.log('Error message:', error.message);
          toast.error("Error en el inicio de sesión");
        }
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-stone-900">
      <div className="bg-stone-700 p-2 rounded-lg shadow-md px-8 pt-6 pb-8 mb-4">
        <div className="max-w-xs mx-auto">
          <h2 className="text-3xl text-yellow-300 font-bold p-8 items-center">
            Iniciar Sesión
          </h2>
          <form action="" onSubmit={handleSubmit}>
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
                //required
              />
            </div>
            <div className="campo">
              <label
                htmlFor="contrasena"
                className="block text-yellow-300 text-sm font-bold mb-2"
              >
                Contraseña:
              </label>
              <div className="input-box">
                <input
                  type="password"
                  name="contrasena"
                  onChange={(e) =>
                    setValues({ ...values, contrasena: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  //required
                />
              </div>
            </div>
            <div className="flex items-center justify-center pt-4">
              <button
                type="submit"
                className="bg-yellow-300 hover:bg-stone-900 transition text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Iniciar Sesión
              </button>
            </div>
            <div className="mt-4">
              <p className="text-center text-gray-500 text-xs">
                ¿Olvidaste tu contraseña?
                <Link to="/solicitar-cambio-contraseña">
                  <a
                    className="text-yellow-300 hover:text-yellow-400 transition"
                    href="#"
                  >
                    Recuperar contraseña
                  </a>
                </Link>
              </p>
            </div>
            <div className="mt-1">
              <p className="text-center text-gray-500 text-xs">
                ¿No tienes una cuenta?
                <Link to="/registro">
                  <a
                    className="text-yellow-300 hover:text-yellow-400 transition"
                    href="#"
                  >
                    Regístrate
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

export default Login;
