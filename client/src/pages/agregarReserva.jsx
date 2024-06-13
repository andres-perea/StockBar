import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AgregarReservas() {
  const [values, setValues] = useState({
    nombre_cliente: "",
    numero_mesa: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/reservas/crearReserva", values)
      .then(function (response) {
        console.log(response.data);
        if (response.data && response.data.token) {
          localStorage.setItem("authToken", response.data.token);
          toast.success("Reserva creada exitosamente");
          setTimeout(() => {
            navigate("/menu");
          }, 2000); // Espera 2 segundos antes de navegar
        } else {
          toast.error("Reserva fallida");
        }
      })
      .catch(function (error) {
        console.error(error);
        toast.error("Hubo un error, por favor intente nuevamente");
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-stone-900">
      <div className="bg-stone-700 p-2 rounded-lg shadow-md px-8 pt-6 pb-8 mb-4">
        <div className="max-w-xs mx-auto">
          <h2 className="text-3xl text-yellow-300 font-bold p-8 align-center">
            Reservacion de mesa
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-yellow-300 text-sm font-bold mb-2">
                Nombre:
                <input
                  type="text"
                  name="nombre"
                  onChange={(e) =>
                    setValues({ ...values, nombre_cliente: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full my-2 py-2 px-3 text-gray-700 font-semibold leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-yellow-300 text-sm font-bold mb-2">
                Seleccione la mesa:
                <select
                  onChange={(e) =>
                    setValues({ ...values, numero_mesa: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full my-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="0">. . .</option>
                  <option value="1">Mesa 1</option>
                  <option value="2">Mesa 2</option>
                  <option value="3">Mesa 3</option>
                  <option value="4">Mesa 4</option>
                  <option value="5">Mesa 5</option>
                  <option value="6">Mesa 6</option>
                  <option value="7">Mesa 7</option>
                  <option value="8">Mesa 8</option>
                  <option value="9">Mesa 9</option>
                  <option value="10">Mesa 10</option>
                </select>
              </label>
            </div>
            <div className="flex items-center justify-center pt-4">
              <button
                type="submit"
                className="bg-yellow-300 hover:bg-stone-900 transition text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Reservar Mesa
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default AgregarReservas;
