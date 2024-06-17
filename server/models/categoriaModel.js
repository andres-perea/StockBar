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

  static eliminarCategoriaYActualizarBebidas(id, result) {
    db.query("DELETE FROM categorias WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("Error al eliminar categoría:", err);
        result(err, null);
      } else {
        console.log("Categoría eliminada correctamente");

        // Actualizar 'bebidas' donde 'categoria_id' = id
        db.query(
          "UPDATE bebidas SET categoria_id = NULL WHERE categoria_id = ?",
          [id],
          (err, res) => {
            if (err) {
              console.log("Error al actualizar bebidas:", err);
              result(err, null);
            } else {
              console.log("Bebidas actualizadas correctamente");
              result(null, {
                mensaje: "Categoría eliminada y bebidas actualizadas",
              });
            }
          }
        );
      }
    });
  }
}

module.exports = Categorias;
