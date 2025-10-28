import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { ProductCard } from "../components/Pages/3-Cart/Cart/ProductCard";

describe("ProductCard", () => {
  it("muestra nombre y precio y ejecuta onAddToCart", async () => {
    const user = userEvent.setup();
    const mockAdd = vi.fn();

    type CardProps = React.ComponentProps<typeof ProductCard>;
    type ProductType = CardProps["product"];
    const product = {
      id: "1",
      nombre: "Catan",
      precio: 29990,
      imagen: "/catan.jpg",
      descripcion: "Juego de mesa",
      categoria: "Juegos",
      stock: 10,
      stockCritico: 2,
      featured: false
    } as ProductType;

    render(
      <ProductCard
        product={product}
        onAddToCart={mockAdd}
        onViewDetails={() => {}}
      />
    );

    expect(screen.getByText(/\$?\s*29\.?990|CLP\s*29\.?990/)).toBeInTheDocument();


    const btn = screen.getByRole("button", { name: /agregar|carrito|añadir/i });
    await user.click(btn);
    expect(mockAdd).toHaveBeenCalledTimes(1);

  });
});
