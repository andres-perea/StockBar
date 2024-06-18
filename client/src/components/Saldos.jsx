import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export default function Saldos() {
  const [bebidasVendidas, setBebidasVendidas] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/bebidas/cantidadBebidasVedidas/")
      .then((respone) => {
        setBebidasVendidas(respone.data);
      });
  });

  return (
    <>
      <div className="bg-white shadow-md rounded px-4 pt-6 pb-b mb-4 flex flex-col my-2">
        <div className="mb-2">
          <h2 className="text-2xl font-bold mb-2">Productos vendidos</h2>
          {bebidasVendidas.map((bebidas, index) => {
            <p key={index} className="text-slate-600 text-4xl mt-4 font-bold">
              {bebidas.bebidas_vendidas}
            </p>;
          })}
        </div>
      </div>
    </>
  );
}
