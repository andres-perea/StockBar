const db = require("../db");
const Categorias = require("../models/categoriaModel");

exports.crearCategorias = (req, res) => {
    const categoria = req.body;
    Categorias.crearCategorias(categoria, (err, bebidas) => {
      if (err) res.status(500).send({ message: err });
      else res.send({ message: "Categoria registrada correctamente" });
    });
  };