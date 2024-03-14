const express = require("express");
const router = express.Router();
const bebidasController = require("../controllers/bebidasController");

router.get("/", bebidasController.mostrarBebidas);
router.post("/agregarBebidas", bebidasController.crearBebidas);
router.get("/:id", bebidasController.bebidaPorId);

router.delete("/eliminar/:id", function(req, res){
    bebidasController.eliminarBebida
})
router.put("/editar/:id", bebidasController.actualizarBebida);

module.exports = router;
