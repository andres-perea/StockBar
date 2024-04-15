import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
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
    axios
      .post("http://localhost:3000/api/auth/login", values)
      .then(function (response) {
        console.log(response);
        console.log(response.data);
        navigate("/dashboard");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div class="flex items-center justify-center h-screen bg-gray-200">
      <div className="bg-neutral-50 p-2 rounded-lg shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="max-w-xs mx-auto">
          <h2 className="text-3xl text-blue-600 font-bold p-8 items-center uppercase">
            Iniciar Sesión
          </h2>
          <form action="" onSubmit={handleSubmit}>
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
                onChange={(e) =>
                  setValues({ ...values, nombreUsuario: e.target.value })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                //required
              />
            </div>
            <div className="campo">
              <label
                htmlFor="contrasena"
                className="block text-gray-700 text-sm font-bold mb-2"
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
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Iniciar Sesión
              </button>
            </div>
            <div class="mt-4">
              <p class="text-center text-gray-500 text-xs">
                ¿No tienes una cuenta?
                <Link to="/registro">
                  <a class="text-blue-500 hover:text-blue-800" href="#">
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
