import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CantidadBebidas() {
    const [cantidadBebidas, setCantidadBebidas] = useState([]);

    useEffect(() => {
      axios
        .get("http://localhost:3000/bebidas/cantidadBebidas/")
        .then((response) => {
          setCantidadBebidas(response.data);
        });
    }, []);
  return (
    <>
      <div className="bg-stone-600 shadow-md rounded px-4 pt-6 pb-6 mb-4 flex flex-col my-2">
        <div className="mb-2">
          <h2 className="text-3xl font-bold mb-2 text-slate-300">Productos en el inventario</h2>
          {cantidadBebidas.map((bebidas, index) => (
            <p key={index} className="text-slate-200 text-4xl mt-4 font-bold"> {bebidas.total_bebidas} </p>
          ))}
        </div>
      </div>
    </>
  );
}
