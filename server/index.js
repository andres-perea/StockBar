const express = require("express");
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

app.listen(3000, () => {
  console.log("el servidor esta funcionando en el puerto 3000");
});
