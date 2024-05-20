const express = require("express");
const router = express.Router();
const filtroController = require("../controllers/filtroController");

router.get("/buscar", filtroController.obtenerDatos);
router.get("/buscar/bebida", filtroController.obtenerPorFiltro);

module.exports = router;
