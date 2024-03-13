const express = require("express");
const router = express.Router();
const bebidasController = require("../controllers/bebidasController");

router.get("/", bebidasController.mostrarBebidas);
router.get("/:id", bebidasController.bebidaPorId);
router.post("/agregarBebidas", bebidasController.crearBebidas);
router.put("/:id", bebidasController.actualizarBebida);

module.exports = router;
