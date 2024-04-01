const db = require("../db");

class Categorias {
  static mostrarCategorias(callback) {
    db.query("SELECT * FROM categorias", (error, results) => {
      if (error) throw error;
      callback(results);
    });
  }

  static crearCategorias(categoria, result) {
    db.query("INSERT INTO categorias SET ?", categoria, (err, res) => {
      if (err) {
        console.log("Error:", err);
        result(err, null);
      } else {
        console.log("Categoria registrada correctamente");
        result(null, res.insertId);
      }
    });
  }
}

module.exports = Categorias