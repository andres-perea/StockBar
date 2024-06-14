import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdAttachMoney } from "react-icons/md";


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
        <div className="bg-gray-200 shadow-md rounded px-4 pt-6 pb-8 mb-4 flex flex-col my-2">
          <div className="mb-2">
            <h2 className="text-3xl font-bold mb-2 text-stone-600">Productos <br /> vendidos</h2>
            <div className="flex flex-auto p-4 gap-2 justify-between text-center">
            <h2 className="text-3xl font-bold mb-2 text-slate-300">Productos <br /> vendidos</h2>
            {cantidadBebidasVendidas.map((bebidas, index) => (
              <p key={index} className="text-stone-600 text-4xl mt-4 font-bold"> {bebidas.bebidas_vendidas} </p>
            ))}
            <MdAttachMoney className="text-7xl font-bold bg-yellow-300 py-4 px-4 rounded" />
            </div>
          </div>
        </div>
      </>
    );
  }