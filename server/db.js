const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "proyectobar",
});

db.connect((err) => {
  if (err) {
    console.error("Error de conexion a la base de datos" + err);
  } else {
    console.log("Conexion exitosa a la base de datos");
  }
});

module.exports = db;
