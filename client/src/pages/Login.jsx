import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [values, setValues] = useState({
    nombreUsuario: "",
    contrasena: "",
  });

  const navigate = useNavigate();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/api/auth/login", values)
      .then(function (response) {
        console.log(response);
        alert("inicio de sesion exitoso");
        console.log(response.data);
        navigate("/dashboard");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h2>Iniciar Sesión</h2>
      <form action="" onSubmit={handleSubmit}>
        <div className="">
          
          <label htmlFor="nombreUsuario">Nombre de usuario: </label>
          <div id="input-box">
          <input
            type="text"
            placeholder="Ingrese su nombre de usuario"
            name="nombreUsuario"
            onChange={(e) =>
              setValues({ ...values, nombreUsuario: e.target.value })
            }
            //required
          />
          </div>
        </div>
        <div className="">
          <label htmlFor="contrasena">Contraseña: </label>
          <div id="input-box">
          <input
            type="password"
            placeholder="Ingrese su contraseña"
            name="contrasena"
            onChange={(e) =>
              setValues({ ...values, contrasena: e.target.value })
            }
            //required
          />
          </div>
        </div>
        <button type="submit">Iniciar Sesion</button>

        <Link to="/registro">
          <button>Crear cuenta</button>
        </Link>
      </form>
    </div>
  );
}

export default Login;
