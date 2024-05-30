const Items = require("../models/itemModel");

const buscarProducto = (req, res) => {
  const query = req.query.query;
  Items.buscar(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
};

module.exports = { buscarProducto };
