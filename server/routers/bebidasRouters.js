const express = require("express");
const router = express.Router();
const bebidasController = require("../controllers/bebidasController");

router.get("/", bebidasController.mostrarBebidas);
router.post("/agregarBebidas", bebidasController.crearBebidas)
router.put('/actualizarProducto:id', bebidasController.actualizarBebida)


module.exports = router;
