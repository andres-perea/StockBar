const { query } = require("express");
const db = require("../db");

class Bebidas {
  static mostrarBebidas(callback) {
    db.query("SELECT * FROM bebidas", (error, results) => {
      if (error) throw error;
      callback(results);
    });
  }

  static bebidaPorId(id, callback) {
    db.query("SELECT * FROM bebidas WHERE id = ?", [id], (error, results) => {
      if (error) throw error;
      callback(results[0]);
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

  static actualizarBebida(id, bebidaActualizada, result) {
    db.query(
      "UPDATE bebidas SET ? WHERE id = ?",
      [bebidaActualizada, id],
      (err, res) => {
        if (err) throw err;
        result(null, res);
      }
    );
  }
}

module.exports = Bebidas;
