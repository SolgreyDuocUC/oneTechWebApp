import { it, expect } from "vitest";
import {RegisterPage as Register} from "../../../components/Pages/8-Register/RegisterPage";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../setup/test-utils";
it("muestra errores en tiempo real al dejar campos vacíos (R.15)", async () => {
  const user = userEvent.setup();
  renderWithProviders(<Register {...({} as any)} />);

  const inputs = [
    screen.getByLabelText(/nombre/i),
    screen.getByLabelText(/correo/i),
    screen.getByLabelText(/contraseña/i)
  ];

  for (const input of inputs) {
    await user.click(input);
    await user.tab(); 
  }

  const errors = await screen.findAllByText(/obligatorio|requerido|inválido/i);
  expect(errors.length).toBeGreaterThan(0);
});
