const db = require("../db");

class Filtro {
  static obtenerDatos(callback) {
    db.query("SELECT * FROM historial_movimiento", (error, results) => {
      if (error) throw error;
      callback(results);
    });
  }

  static obtenerPorFiltro(filtro, callback) {
    db.query(
      "SELECT b.codigo, b.nombre, b.descripcion, e.precio_compra, e.cantidad_entrada, e.fecha_entrada FROM bebidas b JOIN entrada_productos e ON b.codigo = e.producto_codigo WHERE codigo = ?",
      [`%${filtro}%`],
      callback
    );
  }
}

module.exports = Filtro;
