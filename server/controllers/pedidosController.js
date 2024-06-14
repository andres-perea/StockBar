const db = require("../db");
const Pedidos = require("../models/pedidosModel");

exports.obtenerPedidos = (req, res) => {
  Pedidos.ObtenerPedidos((err, pedidos) => {
    if (err) throw err;
    res.json(pedidos);
  });
};

exports.crearPedido = (req, res) => {
  const { detalles, nombreCliente, mesaReserva } = req.body;

  Pedidos.CrearPedido(
    detalles,
    nombreCliente,
    mesaReserva,
    (err, nuevosPedidos) => {
      if (err) {
        console.error("Error al crear el pedido:", err);
        return res.status(500).json({ error: "Error interno del servidor" });
      }
      res.json(nuevosPedidos);
    }
  );
};
