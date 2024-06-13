const express = require("express");
const router = express.Router();
const reservaController = require("../controllers/reservasController");

router.get("/", reservaController.mostrarReservas);
router.post("/crearReserva", reservaController.crearReserva);
router.delete("/eliminarReserva/:id", (req, res) => {
  const id = req.params.id;
  reservaController.eliminarReserva(id, (err, data) => {
    if (err) {
      res
        .status(500)
        .send({ message: err.message || "Error al eliminar la reserva" });
    } else {
      res.send({ message: "Reserva eliminada correctamente" });
    }
  });
});

module.exports = router;
