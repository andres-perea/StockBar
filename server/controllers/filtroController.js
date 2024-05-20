const Filtro = require("../models/filtroModel");

exports.datosEntrada = (req, res) => {
  Filtro.datosEntrada((datos) => {
    res.json(datos);
  });
};
