const db = require("../db");
const Bebidas = require("../models/bebidasModel");

exports.mostrarBebidas = (req, res) => {
  Bebidas.mostrarBebidas((productos) => {
    res.json(productos);
  });
};

exports.crearBebidas = (req, res) => {
  // Verificar si se subió un archivo
  if (!req.file) {
    return res.status(400).send({ message: "Debe subir una imagen" });
  }

  const bebida = req.body;
  const rutaImagen = req.file.path;

  bebida.imagen_ruta = rutaImagen;

  Bebidas.crearBebidas(bebida, (err, bebidas) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Error al guardar la bebida" });
    } else {
      res.send({ message: "Bebida registrada correctamente" });
    }
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