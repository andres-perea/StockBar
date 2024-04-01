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

  static eliminarCategoria(id, callback) {
    db.query("DELETE FROM categorias WHERE id = ?", id, (err, res) => {
      if (err) {
        console.error("Error al eliminar la categoria:", err);
        callback(err, null);
        return;
      }
      console.log("Categoria eliminada correctamente:", res);
      callback(null, res);
    });
  }
}

module.exports = Categorias;
