const db = require("../db");

const Reservas = {
  todasLasReservas: (callback) => {
    db.query("SELECT * FROM reservas", (error, results) => {
      if (error) throw error;
      callback(results);
    });
  },

  crearReserva: (data, callback) => {
    const query =
      "INSERT INTO reservas (nombre_cliente, numero_mesa) VALUES (?, ?)";
    const values = [data.nombre_cliente, data.numero_mesa];

    db.query(query, values, (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  },

  eliminarReserva: (id, callback) => {
    db.query("DELETE FROM reservas WHERE id = ?", id, (err, res) => {
      if (err) {
        console.error("Error al eliminar la reserva", err);
        callback(err, null);
        return;
      }
      console.log("Reserva eliminada correctamente:", res);
      callback(null, res);
    });
  },
};

module.exports = Reservas;
