const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const authRouters = require("./routers/authRoutes");
const bebidasRouters = require("./routers/bebidasRouters");
const categoriasRouters = require("./routers/categoriasRouters");
const pedidosRouters = require("./routers/pedidosRouters");
const saldoRouters = require("./routers/saldoRouters");
const itemRoutes = require("./routers/itemRoutes");

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", authRouters);
app.use("/bebidas", bebidasRouters);
app.use("/categorias", categoriasRouters);
app.use("/pedidos", pedidosRouters);
app.use("/saldo", saldoRouters);
app.use("/api", itemRoutes);

app.use("/img", express.static(path.join(__dirname, "controllers/img")));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  socket.emit("FromAPI", "Hola del servidor");

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

server.listen(3000, () => {
  console.log("El servidor está funcionando en el puerto 3000");
});