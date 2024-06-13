const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuarioModel");
const enviarCorreo = require("./config/emailService");
const { generarToken, verificarToken } = require("./config/tokenService");
const db = require("../db");

exports.registro = (req, res) => {
  const nuevoUsuario = new Usuario(req.body);
  bcrypt.hash(nuevoUsuario.contrasena, 10, (err, hash) => {
    if (err) throw err;
    nuevoUsuario.contrasena = hash;
    Usuario.crearUsuario(nuevoUsuario, (err, usuario) => {
      if (err) res.status(500).send({ message: err });
      else res.send({ message: "Usuario registrado correctamente" });
    });
  });
};

exports.inicioSesion = (req, res) => {
  const { nombreUsuario, contrasena } = req.body;

  Usuario.obtenerUsuario(nombreUsuario, (err, usuario) => {
    if (err) {
      console.error("Error al obtener usuario:", err);
      return res.status(500).send({ message: "Error del servidor" });
    }

    if (!usuario) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    bcrypt.compare(contrasena, usuario.contrasena, (err, result) => {
      if (err) {
        console.error("Error al comparar contraseñas:", err);
        return res.status(500).send({ message: "Error del servidor" });
      }

      if (result) {
        const token = jwt.sign({ id: usuario.id }, "a1b2c3", {
          expiresIn: "24h",
        });
        return res.send({ auth: true, token: token });
      } else {
        return res.status(401).send({ message: "Contraseña incorrecta" });
      }
    });
  });
};

exports.solicitarCambioContraseña = (req, res) => {
  const { correoElectronico } = req.body;
  console.log(
    "Solicitud de cambio de contraseña para el email:",
    correoElectronico
  );
  Usuario.buscarPorEmail(correoElectronico, (err, results) => {
    if (err) {
      console.error("Error en buscarPorEmail:", err);
      return res.status(500).send("Error en la búsqueda del usuario");
    }
    if (err || results.length === 0) {
      console.warn("Usuario no encontrado para el email:", correoElectronico);
      return res.status(404).send("Usuario no encontrado");
    }
    const token = generarToken({ correoElectronico });
    console.log("Token generado:", token);
    const link = `http://localhost:5173/cambiar-contrasena/${token}`;
    const mensaje = `Haz clic en el siguiente enlace para cambiar tu contraseña: ${link}`;

    enviarCorreo(
      correoElectronico,
      "Cambio de contraseña",
      mensaje,
      (error, info) => {
        if (error) {
          return res.status(500).send("Error al enviar el correo electrónico");
        }
        res.status(200).send("Correo enviado");
      }
    );
  });
};

exports.cambiarContraseña = (req, res) => {
  const { token, nuevaContrasena } = req.body;
  console.log("Cambio de contraseña con token:", token);
  verificarToken(token, (err, decoded) => {
    if (err) {
      console.error("Error al verificar el token:", err);
      return res.status(400).send("Token inválido o expirado");
    }
    const hashedContraseña = bcrypt.hashSync(nuevaContrasena, 10);
    Usuario.actualizarContraseña(
      decoded.correoElectronico,
      hashedContraseña,
      (error, results) => {
        if (error) {
          console.error("Error al actualizar la contraseña:", error);
          return res.status(500).send("Error al actualizar la contraseña");
        }
        res.status(200).send("Contraseña actualizada");
      }
    );
  });
};

exports.logout = (req, res) => {
  res.status(200).send({ auth: false, token: null });
};
