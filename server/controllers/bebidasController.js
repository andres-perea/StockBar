const path = require("path");
const fs = require("fs");
const Bebidas = require("../models/bebidasModel");

exports.mostrarBebidas = (req, res) => {
  Bebidas.mostrarBebidas((productos) => {
    res.json(productos);
  });
};

exports.cantidadBebidasVendidas = (req, res) => {
  Bebidas.cantidadBebidasVendidas((cantidad) => {
    res.json(cantidad);
  })
}

exports.crearBebidas = (req, res) => {
  if (!req.file) {
    return res.status(400).send('No se ha seleccionado ningún archivo.');
  }
  const uploadDir = path.join(__dirname, "img/");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filename = req.file.filename;
  const filePath = path.join(uploadDir, filename);

  fs.renameSync(req.file.path, filePath);

  const imagePathInDB = `img/${filename}`;

  const bebida = {
    nombre: req.body.nombre,
    cantidad: req.body.cantidad,
    precio: req.body.precio,
    descripcion: req.body.descripcion,
    categoria_id: req.body.categoria_id,
    imagen: imagePathInDB,
  };

  Bebidas.crearBebidas(bebida, (err, bebidaGuardada) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      res
        .status(201)
        .send({
          message: "Bebida registrada correctamente",
          bebida: bebidaGuardada,
        });
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
