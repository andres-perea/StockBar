const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemsController");

router.get("/items", itemController.buscarProducto);

module.exports = router;
