const db = require("../db");

class Bebidas {
  static mostrarBebidas(callback) {
    db.query("SELECT * FROM bebidas", (error, results) => {
      if (error) throw error;
      callback(results);
    });
  }

  static crearBebidas(bebida, result) {
    db.query("INSERT INTO bebidas SET ?", bebida, (err, res) => {
      if (err) {
        console.log("Error:", err);
        result(err, null);
      } else {
        console.log("Bebida registrada correctamente");
      result(null, res.insertId);
      }
    });
  }

  static actualizarBebidas(id, bebida, callback) {
    db.query("UPDATE bebidas SET ? WHERE id = ?", [id], (err, res) => {
      if (err) {
        console.log("Error:", err);
        result(err, null);
      } else {
        console.log("Bebida actualizada correctamente");
      result(null, res.insertId);
      }
    })
  }
}

module.exports = Bebidas;
