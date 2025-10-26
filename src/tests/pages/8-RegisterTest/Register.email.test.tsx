import { describe, it, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../setup/test-utils";
import {RegisterPage as Register} from "@/components/Pages/8-Register/RegisterPage";

describe("Registro - validación de correo (R.8)", () => {
  it("muestra error con formato inválido", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Register {...({} as any)} />);

    const email = screen.getByLabelText(/correo|email/i);
    await user.type(email, "no-es-email");
    await user.tab();

    expect(await screen.findByText(/correo inválido/i)).toBeInTheDocument();
  });

  it("muestra error si el correo ya existe (409)", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Register {...({} as any)} />);

    const email = screen.getByLabelText(/correo|email/i);
    await user.type(email, "existe@dominio.com"); // el handler de MSW devuelve exists: true
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/ya está en uso|registrado/i)).toBeInTheDocument();
    });
  });
});
