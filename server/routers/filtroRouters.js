const express = require("express");
const router = express.Router();
const filtroController = require("../controllers/filtroController");

router.get("/", filtroController.datosEntrada);

module.exports = router;
