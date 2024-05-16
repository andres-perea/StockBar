const db = require("../db");

class HistorialInventario {
  static datosEntrada(callback) {
    db.query(
      "SELECT b.codigo, b.nombre, b.descripcion, e.precio_compra, e.cantidad_entrada, e.fecha_entrada FROM bebidas b JOIN entrada_productos e ON b.codigo = e.producto_codigo",
      (error, results) => {
        if (error) throw error;
        callback(results);
      }
    );
  }
}

module.exports = HistorialInventario;
