const db = require("../db");
const Pedidos = require("../models/pedidosModel");

exports.obtenerPedidos = (req, res) => {
  Pedidos.ObtenerPedidos((err, pedidos) => {
    if (err) throw err;
    res.json(pedidos);
  });
};

exports.crearPedido = (req, res) => {
  const { bebida_id, cantidad } = req.body;
  Pedidos.CrearPedido(bebida_id, cantidad, (err, nuevoPedido) => {
    if (err) throw err;
    res.json(nuevoPedido);
  });
};
