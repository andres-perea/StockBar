import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [values, setValues] = useState({
    nombreUsuario: "",
    correoElectronico: "",
    contrasena: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/api/auth/registro", values)
      .then(function (response) {
        console.log(response);
        alert("Usuario registrado correcamente");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="">
      <h2>Crear Cuenta</h2>
      <form action="" onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="nombreUsuario">Nombre de usuario: </label>
          <input
            type="text"
            placeholder="Ingrese su nombre de usuario"
            onChange={(e) =>
              setValues({ ...values, nombreUsuario: e.target.value })
            }
            required
          />
        </div>
        <div className="">
          <label htmlFor="correoElectronico">Correo electronico: </label>
          <input
            type="email"
            placeholder="Ingrese su correo electronico"
            onChange={(e) =>
              setValues({ ...values, correoElectronico: e.target.value })
            }
            required
          />
        </div>
        <div className="">
          <label htmlFor="contrasena">Contraseña: </label>
          <input
            type="password"
            placeholder="Ingrese su contraseña"
            onChange={(e) =>
              setValues({ ...values, contrasena: e.target.value })
            }
            required
          />
        </div>
        <button type="submit">Crear cuenta</button>

        <Link to="/login">
          <button id="inicioSesion">Iniciar sesion</button>
        </Link>
      </form>
    </div>
  );
}

export default Register;
