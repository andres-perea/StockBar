import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import Register from "./Register";

jest.mock("axios");

describe("Register Component", () => {
  it("Debe de mostrar correctamente el formulario de registro", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Nombre de usuario:/i));
    expect(screen.getByLabelText(/Correo Electronico:/i));
    expect(screen.getByLabelText(/Contraseña:/i));
    expect(screen.getByRole("button", { name: /Crear cuenta/i }));
  });

  it("Debe mostrar un mensaje de error si falla el registro", async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { message: "Register Failed" } },
    });
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Nombre de usuario:/i), {
      target: { value: "wronguser" },
    });
    fireEvent.change(screen.getByLabelText(/Correo Electronico:/i), {
      target: { value: "wrongemail" },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña:/i), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Crear cuenta/i }));

    await waitFor(() => {
      expect(screen.queryByText("Register Failed"));
    });
  });
});
