const db = require("../db");

class Pedidos {
  static ObtenerPedidos(callback) {
    db.query(
      "SELECT  pedidos.nombre_cliente, pedidos.mesa_reserva, bebidas.nombre, pedidos.cantidad, bebidas.precio FROM pedidos INNER JOIN bebidas ON pedidos.codigo_producto = bebidas.codigo",
      (err, results) => {
        if (err) return callback(err, null);
        callback(null, results);
      }
    );
  }

  static CrearPedido(detalles, callback) {
    const sqlInsertPedido =
      "INSERT INTO pedidos (codigo_producto, cantidad, nombre_cliente, mesa_reserva) VALUES ?";
    const values = detalles.map((detalle) => [
      detalle.codigo_producto,
      detalle.cantidad,
      detalle.nombre_cliente,
      detalle.mesa_reserva,
    ]);

    db.beginTransaction((err) => {
      if (err) {
        console.error("Error al iniciar transacción:", err);
        return callback(err, null);
      }

      db.query(sqlInsertPedido, [values], (err, result) => {
        if (err) {
          db.rollback(() => {
            console.error("Error al insertar pedido:", err);
            callback(err, null);
          });
        } else {
          const idPedido = result.insertId;
          const pedido = {
            id: idPedido,
            detalles: detalles,
          };

          // Actualizar la cantidad en bebidas y ejecutar procedimiento nueva_salida_producto
          const sqlActualizarCantidad =
            "UPDATE bebidas SET cantidad = cantidad - ? WHERE codigo = ?";
          const sqlNuevaSalida =
            "INSERT INTO salida_productos (fecha_salida, cantidad_salida, motivo_salida, producto_codigo) VALUES (NOW(), ?, 'Venta realizada', ?)";

          detalles.forEach((detalle) => {
            db.query(
              sqlActualizarCantidad,
              [detalle.cantidad, detalle.codigo_producto],
              (err, result) => {
                if (err) {
                  db.rollback(() => {
                    console.error(
                      "Error al actualizar cantidad en bebidas:",
                      err
                    );
                    callback(err, null);
                  });
                } else {
                  console.log(
                    `Cantidad actualizada en bebidas para código ${detalle.codigo_producto}`
                  );
                }
              }
            );

            db.query(
              sqlNuevaSalida,
              [detalle.cantidad, detalle.codigo_producto],
              (err, result) => {
                if (err) {
                  db.rollback(() => {
                    console.error(
                      "Error al ejecutar procedimiento nueva_salida_producto:",
                      err
                    );
                    callback(err, null);
                  });
                } else {
                  console.log(
                    "Procedimiento nueva_salida_producto ejecutado correctamente"
                  );
                }
              }
            );
          });

          db.commit((err) => {
            if (err) {
              db.rollback(() => {
                console.error("Error al hacer commit:", err);
                callback(err, null);
              });
            } else {
              console.log(
                "Pedido creado y transacciones completadas correctamente"
              );
              callback(null, pedido);
            }
          });
        }
      });
    });
  }
}

module.exports = Pedidos;
