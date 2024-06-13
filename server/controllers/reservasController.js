const Reserva = require("../models/reservasModel");
const jwt = require("jsonwebtoken");

exports.mostrarReservas = (req, res) => {
  Reserva.todasLasReservas((err, reservas) => {
    if (err) throw err;
    res.json(reservas);
  });
};

exports.crearReserva = (req, res) => {
  const data = {
    nombre_cliente: req.body.nombre_cliente,
    numero_mesa: req.body.numero_mesa,
  };

  Reserva.crearReserva(data, (err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Hubo un error al crear la reserva" });
    }

    const reservaId = result.insertId;
    const token = jwt.sign(
      { id: reservaId, nombre_cliente: data.nombre_cliente },
      'holaMundo',
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Reserva creada exitosamente', token });
    res.status(200).json({ message: "Reserva creada exitosamente", result });
  });
};

exports.eliminarReserva = (id, callback) => {
  Reserva.eliminarReserva(id, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};
