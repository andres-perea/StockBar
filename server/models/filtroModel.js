const db = require("../db");

class Filtro {
  static obtenerDatos(callback) {
    db.query(
      "SELECT b.codigo, b.nombre, b.cantidad, b.descripcion, e.cantidad_entrada, e.fecha_entrada, s.cantidad_salida, s.precio_venta, s.fecha_salida FROM bebidas b JOIN entrada_productos e ON b.codigo = e.producto_codigo JOIN salida_productos s ON b.codigo = s.producto_codigo",
      (error, results) => {
        if (error) throw error;
        callback(results);
      }
    );
  }
}

module.exports = Filtro;