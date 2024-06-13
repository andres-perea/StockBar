import axios from "axios";
import React, { useEffect, useState } from "react";

export default function CantidadBebidasVendidas() {
    const [cantidadBebidasVendidas, setCantidadBebidasVendidas] = useState([]);
    
    useEffect(() => {
      axios
        .get("http://localhost:3000/bebidas/cantidadBebidasVendidas/")
        .then((response) => {
          setCantidadBebidasVendidas(response.data);
        });
    }, []);
  
    return (
      <>
        <div className="bg-stone-600 shadow-md rounded px-4 pt-6 pb-6 mb-4 flex flex-col my-2">
          <div className="mb-2">
            <h2 className="text-3xl font-bold mb-2 text-slate-300">Productos <br /> vendidos</h2>
            {cantidadBebidasVendidas.map((bebidas, index) => (
              <p key={index} className="text-slate-200 text-4xl mt-4 font-bold"> {bebidas.bebidas_vendidas} </p>
            ))}
          </div>
        </div>
      </>
    );
  }