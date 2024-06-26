const express = require("express");
const router = express.Router();
const saldoController = require("../controllers/saldoController");

router.get("/", saldoController.obtenerSaldo);

module.exports = router;