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
  return (
    <>
      <div className="">
        {bebidas.map((value, key) => {
          return (
            <>
              <div className="">
                {value.id}
                <div className=""> {value.nombre}</div>
                <div className=""> {value.precio} </div>
                <Link to={`/bebida:${value.id}`}>
                  <a href="">Actualizar</a>
                </Link>
              </div>
            </>
          );
        })}
        <Link to="/agregarBebida">
          <button>Agregar bebida</button>
        </Link>
      </div>
    </>
  );
}

export default Bebidas;
