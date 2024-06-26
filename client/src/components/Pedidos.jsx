import axiosInstance from "../utils/axiosInstance";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [numeroPagina, setNumeroPagina] = useState(0);
  const pedidosPorPagina = 3;

  const pageCount = Math.ceil(pedidos.length / pedidosPorPagina);
  const pedidosMostrados = pedidos.slice(
    numeroPagina * pedidosPorPagina,
    (numeroPagina + 1) * pedidosPorPagina
  );

  const handlePageChange = ({ selected }) => {
    setNumeroPagina(selected);
  };

  useEffect(() => {
    axiosInstance.get("/pedidos/").then((response) => {
      setPedidos(response.data);
    });
  }, []);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Pedidos</h2>
      <div className="flex justify-center p-2 rounded-lg mt-4 flex-col items-center">
        <div className="w-full overflow-x-auto">
          <table className="border-collapse border border-slate-400 w-full text-center min-w-max">
            <thead>
              <tr>
                <th className="border border-slate-600 text-lg text-gray-600 py-2 px-2">
                  Nombre del Cliente
                </th>
                <th className="border border-slate-600 text-lg text-gray-600 py-2 px-2">
                  Mesa de reserva
                </th>
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
              {pedidosMostrados.map((pedido) => (
                <tr key={pedido.id}>
                  <td className="border border-slate-600 font-bold bg-gray-100 text-gray-600 py-2 px-4">
                    {pedido.nombre_cliente}
                  </td>
                  <td className="border border-slate-600 font-bold bg-gray-100 text-gray-600 py-2 px-4">
                    {pedido.mesa_reserva}
                  </td>
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
        <ReactPaginate
          className="flex flex-wrap p-6 gap-2"
          previousLabel={"Anterior"}
          nextLabel={"Siguiente"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
}
