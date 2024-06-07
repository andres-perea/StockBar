import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import Dashboard from "./Dashboard";

jest.mock("axios");

describe("Componente de Dashboard", () => {
  test("Debe renderizarse conrrectamente", async () => {
    axios.get.mockResolvedValueOnce({ data: { saldo: 10 } });
    axios.get.mockResolvedValueOnce({ data: [] });

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    expect(screen.getAllByText(/StockBar/i));
    expect(screen.getAllByText(/Dashboard/i));
  });

  test("Debe eliminar la barra lateral cuando se hace clic en el boton de menú", async () => {
    axios.get.mockResolvedValueOnce({ data: { saldo: 10 } });
    axios.get.mockResolvedValueOnce({ data: [] });

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    const menuButton = screen.getByLabelText("menu");
    fireEvent.click(menuButton);
    expect(screen.getAllByText(/Dashboard/i));
    fireEvent.click(menuButton);
  });
  test("Deberia mostrar notificacion de stock bajo", async () => {
    axios.get.mockResolvedValueOnce({ data: { saldo: 5 } });
    axios.get.mockResolvedValueOnce({
      data: [{ id: 1, nombre: "Coca Cola", cantidad: 3 }],
    });

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    await waitFor(() => {
        expect(screen.getByText(/Stock bajo del producto Coca Cola/i));
    })
  });
});
