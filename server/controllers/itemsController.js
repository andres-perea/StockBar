const Items = require("../models/itemModel");

const obtenerItems = (req, res) => {
  const { query } = req.query;
  if (query) {
    Items.obtenerPorFiltro(query, (err, results) => {
      if (err) {
        return;
        res.status(500).send(err);
      }
      res.json(results);
    });
  } else {
    Items.obtenerItems((err, results) => {
      if (err) {
        return;
        res.status(500).send(err);
      }
      res.json(results);
    });
  }
};

module.exports = {
  obtenerItems,
};
