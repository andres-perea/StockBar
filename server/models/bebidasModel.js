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

  static actualizarBebida(codigo, bebidaActualizada, result) {
    db.query(
      "UPDATE bebidas SET ? WHERE codigo = ?",
      [bebidaActualizada, codigo],
      (err, res) => {
        if (err) throw err;
        result(null, res);
      }
    );
  }

  static eliminarBebida(codigo, callback) {
    db.query("DELETE FROM bebidas WHERE codigo = ?", codigo, (err, res) => {
      if (err) {
        console.error("Error al eliminar la bebida:", err);
        callback(err, null);
        return;
      }
      console.log("Bebida eliminada correctamente:", res);
      callback(null, res);
    });
  }

  static cantidadBebidasVendidas(callback) {
    db.query("SELECT SUM(cantidad) AS bebidas_vendidas FROM pedidos", (error, results) => {
      if (error) throw error;
      callback(results);
    })
  }

  
}

module.exports = Bebidas;
