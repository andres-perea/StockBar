import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Bebidas() {
  const [bebidas, setBebidas] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/bebidas/").then((response) => {
      setBebidas(response.data);
    });
  }, []);

  const handleDelete = async (bebidaId) => {
    try {
      await axios.delete("http://localhost:3000/bebidas/eliminar/" + bebidaId);
      alert("Bebida eliminada correctamente");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="">
        {bebidas.map((bebidas) => (
          <div className="bebidas" key={bebidas.id}>
            <h2> {bebidas.nombre} </h2>
            <p> {bebidas.precio} </p>
            <button onClick={() => handleDelete(bebidas.id)}>Eliminar</button>
            <button>
              <Link to={`/actualizarBebida/${bebidas.id}`}>Actualizar</Link>
            </button>
          </div>
        ))}
        <Link to="/agregarBebida">
          <button>Agregar bebida</button>
        </Link>
      </div>
    </>
  );
}

export default Bebidas;
