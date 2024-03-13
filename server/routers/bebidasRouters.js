const express = require("express");
const router = express.Router();
const bebidasController = require("../controllers/bebidasController");

router.get("/", bebidasController.mostrarBebidas);
router.get("/bebida:id", bebidasController.bebidaPorId);
router.post("/agregarBebidas", bebidasController.crearBebidas);
router.put("/bebida:id", bebidasController.actualizarBebida);

module.exports = router;
