import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import AgregarBebidas from "./pages/agregarBebidas";
import ActualizarBebidas from "./pages/actualizarBebidas";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/agregarBebida" element={<AgregarBebidas />} />
        <Route path="/actualizarBebidas/:id" render={(props) => <ActualizarBebidas id={props.match.params.id}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
