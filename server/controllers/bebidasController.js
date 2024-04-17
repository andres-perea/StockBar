const db = require("../db");
const Bebidas = require("../models/bebidasModel");

exports.mostrarBebidas = (req, res) => {
  Bebidas.mostrarBebidas((productos) => {
    res.json(productos);
  });
};

exports.crearBebidas = (req, res) => {
  const bebida = req.body;
  const rutaImagen = req.file.path;

  bebida.imagen_ruta = rutaImagen;
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
};

exports.eliminarBebida = (id, callback) => {
  Bebidas.eliminarBebida(id, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

exports.agregarImagenBebida = (req, res) => {
  const bebidaId = req.params.id;
  const imagenUrl = req.body.imagenUrl; 
  Bebidas.agregarImagenBebida(bebidaId, imagenUrl, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || "Error al agregar la imagen a la bebida." });
    } else {
      res.send({ message: "Imagen agregada a la bebida correctamente" });
    }
  });
};

