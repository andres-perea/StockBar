const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/registro", authController.registro);
router.post("/login", authController.inicioSesion);
router.post(
  "/solicitar-cambio-contrasena",
  authController.solicitarCambioContraseña
);
router.post("/cambiar-contrasena", authController.cambiarContraseña);
router.get("/logout", authController.logout);

module.exports = router;
