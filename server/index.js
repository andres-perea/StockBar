const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRouters = require("./routers/authRoutes");
const bebidasRouters = require("./routers/bebidasRouters");
const categoriasRouters = require("./routers/categoriasRouters");
const pedidosRouters = require("./routers/pedidosRouters");

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", authRouters);
app.use("/bebidas", bebidasRouters);
app.use("/categorias", categoriasRouters);
app.use("/pedidos", pedidosRouters);

//Configuracion Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "client/src/img");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.listen(3000, () => {
  console.log("el servidor esta funcionando en el puerto 3000");
});
