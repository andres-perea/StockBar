const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRouters = require("./routers/authRoutes");
const bebidasRouters = require("./routers/bebidasRouters");

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

//Ruta de login y register
app.use("/api/auth", authRouters);

//Ruta de productos
app.use("/bebidas", bebidasRouters);

app.listen(3000, () => {
  console.log("el servidor esta funcionando en el puerto 3000");
});
