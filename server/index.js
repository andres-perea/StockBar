const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const authRouters = require("./routers/authRoutes");
const bebidasRouters = require("./routers/bebidasRouters");
const categoriasRouters = require("./routers/categoriasRouters");
const pedidosRouters = require("./routers/pedidosRouters");
const saldoRouters = require("./routers/saldoRouters");

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", authRouters);
app.use("/bebidas", bebidasRouters);
app.use("/categorias", categoriasRouters);
app.use("/pedidos", pedidosRouters);
app.use("/saldo", saldoRouters);

app.use("/img", express.static(path.join(__dirname, "img/")))

app.listen(3000, () => {
  console.log("el servidor esta funcionando en el puerto 3000");
});
