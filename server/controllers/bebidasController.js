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
  const bebidaId = req.params.id;
  const bebidaActualizada = req.body;
  Bebidas.actualizarBebida(bebidaId, bebidaActualizada, (err, data) => {
    if (err)
      res
        .status(500)
        .send({ message: err.message || "Error al actualizar la bebida." });
    else res.send({ message: "Bebida Actualizada" });
  });

  exports.eliminarBebida = (req, res) => {
    const bebidaId = req.params.id;
    Bebidas.eliminarBebida(bebidaId, (err, data) => {
      if (err)
      res
        .status(500)
        .send({ message: err.message || "Error al actualizar la bebida." });
    else res.send({ message: "Bebida Actualizada" });
    });
  };  
};
