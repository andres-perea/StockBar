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
    const detalle = detalles[0];
    const sql = "INSERT INTO pedidos SET ?";

    db.query(sql, detalle, (err, result) => {
      if (err) return callback(err, null);
      const id = result.insertId;
      const pedido = {
        id: id,
        cantidad: detalle.cantidad,
        codigo_producto: detalle.codigo_producto,
      };

      callback(null, pedido);
    });
  }
}

module.exports = Pedidos;
