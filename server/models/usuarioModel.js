const db = require("../db");
const bcrypt = require("bcryptjs");

const Usuario = function (usuario) {
  (this.nombreUsuario = usuario.nombreUsuario),
    (this.correoElectronico = usuario.correoElectronico),
    (this.contrasena = usuario.contrasena);
};

Usuario.crearUsuario = (nuevoUsuario, result) => {
  db.query("INSERT INTO usuarios SET ?", nuevoUsuario, (err, res) => {
    if (err) {
      console.log("Error:", err);
      result(err, null);
    } else {
      console.log("Usuario creado correctamente");
      result(null, res.insertId);
    }
  });
};

Usuario.obtenerUsuario = (nombreUsuario, result) => {
  db.query(
    "SELECT * FROM usuarios WHERE nombreUsuario = ?",
    nombreUsuario,
    (err, res) => {
      if (err) {
        console.log("Error", err);
        result(err, null);
      } else {
        result(null, res[0]);
      }
    }
  );
};

Usuario.buscarPorEmail = (correoElectronico, callback) => {
  const query = "SELECT * FROM usuarios WHERE correoElectronico = ?";
  db.query(query, [correoElectronico], callback);
};

Usuario.actualizarContraseña = (
  correoElectronico,
  nuevaContraseña,
  callback
) => {
  const query =
    "UPDATE usuarios SET contraseña = ? WHERE correoElectronico = ?";
  db.query(query, [nuevaContraseña, correoElectronico], callback);
};

module.exports = Usuario;
