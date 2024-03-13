import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function ActualizarBebidas({ id }) {
  const [bebidas, setBebidas] = useState({});
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
  });

  /*useEffect(() => {
    axios
      .get(`http://localhost:3000/bebidas`)
      .then((response) => {
        setBebidas(response.data);
        setFormData({
          nombre: response.data.nombre,
          precio: response.data.precio,
        });
      })
      .catch((error) => {
        console.error("Error al actualizar la bebida", error);
      });
  }, [id]);*/

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const location = useLocation();
  const bebidaId = location.pathname.split("/")[2];

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3000/bebidas/editar/" + bebidaId, formData)
      .then((response) => {
        console.log("Bebida actualizada correctamente", response.data);
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
