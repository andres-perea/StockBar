const db = require("../db");

class Categorias {
  static mostrarCategorias(callback) {
    db.query("SELECT * FROM categorias", (error, results) => {
      if (error) throw error;
      callback(results);
    });
  }

  static cantidadEnCategorias(callback) {
    db.query(
      `SELECT c.nombre AS categoria, SUM(b.cantidad) AS total_cantidad
    FROM bebidas b
    JOIN categorias c ON b.categoria_id = c.id
    GROUP BY c.nombre`,
      (error, results) => {
        if (error) {
          console.error("Error executing query", error);
          return callback(error, null); // Manejar el error una vez
        }
        const data = results.map((row) => ({
          name: row.categoria,
          value: row.total_cantidad,
        }));
        callback(null, data); // Enviar los datos una vez
      }
    );
  }

  static cantidadCategorias(callback) {
    db.query(
      "SELECT COUNT(*) AS total_categorias FROM categorias",
      (error, results) => {
        if (error) throw error;
        callback(results);
      }
    );
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
