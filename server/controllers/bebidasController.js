const db = require("../db");
const Bebidas = require("../models/bebidasModel");

exports.mostrarBebidas = (req, res) => {
  Bebidas.mostrarBebidas((productos) => {
    res.json(productos);
  });
};

exports.bebidaPorId = (req, res) => {
  const id = req.params.id;
  Bebidas.bebidaPorId(
    (id,
    (bebida) => {
      res.json(bebida);
    })
  );
};

exports.crearBebidas = (req, res) => {
  const bebida = req.body;
  Bebidas.crearBebidas(bebida, (err, bebidas) => {
    if (err) res.status(500).send({ message: err });
    else res.send({ message: "Bebida registrada correctamente" });
  });
};

exports.actualizarBebida = (req, res) => {
  const { id } = req.params;
  const actualizarBebida = req.body;
  Bebidas.actualizarBebida(id, actualizarBebida, (affectedRows) => {
    res.send("Bebida actualizada conrrectamente");
  });
};
