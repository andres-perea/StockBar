import React, { useState } from "react";
import axios from "axios";

const SolicitarContraseña = () => {
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/solicitar-cambio-contrasena",
        { correoElectronico }
      );
      setMessage(response.data);
    } catch (error) {
      setMessage("Error al enviar la solicitud");
    }
  };

  return (
    <>
      <h2>Solicitar Cambio de contraseña</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Correo electronico:
          <input
            type="email"
            value={correoElectronico}
            onChange={(e) => setCorreoElectronico(e.target.value)}
            required
          />
        </label>
        <button type="submit">Solicitar</button>
      </form>
      {message && <p>{message}</p>}
    </>
  );
};

export default SolicitarContraseña;