import { describe, test, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { mockAddToCart, renderHomePage } from "@/helpers/renderHomePage";

describe("HomePage", () => {
  test("Debe renderizar correctamente las secciones principales", () => {
    renderHomePage();

    expect(screen.getByText(/Sobre One Tech/i)).toBeInTheDocument();
    expect(screen.getByText(/Computadores Gamer/i)).toBeInTheDocument();
    expect(screen.getByText(/Periféricos Gaming/i)).toBeInTheDocument();
  });

  test("Debe permitir agregar un producto al carrito", async () => {
    renderHomePage();

    // Simula clic en el primer botón de 'Agregar al carrito'
    const botones = await screen.findAllByRole("button", { name: /agregar al carrito/i });
    fireEvent.click(botones[0]);

    expect(mockAddToCart).toHaveBeenCalledTimes(1);
  });
});

