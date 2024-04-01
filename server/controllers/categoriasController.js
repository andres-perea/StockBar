const db = require("../db");
const Categorias = require("../models/categoriaModel");

exports.MostrarCategoria = (req, res) => {
  Categorias.mostrarCategorias((categorias) => {
    res.json(categorias);
  });
};

exports.crearCategorias = (req, res) => {
  const categoria = req.body;
  Categorias.crearCategorias(categoria, (err, bebidas) => {
    if (err) res.status(500).send({ message: err });
    else res.send({ message: "Categoria registrada correctamente" });
  });
};

exports.eliminarCategoria = (id, callback) => {
  Categorias.eliminarCategoria(id, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};
