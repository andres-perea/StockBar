const mysql = require("mysql");

const db = mysql.createConnection({
  host: "barmanage.c98wok6kq4or.us-east-2.rds.amazonaws.com",
  port: 3306,
  user: "admin",
  password: "azxcvmnb",
  database: "barmanage",
  authPlugins: {
    mysql_clear_password: () => () => Buffer.from("azxcvmnb"),
  },
});

db.connect((err) => {
  if (err) {
    console.error("Error de conexion a la base de datos" + err);
  } else {
    console.log("Conexion exitosa a la base de datos");
  }
});

module.exports = db;
