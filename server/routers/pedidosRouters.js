const express = require("express");
const router = express.Router();
const pedidosController = require("../controllers/pedidosController");

router.get("/", pedidosController.obtenerPedidos);
router.post("/", pedidosController.crearPedido);

module.exports = router;
