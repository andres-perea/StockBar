const db = require("../db");
const Categorias = require("../models/categoriaModel");

exports.MostrarCategoria = (req, res) => {
  Categorias.mostrarCategorias((categorias) => {
    res.json(categorias);
  });
};

exports.cantidadEnCategoria = (req, res) => {
  Categorias.cantidadEnCategorias((error, data) => {
    if (error) {
      console.error("Error obteniendo categorías de bebidas", error);
      return res
        .status(500)
        .json({ error: "Error obteniendo categorías de bebidas" });
    }
    res.json(data);
  });
};

exports.cantidadCategorias = (req, res) => {
  Categorias.cantidadCategorias((cantidad) => {
    res.json(cantidad);
  })
}

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
