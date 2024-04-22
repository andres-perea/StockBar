const db = require("../db");

class Saldo {
  static mostrarSaldo(callback) {
    db.query("SELECT saldo FROM historial_movimiento", (error, results) => {
      if (error) throw error;
      callback(results);
    });
  }
}

module.exports = Saldo;