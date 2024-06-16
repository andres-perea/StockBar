import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdProductionQuantityLimits } from "react-icons/md";

export default function CantidadBebidas() {
  const [cantidad, setCantidad] = useState([]);
  const [cantidadBebidas, setCantidadBebidas] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/bebidas/cantidadBebidas/")
      .then((response) => {
        setCantidadBebidas(response.data);
      });

    const obtenerBebidas = async () => {
      try {
        const response = await axios.get("http://localhost:3000/bebidas/");
        setCantidad(response.data);
      } catch (error) {
        console.error("Error al obtener las bebidas", error);
      }
    };

    obtenerBebidas();
  }, []);

  return (
    <>
      <div className="bg-gray-200 shadow-md rounded px-4 pt-6 pb-6 mb-4 flex flex-col my-2">
        <div className="mb-4">
          <h2 className="text-3xl font-bold mb-2 text-stone-600">
            Productos en el inventario
          </h2>
          <div className="flex flex-auto p-4 gap-2 justify-between text-center">
            {cantidadBebidas.map((bebidas, index) => (
              <p key={index} className="text-stone-600 text-4xl mt-4 font-bold">
                {bebidas.total_bebidas}
              </p>
            ))}
            <MdProductionQuantityLimits className="text-7xl font-bold bg-yellow-300 py-4 px-4 rounded" />
          </div>
        </div>
      </div>
    </>
  );
}
