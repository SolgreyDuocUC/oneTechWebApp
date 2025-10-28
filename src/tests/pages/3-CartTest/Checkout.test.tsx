import { describe, it, expect, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../setup/test-utils";
import { CartPage as Checkout } from "@/components/Pages/3-Cart/CartPage";
import { server } from "../../setup/msw-server";
import { http, HttpResponse } from "msw";

function seedCart(items: any[]) {
  localStorage.setItem("cart", JSON.stringify(items));
}

describe("Checkout (R.19)", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("bloquea envío si el carrito está vacío", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Checkout {...({} as any)} />);

    const submit = await screen.findByRole("button", { name: /pagar|confirmar|finalizar/i });
    await user.click(submit);

    expect(await screen.findByText(/carrito vacío|no hay productos/i)).toBeInTheDocument();
  });

  it("valida campos obligatorios y realiza pedido exitoso", async () => {
    const user = userEvent.setup();

    // carrito con items
    seedCart([
      { id: "1", nombre: "Catan", precio: 10000, qty: 2, stock: 10 },
      { id: "2", nombre: "Azul",  precio:  5000, qty: 1, stock: 5  },
    ]);
    renderWithProviders(<Checkout {...({} as any)} />);

    // intenta enviar vacío → errores
    const submit = await screen.findByRole("button", { name: /pagar|confirmar|finalizar/i });
    await user.click(submit);

    const errors = await screen.findAllByText(/obligatorio|requerido|inválido/i);
    expect(errors.length).toBeGreaterThan(0);

    
    await user.type(screen.getByLabelText(/nombre/i), "Mila Tester");
    await user.type(screen.getByLabelText(/correo|email/i), "mila@test.com");
    await user.type(screen.getByLabelText(/dirección|address/i), "Av. Siempre Viva 123");

    const method = screen.queryByLabelText(/tarjeta|débito|efectivo/i);
    if (method) await user.click(method);

    await user.click(submit);

    
    expect(await screen.findByText(/pedido realizado|gracias|orden/i)).toBeInTheDocument();
  });

  it("muestra error si la API de checkout falla", async () => {
    const user = userEvent.setup();

    
    server.use(
      http.post("/api/checkout", () =>
        HttpResponse.json({ ok: false, message: "Error de servidor" }, { status: 500 })
      )
    );

    seedCart([{ id: "1", nombre: "Catan", precio: 10000, qty: 1, stock: 10 }]);
    renderWithProviders(<Checkout {...({} as any)} />);

    await user.type(screen.getByLabelText(/nombre/i), "Mila Tester");
    await user.type(screen.getByLabelText(/correo|email/i), "mila@test.com");
    await user.type(screen.getByLabelText(/dirección|address/i), "Av. Siempre Viva 123");
    await user.click(screen.getByRole("button", { name: /pagar|confirmar|finalizar/i }));

    expect(await screen.findByText(/error de servidor|no se pudo procesar/i)).toBeInTheDocument();
  });
});
