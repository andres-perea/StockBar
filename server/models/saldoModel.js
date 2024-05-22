const db = require("../db");

class Saldo {
  static obtenerSaldo(callback) {
    db.query("SELECT producto_codigo, saldo FROM historial_movimiento", (error, results) => {
      if (error) throw error;
      callback(results);
    });
  }
}

module.exports = Saldo;