import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../setup/test-utils";
import { AdminPage as Admin } from "@/components/Pages/1-Admin/AdminPage";

describe("Admin - crear producto", () => {
  it("valida campos y crea correctamente", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Admin {...({} as any)} />);

    
    await user.click(await screen.findByRole("button", { name: /nuevo|crear/i }));

    
    await user.click(screen.getByRole("button", { name: /guardar|crear/i }));
   expect((await screen.findAllByText(/obligatorio|requerido/i)).length).toBeGreaterThan(0);

    
    await user.type(screen.getByLabelText(/nombre/i), "Terraforming Mars");
    await user.clear(screen.getByLabelText(/precio/i));
    await user.type(screen.getByLabelText(/precio/i), "49990");
    await user.clear(screen.getByLabelText(/stock/i));
    await user.type(screen.getByLabelText(/stock/i), "7");

    await user.click(screen.getByRole("button", { name: /guardar|crear/i }));

    
    expect(await screen.findByText(/terraforming mars/i)).toBeInTheDocument();
  });
});
