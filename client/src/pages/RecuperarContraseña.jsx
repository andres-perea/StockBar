import React, { useState } from "react";
import axios from "axios";

function RecuperarContraseña() {
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (event) => {
    setCorreoElectronico(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/recuperar-contraseña",
        { correoElectronico }
      );
      setMessage(response.data);
    } catch (error) {
      setMessage("Error al enviar la solicitud");
    }
  };

  return (
    <div className="">
      <h2>Recuperacion de contraseña</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Correo electrónico:
          <input
            type="email"
            value={correoElectronico}
            onChange={handleEmailChange}
            required
          />
        </label>
        <button type="submit">Recuperar Contraseña</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default RecuperarContraseña;
