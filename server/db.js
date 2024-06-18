const mysql = require("mysql");

const db = mysql.createConnection({
  host: "barmanage.c98wok6kq4or.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "azxcvmnb",
  database: "barmanage",
});

db.connect((err) => {
  if (err) {
    console.error("Error de conexion a la base de datos" + err);
  } else {
    console.log("Conexion exitosa a la base de datos");
  }
});

db.end();

module.exports = db;
