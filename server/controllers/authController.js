const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Usuario = require("../models/usuarioModel");
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
};

exports.logout = (req, res) => {
  res.status(200).send({ auth: false, token: null });
};

const enviarCorreo = (correoElectronico, nuevaContraseña, callback) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "zonabar.2024@gmail.com",
      pass: "ZonaBar2024",
    },
  });

  const mailOptions = {
    from: "zonabar.2024@gmail.com",
    to: correoElectronico,
    subject: "Recuperacion de contraseña",
    text: `tu nueva contraseña es: ${nuevaContraseña}`,
  };
  transporter.sendMail(mailOptions, callback);
};

exports.recuperarContraseña = (req, res) => {
  const { correoElectronico } = req.body;
  const nuevaContraseña = Math.random().toString(36).substring(2, 8);

  Usuario.actualizarContraseña(
    correoElectronico,
    nuevaContraseña,
    (err, results) => {
      if (err) {
        console.error("Error al actualizar la contraseña: ", err);
        res.status(500).send("Error al actualizar la contraseña");
        return;
      }

      if (results.affectedRows === 0) {
        res.status(404).send("Usuario no encontrado");
        return;
      }

      enviarCorreo(correoElectronico, nuevaContraseña, (error, info) => {
        if (error) {
          console.error("Error al enviar correo electrónico: ", error);
          res.status(500).send("Error al enviar correo electrónico");
          return;
        }
        console.log("Correo electronico enviado", info.response);
        res
          .status(200)
          .send(
            "Contraseña actualizada. Se ha enviado un correo electrónico con la nueva contraseña."
          );
      });
    }
  );
};
