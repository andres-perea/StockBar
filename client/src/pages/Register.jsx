import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

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
    <main className="loginMain">
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
                      required
                    />
                  </div>
                </div>
                <div className="campo">
                  <label htmlFor="correoElectronico" className="etiqueta">
                    Correo Electronico:
                  </label>
                  <div className="input-box">
                    <input
                      type="email"
                      placeholder="Ingrese su nombre de usuario"
                      name="nombreUsuario"
                      onChange={(e) =>
                        setValues({
                          ...values,
                          correoElectronico: e.target.value,
                        })
                      }
                      className="input"
                      required
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
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="boton">
                  Crear cuenta
                </button>

                <Link to="/login" className="enlace">
                  <button className="boton">Iniciar sesion</button>
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

export default Register;
