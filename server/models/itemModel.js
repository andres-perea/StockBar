const { query } = require("express");
const db = require("../db");

const Items = {
  obtenerItems: (callback) => {
    db.query("SELECT * FROM bebidas", callback);
  },

  obtenerPorFiltro: (query, callback) => {
    db.query(
      "SELECT * FROM bebidas WHERE nombre LIKE ? OR categoria LIKE ?",
      [`%${query}%`, `%${query}%`],
      callback
    );
  },
};

module.exports = Items;
