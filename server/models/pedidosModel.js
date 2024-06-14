const db = require("../db");

class Pedidos {
  static ObtenerPedidos(callback) {
    db.query(
      "SELECT bebidas.nombre, pedidos.cantidad, bebidas.precio FROM pedidos INNER JOIN bebidas ON pedidos.codigo_producto = bebidas.codigo",
      (err, results) => {
        if (err) return callback(err, null);
        callback(null, results);
      }
    );
  }

  static CrearPedido(detalles, callback) {
    const sql = "INSERT INTO pedidos (codigo_producto, cantidad, nombre_cliente, mesa_reserva) VALUES ?";
    const values = detalles.map(detalle => [detalle.codigo_producto, detalle.cantidad, nombreCliente, mesaReserva]);  
    db.query(sql, [values], (err, result) => {
      if (err) return callback(err, null);
      const id = result.insertId;
      const pedido = {
        id: id,
        detalles: detalles,
        nombre_cliente: nombreCliente,
        mesa_reserva: mesaReserva
      };  
      callback(null, pedido);
    });
  }  
}

module.exports = Pedidos;
