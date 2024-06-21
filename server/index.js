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
const itemRoutes = require("./routers/itemRoutes");
const reservasRoutes = require("./routers/reservasRoutes");

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", authRouters);
app.use("/bebidas", bebidasRouters);
app.use("/categorias", categoriasRouters);
app.use("/pedidos", pedidosRouters);
app.use("/saldo", saldoRouters);
app.use("/api", itemRoutes);
app.use("/reservas", reservasRoutes);

app.use("/img", express.static(path.join(__dirname, "controllers/img")));

app.listen(5000, () => {
  console.log("El servidor está funcionando en el puerto 5000");
});
