const express = require("express");
const router = express.Router();
const categoriasController = require("../controllers/categoriasController");

router.get("/", categoriasController.MostrarCategoria);

router.get("/bebidas", categoriasController.cantidadEnCategoria);

router.get("/cantidadCategorias", categoriasController.cantidadCategorias);

router.post("/agregarCategorias", categoriasController.crearCategorias);

router.delete("/eliminar/:id", (req, res) => {
  const id = req.params.id;
  categoriasController.eliminarCategoria(id, (err, data) => {
    if (err) {
      res
        .status(500)
        .send({ message: err.message || "Error al eliminar la categoria" });
    } else {
      res.send({ message: "Categoria eliminada correctamente" });
    }
  });
});

module.exports = router;
