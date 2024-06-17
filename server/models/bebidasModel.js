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

  static crearBebidaYRegistrarMovimiento(bebida, result) {
    const codigoAleatorio = this.generarNumeroAleatorio();
    const bebidaConCodigo = { ...bebida, codigo: codigoAleatorio };

    db.query("INSERT INTO bebidas SET ?", bebidaConCodigo, (err, res) => {
      if (err) {
        console.log("Error al insertar bebida:", err);
        result(err, null);
      } else {
        console.log("Bebida registrada correctamente");

        // Insertar en 'historial_movimiento'
        const movimiento = {
          tipo_movimiento: "Entrada al inventario",
          cantidad_movimiento: bebidaConCodigo.cantidad,
          saldo: bebidaConCodigo.cantidad,
          fecha_movimiento: new Date(),
          producto_codigo: bebidaConCodigo.codigo,
        };

        db.query(
          "INSERT INTO historial_movimiento SET ?",
          movimiento,
          (err, res) => {
            if (err) {
              console.log(
                "Error al insertar movimiento en historial_movimiento:",
                err
              );
              result(err, null);
            } else {
              console.log(
                "Movimiento registrado correctamente en historial_movimiento"
              );
              result(null, { id: res.insertId, codigo: codigoAleatorio });
            }
          }
        );

        const movimientoSalida = {
          cantidad_salida: bebidaConCodigo.cantidad,
          motivo_salida: "Venta inicial",
          producto_codigo: bebidaConCodigo.codigo,
        };

        db.query(
          "INSERT INTO salida_productos SET ?",
          movimientoSalida,
          (err, res) => {
            if (err) {
              console.log(
                "Error al insertar salida inicial en salida_productos:",
                err
              );
            } else {
              console.log(
                "Salida inicial registrada correctamente en salida_productos"
              );

              // Aquí es donde vamos a registrar en historial_movimiento
              const movimientoHistorial = {
                tipo_movimiento: "Salida del inventario",
                cantidad_movimiento: bebidaConCodigo.cantidad,
                saldo: 0, // Aquí debes establecer el saldo actualizado, si es aplicable
                fecha_movimiento: new Date(),
                producto_codigo: bebidaConCodigo.codigo,
              };

              db.query(
                "INSERT INTO historial_movimiento SET ?",
                movimientoHistorial,
                (err, res) => {
                  if (err) {
                    console.log(
                      "Error al insertar movimiento en historial_movimiento:",
                      err
                    );
                  } else {
                    console.log(
                      "Movimiento registrado correctamente en historial_movimiento"
                    );
                  }
                }
              );
            }
          }
        );
      }
    });
  }

  static insertarEntradaProductos(bebida, result) {
    const { cantidad, precio, codigo } = bebida;

    db.query(
      "INSERT INTO entrada_productos (cantidad_entrada, fecha_entrada, precio_compra, producto_codigo) VALUES (?, ?, ?, ?)",
      [cantidad, new Date(), precio, codigo],
      (err, res) => {
        if (err) {
          console.log("Error al insertar en entrada_productos:", err);
          result(err, null);
        } else {
          result(null, res.insertId);
        }
      }
    );
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

  static eliminarBebidaYRegistrarSalida(codigoBebida, result) {
    // Primero obtener los datos de la bebida que será eliminada
    db.query(
      "SELECT * FROM bebidas WHERE codigo = ?",
      codigoBebida,
      (err, rows) => {
        if (err) {
          console.log("Error al obtener la bebida a eliminar:", err);
          result(err, null);
        } else {
          if (rows.length === 0) {
            result({ message: "Bebida no encontrada" }, null);
          } else {
            const bebidaEliminada = rows[0];
            const { cantidad, codigo } = bebidaEliminada;

            // Eliminar la bebida de la tabla 'bebidas'
            db.query(
              "DELETE FROM bebidas WHERE codigo = ?",
              codigoBebida,
              (err, res) => {
                if (err) {
                  console.log("Error al eliminar bebida:", err);
                  result(err, null);
                } else {
                  console.log("Bebida eliminada correctamente");

                  // Insertar en 'salida_productos'
                  db.query(
                    "INSERT INTO salida_productos (fecha_salida, cantidad_salida, motivo_salida, producto_codigo) VALUES (?, ?, ?, ?)",
                    [new Date(), cantidad, "salida", codigo],
                    (err, res) => {
                      if (err) {
                        console.log(
                          "Error al insertar en salida_productos:",
                          err
                        );
                        result(err, null);
                      } else {
                        result(null, {
                          mensaje:
                            "Bebida eliminada y salida registrada correctamente",
                        });
                      }
                    }
                  );
                }
              }
            );
          }
        }
      }
    );
  }

  static cantidadBebidasVendidas(callback) {
    db.query(
      "SELECT SUM(cantidad) AS bebidas_vendidas FROM pedidos",
      (error, results) => {
        if (error) throw error;
        callback(results);
      }
    );
  }

  static cantidadBebidas(callback) {
    db.query(
      "SELECT SUM(cantidad) AS total_bebidas FROM bebidas",
      (error, results) => {
        if (error) throw error;
        callback(results);
      }
    );
  }
}

module.exports = Bebidas;
