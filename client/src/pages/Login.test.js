import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./Login";

test("Permite a todos los usuarios iniciar sesion correctamente", () => {
    const mockOnLogin = jest.fn();

    render(<Login />);

    const nombreUsuarioInput =screen.getByLabelText(/nombreUsuario/i);
    const contrasenaInput = screen.getByLabelText(/contrasena/i);
    const loginButton = screen.getByRole("button", { name: /login/i })

    fireEvent.change(nombreUsuarioInput, {target: })

})