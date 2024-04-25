import axios from "axios";
import React, { useEffect, useState } from "react";

function Saldo() {
  const [historialMovimiento, setHistorialMovimiento] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/saldo/").then((response) => {
      setHistorialMovimiento(response.data);
    });
  }, []);

  return (
    <>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Saldo</h2>
          {historialMovimiento.map((historial_movimiento, index) => (
            <p key={index}> {historial_movimiento.saldo} </p>
          ))}
        </div>
      </div>
    </>
  );
}

export default Saldo;
