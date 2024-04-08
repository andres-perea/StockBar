const db = require("../db");

class Pedidos {
  static ObtenerPedidos(callback) {
    db.query("SELECT * FROM pedidos", (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  }

  static CrearPedido(bebida_id, cantidad, callback) {
    db.query(
      "INSERT INTO pedidos (cantidad_pedido, bebida_id) VALUES (?, ?, ?)",
      [cantidad, bebida_id],
      (err, result) => {
        if (err) return callback(err, null);
        callback(null, { id: result.id, bebida_id, cantidad });
      }
    );
  }
}

module.exports = Pedidos;
