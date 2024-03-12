import React, { useEffect, useState } from "react";
import axios from "axios";

function ActualizarBebidas({ id }) {
  const [datos, setDatos] = useState({
    nombre: "",
    precio: "",
  });

  useEffect(() => {
    const solicitarProducto = async () => {
      try {
        const response = await fetch(`/bebidas/actualizarBebidas/${id}`);
        const data = await response.json();
        setDatos(data);
      } catch (error) {
        console.error("Error al obtener los datos del producto:", error);
      }
    };

    solicitarProducto();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/bebidas/actualizarBebidas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });

      if (response.ok) {
        console.log("Producto actualizado exitosamente");
      } else {
        console.error("Error al actualizar el producto");
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
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
              value={bebidas.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="">
            <label htmlFor="precio">Precio: </label>
            <input
              type="text"
              name="precio"
              value={bebidas.precio}
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
