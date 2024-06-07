import React from "react";

const CantidadBebidas = ({ cantidadBebidas }) => {
  return (
    <div className="mb-2">
      <h2 className="text-2xl font-bold mb-2">Productos en el inventario</h2>
      {cantidadBebidas.map((bebidas, index) => (
        <p key={index} className="text-slate-600 text-4xl mt-4 font-bold">
          {bebidas.total_bebidas}
        </p>
      ))}
    </div>
  );
};

export default CantidadBebidas;
