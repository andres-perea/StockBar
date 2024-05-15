const Filtro = require("../models/filtroModel");

exports.obtenerDatos = (req, res) => {
  Filtro.obtenerDatos((error, datos) => {
    if (error) {
      res.status(500).send({
        message: error.message || "Error al obtener los datos.",
      });
      return;
    }
    res.json(datos);
  });
};
