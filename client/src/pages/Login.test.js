import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import Login from "./Login";
import axios from "axios";

jest.mock("axios");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Login Component", () => {
  it("muestra correctamente el formulario de inicio de sesión", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Nombre de usuario:/i));
    expect(screen.getByLabelText(/Contraseña:/i));
    expect(screen.getByRole("button", { name: /Iniciar Sesión/i }));
  });

  it("muestra un mensaje de error en caso de fallo en el inicio de sesión", async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { message: "Login failed" } },
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Nombre de usuario:/i), {
      target: { value: "wronguser" },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña:/i), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Iniciar Sesión/i }));

    await waitFor(() => {
      expect(screen.getByText("Login failed"));
    });
  });

  it("navega al panel de control si el inicio de sesión es correcto", async () => {
    jest.spyOn(axios, "post").mockResolvedValueOnce({ status: 200 });
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/Nombre de usuario:/i), {
      target: { value: "andresPerea" },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña:/i), {
      target: { value: "123789" },
    });

    // Simulate form submission
    fireEvent.click(screen.getByRole("button", { name: /Iniciar Sesión/i }));

    await waitFor(() => {
      expect(useNavigate).toHaveBeenCalledWith();
    });
  });
});
