import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../setup/test-utils";
import{RegisterPage as Register} from "../../../components/Pages/8-Register/RegisterPage"; 

describe("Registro - validación de RUT (R.7)", () => {
  it("rechaza RUTs inválidos y acepta válidos", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Register {...({} as any)} />);

    const rutInput = screen.getByLabelText(/rut/i);

    // inválidos
    await user.clear(rutInput);
    await user.type(rutInput, "12.345.678-K"); // DV incorrecto
    await user.tab(); // dispara blur/validación
    expect(await screen.findByText(/rut inválido/i)).toBeInTheDocument();

    await user.clear(rutInput);
    await user.type(rutInput, "12345678"); // sin DV
    await user.tab();
    expect(await screen.findByText(/rut inválido/i)).toBeInTheDocument();

    // válidos (varias formas)
    await user.clear(rutInput);
    await user.type(rutInput, "12.345.678-5");
    await user.tab();
    expect(screen.queryByText(/rut inválido/i)).not.toBeInTheDocument();

    await user.clear(rutInput);
    await user.type(rutInput, "12.345.678-k");
    await user.tab();
    expect(screen.queryByText(/rut inválido/i)).not.toBeInTheDocument();
  });
});
