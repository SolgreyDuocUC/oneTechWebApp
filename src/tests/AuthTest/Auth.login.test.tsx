import { describe, it, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../setup/test-utils";
import {LoginPage as Login} from "@/components/Pages/6-Login/LoginPage";

describe("Inicio de sesión (R.16)", () => {
  it("rechaza campos vacíos y credenciales inválidas", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Login {...({} as any)} />);

    // intenta enviar sin datos
    await user.click(screen.getByRole("button", { name: /ingresar/i }));
    expect(await screen.findByText(/correo.*obligatorio/i)).toBeInTheDocument();

    // credenciales inválidas
    await user.type(screen.getByLabelText(/correo/i), "fake@duoc.cl");
    await user.type(screen.getByLabelText(/contraseña/i), "1234");
    await user.click(screen.getByRole("button", { name: /ingresar/i }));

    expect(await screen.findByText(/usuario o contraseña incorrectos/i)).toBeInTheDocument();
  });

  it("acepta credenciales válidas simuladas", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Login {...({} as any)} />);

    await user.type(screen.getByLabelText(/correo/i), "admin@duoc.cl");
    await user.type(screen.getByLabelText(/contraseña/i), "123456");
    await user.click(screen.getByRole("button", { name: /ingresar/i }));

    await waitFor(() => {
      expect(screen.getByText(/bienvenido|panel/i)).toBeInTheDocument();
    });
  });
});
