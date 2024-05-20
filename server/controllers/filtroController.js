const Filtro = require("../models/filtroModel");

exports.obtenerDatos = (req, res) => {
  Filtro.obtenerDatos((error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.json(results);
    }
  });
};

exports.obtenerPorFiltro = (req, res) => {
  const filtro = req.query.filtro || "";
  Filtro.obtenerPorFiltro(filtro, (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.json(results);
    }
  });
};
