const db = require("../db");

const Items = {
  buscar: (query, callback) => {
    const sql = "SELECT * FROM bebidas WHERE nombre LIKE ?";
    db.query(sql, [`%${query}%`], callback);
  },
};

module.exports = Items;
