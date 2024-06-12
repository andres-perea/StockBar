import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/pedidos/").then((response) => {
      setPedidos(response.data);
    });
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Pedidos</h2>
      <div className="flex justify-center p-2 rounded-lg mt-4">
        <table className="border-collapse border border-slate-400 w-full text-center">
          <thead>
            <tr>
              <th className="border border-slate-600 text-lg text-gray-600 py-2 px-2">
                Nombre del Producto
              </th>
              <th className="border border-slate-600 text-lg text-gray-600 py-2 px-2">
                Cantidad Vendida
              </th>
              <th className="border border-slate-600 text-lg text-gray-600 py-2 px-2">
                Precio de Venta
              </th>
              <th className="border border-slate-600 text-lg text-gray-600 py-2 px-2">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td className="border border-slate-600 font-bold bg-gray-100 text-gray-600 py-2 px-4">
                  {pedido.nombre}
                </td>
                <td className="border border-slate-600 font-bold bg-gray-100 text-gray-600 py-2 px-4">
                  {pedido.cantidad}
                </td>
                <td className="border border-slate-600 font-bold bg-gray-100 text-gray-600 py-2 px-4">
                  {pedido.precio}
                </td>
                <td className="border border-slate-600 font-bold bg-gray-100 text-gray-600 py-2 px-4">
                  {pedido.precio * pedido.cantidad}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
