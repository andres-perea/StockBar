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
        <div className="bg-white shadow-md rounded px-4 pt-6 pb-6 mb-4 flex flex-col my-2">
          <div className="mb-2">
            <h2 className="text-2xl font-bold mb-2">Productos vendidos</h2>
            {cantidadBebidasVendidas.map((bebidas, index) => (
              <p key={index} className="text-slate-600 text-4xl mt-4 font-bold"> {bebidas.bebidas_vendidas} </p>
            ))}
          </div>
        </div>
      </>
    );
  }