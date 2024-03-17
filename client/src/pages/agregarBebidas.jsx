import axios from "axios";
import React, { useState } from "react";

function AgregarBebidas() {
  const [values, setValues] = useState({
    nombre: "",
    cantidad: "",
    precio: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/bebidas/agregarBebidas", values)
      .then(function (response) {
        console.log(response);
        alert("Bebida registrada correctamente");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <div className="">
        <h2>Agregar bebidas</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="">
            <label htmlFor="nombre">Nombre: </label>
            <input
              type="text"
              placeholder="Ingrese nombre de la bebida"
              onChange={(e) => setValues({ ...values, nombre: e.target.value })}
              required
            />
          </div>
          <div className="">
            <label htmlFor="cantidad">cantidad: </label>
            <input
              type="text"
              placeholder="Ingrese cantidad de la bebida"
              onChange={(e) =>
                setValues({ ...values, cantidad: e.target.value })
              }
              required
            />
          </div>
          <div className="">
            <label htmlFor="precio">Precio: </label>
            <input
              type="text"
              placeholder="Ingrese el precio de la bebida"
              onChange={(e) => setValues({ ...values, precio: e.target.value })}
              required
            />
          </div>
          <button type="submit">Agregar Producto</button>
        </form>
      </div>
    </>
  );
}

export default AgregarBebidas;
