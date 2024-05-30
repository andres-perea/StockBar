const db = require("../db");

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

Usuario.actualizarContraseña = (
  correoElectronico,
  nuevaContraseña,
  callback
) => {
  const hashedPassword = bcrypt.hashSync(nuevaContraseña, 10);
  const query =
    "UPDATE usuarios SET contrasena = ? WHERE correoElectronico = ?";
  db.query(query, [hashedPassword, correoElectronico], callback);
};

module.exports = Usuario;
