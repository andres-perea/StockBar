import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import io from "socket.io-client";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import ActualizarBebidas from "./pages/actualizarBebidas";
import Bebidas from "./pages/Bebidas";
import AgregarBebidas from "./pages/agregarBebidas";
import Categorias from "./pages/Categorias";
import AgregarCategorias from "./pages/agregarCategorias";
import Menu from "./pages/Menu";
import LandingPage from "./pages/LandingPage";
import Inventario from "./pages/inventario";
import SolicitarContraseña from "./pages/SolicitarContraseña";
import CambiarContraseña from "./pages/CambiarContraseña";
import AgregarReservas from "./pages/agregarReserva";
import PrivateRoute from "./components/RutaPrivada";

function Routers() {
  const [messageFromServer, setMessageFromServer] = useState("");

  useEffect(() => {
    const socket = io("http://localhost:3000");
    socket.on("connect", () => {
      console.log("Conexion establecida con el servidor");
    });

    socket.on("FromAPI", (data) => {
      console.log("Mensaje del servidor:", data);
      setMessageFromServer(data);
    });

    socket.on("disconnect", () => {
      console.log("Desconectado del servidor");
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/registro" element={<Register />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route
          path="/bebidas"
          element={<PrivateRoute element={<Bebidas />} />}
        />
        <Route
          path="/agregarBebida"
          element={<PrivateRoute element={<AgregarBebidas />} />}
        />
        <Route
          path="/actualizarBebida/:id"
          element={<PrivateRoute element={<ActualizarBebidas />} />}
        />
        <Route
          path="/categorias"
          element={<PrivateRoute element={<Categorias />} />}
        />
        <Route
          path="/agregarCategoria"
          element={<PrivateRoute element={<AgregarCategorias />} />}
        />
        <Route path="/menu" element={<PrivateRoute element={<Menu />} />} />
        <Route
          path="/inventario"
          element={<PrivateRoute element={<Inventario />} />}
        />
        <Route
          path="/solicitar-cambio-contraseña"
          element={<SolicitarContraseña />}
        />
        <Route
          path="/cambiar-contrasena/:token"
          element={<CambiarContraseña />}
        />
        <Route path="/crear-reserva" element={<AgregarReservas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
