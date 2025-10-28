import { describe, it, expect } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../setup/test-utils";
import {RegisterPage as Register} from "@/components/Pages/8-Register/RegisterPage";

describe("Registro - Región y Comuna (R.9)", () => {
  it("requiere Región y Comuna; al elegir Región se cargan comunas", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Register {...({} as any)} />);

    const region = await screen.findByLabelText(/región/i);
    await user.selectOptions(region, "Región Metropolitana");

    const comuna = screen.getByLabelText(/comuna/i);
    
    const opciones = within(comuna).getAllByRole("option").map(o => (o as HTMLOptionElement).label);
    expect(opciones.join(" ")).toMatch(/santiago|la florida/i);

    
    const submit = screen.getByRole("button", { name: /registrar/i });
    await user.click(submit);
    expect(await screen.findByText(/comuna.*obligatoria|requerida/i)).toBeInTheDocument();

    
    await user.selectOptions(comuna, "Santiago");
    await user.click(submit);
    
  });
});
