import { describe, it, expect, beforeEach, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithProviders } from "../../setup/test-utils";
import {CartPage as Cart} from "@/components/Pages/3-Cart/CartPage"; 

function seedCart(items: any[]) {
  localStorage.setItem("cart", JSON.stringify(items));
}

describe("Carrito (R.18)", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("muestra 'Carrito vacío' cuando no hay items", () => {
    renderWithProviders(<Cart {...({} as any)} />);
    expect(screen.getByText(/carrito vacío|no hay productos/i)).toBeInTheDocument();
  });

  it("renderiza items y calcula total", async () => {
    seedCart([
      { id: "1", nombre: "Catan", precio: 29990, qty: 1, stock: 10 },
      { id: "2", nombre: "Azul",  precio: 25990, qty: 2, stock: 5  },
    ]);

    renderWithProviders(<Cart {...({} as any)} />);

    expect(await screen.findByText(/catan/i)).toBeInTheDocument();
    expect(screen.getByText(/azul/i)).toBeInTheDocument();

  
    const total = screen.getByText(/\$?\s*81\.?970|81970/i);
    expect(total).toBeInTheDocument();
  });

  it("incrementa y decrementa cantidades, sin bajar de 1", async () => {
    const user = userEvent.setup();
    seedCart([{ id: "1", nombre: "Catan", precio: 1000, qty: 1, stock: 10 }]);
    renderWithProviders(<Cart {...({} as any)} />);

 
    const inc = await screen.findByRole("button", { name: /\+|aumentar/i });
    const dec = screen.getByRole("button", { name: /-|disminuir/i });

   
    await user.click(inc);
    expect(screen.getByDisplayValue("2")).toBeInTheDocument(); 


    await user.click(dec);
    expect(screen.getByDisplayValue("1")).toBeInTheDocument();

  
    await user.click(dec);
    expect(screen.getByDisplayValue("1")).toBeInTheDocument();
  });

  it("elimina un item y recalcula total", async () => {
    const user = userEvent.setup();
    seedCart([
      { id: "1", nombre: "Catan", precio: 1000, qty: 1, stock: 10 },
      { id: "2", nombre: "Azul",  precio: 2000, qty: 1, stock: 5  },
    ]);
    renderWithProviders(<Cart {...({} as any)} />);


    const btnsDel = await screen.findAllByRole("button", { name: /eliminar|remover|quitar/i });
    await user.click(btnsDel[1]);

    expect(screen.queryByText(/azul/i)).not.toBeInTheDocument();
    
    expect(screen.getByText(/\$?\s*1\.?000|1000/i)).toBeInTheDocument();
  });

  it("vacía el carrito y limpia localStorage", async () => {
    const user = userEvent.setup();
    seedCart([{ id: "1", nombre: "Catan", precio: 1000, qty: 3, stock: 10 }]);

    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");
    renderWithProviders(<Cart {...({} as any)} />);

    const clearBtn = await screen.findByRole("button", { name: /vaciar carrito|vaciar/i });
    await user.click(clearBtn);

    expect(screen.getByText(/carrito vacío/i)).toBeInTheDocument();
    
    expect(setItemSpy).toHaveBeenCalledWith("cart", JSON.stringify([]));
  });
});
