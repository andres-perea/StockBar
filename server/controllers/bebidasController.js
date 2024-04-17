const path = require("path");
const fs = require("fs");
const Bebidas = require("../models/bebidasModel");

exports.mostrarBebidas = (req, res) => {
  Bebidas.mostrarBebidas((productos) => {
    res.json(productos);
  });
};

exports.crearBebidas = (req, res) => {
  const uploadDir = path.join(__dirname, "img");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const filename = req.file.filename;
  const filePath = path.join(uploadDir, filename);
  fs.renameSync(req.file.path, filePath);

  const imagePathInDB = `./client/src/img/${filename}`;

  const bebida = {
    nombre: req.body.nombre,
    cantidad: req.body.cantidad,
    precio: req.body.precio,
    descripcion: req.body.descripcion,
    categoria_id: req.body.categoria_id,
    imagen: imagePathInDB,
  };
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
