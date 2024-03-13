import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function ActualizarBebidas({ id }) {
  const [bebidas, setBebidas] = useState({});
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const location = useLocation();
  const bebidaId = location.pathname.split("/")[2];

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3000/bebidas/editar/" + bebidaId, formData)
      .then((response) => {
        console.log("Bebida actualizada correctamente", response.data);
        alert("Bebida actualizada correctamente");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error al actualizar la bebida seleccionada", error);
      });
  };

  return (
    <>
      <div className="">
        <h2>Actualizar Bebidas</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="">
            <label htmlFor="nombre">Nombre: </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="">
            <label htmlFor="precio">Precio: </label>
            <input
              type="text"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
            />
          </div>
          <button>Actualizar Datos</button>
        </form>
      </div>
    </>
  );
}

export default ActualizarBebidas;
