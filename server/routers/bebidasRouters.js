const express = require("express");
const router = express.Router();
const upload = require("../multerConfig");

const bebidasController = require("../controllers/bebidasController");

router.get("/", bebidasController.mostrarBebidas);

router.get("/cantidadBebidas", bebidasController.cantidadBebidas);

router.post(
  "/agregarBebidas",
  upload.single("archivo"),
  bebidasController.crearBebidas
);

router.delete("/eliminar/:id", (req, res) => {
  const id = req.params.id;
  bebidasController.eliminarBebida(id, (err, data) => {
    if (err) {
      res
        .status(500)
        .send({ message: err.message || "Error al eliminar la bebida." });
    } else {
      res.send({ message: "Bebida eliminada correctamente" });
    }
  });
});
router.put("/editar/:id", bebidasController.actualizarBebida);

module.exports = router;
