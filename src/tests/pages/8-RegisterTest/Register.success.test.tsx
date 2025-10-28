import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../setup/test-utils";
import {RegisterPage as Register} from "@/components/Pages/8-Register/RegisterPage";

describe("Registro - flujo exitoso (R.10)", () => {
  it("envía el formulario y muestra confirmación", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Register {...({} as any)} />);

    await user.type(screen.getByLabelText(/nombre/i), "Mila Tester");
    await user.type(screen.getByLabelText(/rut/i), "12.345.678-5");
    await user.type(screen.getByLabelText(/correo|email/i), "mila@test.com");
    await user.type(screen.getByLabelText(/contraseña/i), "Secreta123");

    await user.selectOptions(await screen.findByLabelText(/región/i), "Región Metropolitana");
    await user.selectOptions(screen.getByLabelText(/comuna/i), "Santiago");

    await user.click(screen.getByRole("button", { name: /registrar/i }));


    expect(await screen.findByText(/registro exitoso|bienvenido|cuenta creada/i)).toBeInTheDocument();

  });
});
