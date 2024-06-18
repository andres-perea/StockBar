import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { MdOutlineCategory } from "react-icons/md";

export default function CategoriasInventario() {
  const [cantidad, setCantidad] = useState([]);
  const [cantidadCategorias, setCantidadCategorias] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/categorias/cantidadCategorias")
      .then((response) => {
        setCantidadCategorias(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la cantidad de categorías", error);
      });

    const obtenerCategorias = async () => {
      try {
        const response = await axiosInstance.get("/categorias/");
        setCantidad(response.data);
      } catch (error) {
        console.error("Error al obtener las bebidas", error);
      }
    };

    obtenerCategorias();
  }, []);

  return (
    <>
      <div className="bg-gray-200 shadow-md rounded px-4 pt-6 pb-6 mb-4 flex flex-col my-2">
        <div className="mb-4">
          <h2 className="text-3xl font-bold mb-2 text-stone-600">
            Categorias creadas
          </h2>
          <div className="flex flex-auto p-4 gap-2 justify-between text-center">
            {cantidadCategorias.map((categoria, index) => (
              <p key={index} className="text-stone-600 text-5xl mt-4 font-bold">
                {categoria.total_categorias}
              </p>
            ))}
            <MdOutlineCategory className="text-7xl font-bold bg-yellow-300 py-4 px-4 rounded" />
          </div>
        </div>
      </div>
    </>
  );
}
