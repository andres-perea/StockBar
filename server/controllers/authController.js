const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuarioModel");
const enviarCorreo = require("./config/emailService");
const { generarToken, verificarToken } = require("./config/tokenService")
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
    if (err) throw err;
    if (!usuario) res.status(404).send({ message: "Usuario no encontrado" });
    else {
      bcrypt.compare(contrasena, usuario.contrasena, (err, result) => {
        if (err) throw err;
        if (result) {
          const token = jwt.sign({ id: usuario.id }, "a1b2c3", {
            expiresIn: "24h",
          });
          res.send({ auth: true, token: token });
        } else {
          res.status(401).send({ message: "contraseña incorrecta" });
        }
      });
    }
  });
}

exports.solicitarCambioContraseña = (req, res) => {
  const { correoElectronico } = req.body;
  Usuario.buscarPorEmail(correoElectronico, (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).send("Usuario no encontrado");
    }
    const token = generarToken({ correoElectronico });
    const link = `http://localhost:3000/cambiar-contraseña/${token}`;
    const mensaje = `Haz clic en el siguiente enlace para cambiar tu contraseña: ${link}`;

    enviarCorreo(correoElectronico, "Cambio de contraseña", mensaje, (error, info) => {
      if (error) {
        return res.status(500).send('Error al enviar el correo electrónico');
      }
      res.status(200).send('Correo enviado');
    })
  })
}

exports.logout = (req, res) => {
  res.status(200).send({ auth: false, token: null });
};


