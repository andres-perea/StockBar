import React, { useEffect, useState } from "react";
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
import Pedidos from "./pages/Pedidos";
import LandingPage from "./pages/LandingPage";
import Inventario from "./pages/inventario";
import SolicitarContraseña from "./pages/SolicitarContraseña";

function Routers() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bebidas" element={<Bebidas />} />
        <Route path="/agregarBebida" element={<AgregarBebidas />} />
        <Route path="/actualizarBebida/:id" element={<ActualizarBebidas />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/agregarCategoria" element={<AgregarCategorias />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/solicitar-cambio-contraseña" element={<SolicitarContraseña />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
