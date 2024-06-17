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

  static generarNumeroAleatorio() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  static crearBebidaConCodigoAleatorio(bebida, result) {
    const codigoAleatorio = this.generarNumeroAleatorio();
    const bebidaConCodigo = { ...bebida, codigo: codigoAleatorio };

    db.query("INSERT INTO bebidas SET ?", bebidaConCodigo, (err, res) => {
      if (err) {
        console.log("Error al insertar bebida:", err);
        result(err, null);
      } else {
        console.log("Bebida registrada correctamente");
        result(null, { id: res.insertId, codigo: codigoAleatorio });
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

  static cantidadBebidas(callback) {
    db.query("SELECT SUM(cantidad) AS total_bebidas FROM bebidas", (error, results) => {
      if (error) throw error;
      callback(results);
    })
  }
}

module.exports = Bebidas;
