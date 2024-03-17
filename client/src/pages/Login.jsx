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
    <main>
      <div class="box">
        <div class="inner-box">
          <div class="forms-wrap">
            <div className="container">
              <h2 className="titulo">Iniciar Sesión</h2>
              <form action="" onSubmit={handleSubmit} className="formulario">
                <div className="campo">
                  <label htmlFor="nombreUsuario" className="etiqueta">
                    Nombre de usuario:
                  </label>
                  <div className="input-box">
                    <input
                      type="text"
                      placeholder="Ingrese su nombre de usuario"
                      name="nombreUsuario"
                      onChange={(e) =>
                        setValues({ ...values, nombreUsuario: e.target.value })
                      }
                      className="input"
                      //required
                    />
                  </div>
                </div>
                <div className="campo">
                  <label htmlFor="contrasena" className="etiqueta">
                    Contraseña:
                  </label>
                  <div className="input-box">
                    <input
                      type="password"
                      placeholder="Ingrese su contraseña"
                      name="contrasena"
                      onChange={(e) =>
                        setValues({ ...values, contrasena: e.target.value })
                      }
                      className="input"
                      //required
                    />
                  </div>
                </div>
                <button type="submit" className="boton">
                  Iniciar Sesión
                </button>

                <Link to="/registro" className="enlace">
                  <button className="boton">Crear cuenta</button>
                </Link>
              </form>
            </div>
          </div>
          <div class="carousel"></div>
        </div>
      </div>
    </main>
  );
}

export default Login;
