import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../setup/test-utils";
import { AdminPage as Admin } from "@/components/Pages/1-Admin/AdminPage";

describe("Admin - eliminar producto", () => {
  it("confirma y elimina de la lista", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Admin {...({} as any)} />);

    
    await screen.findByText(/catan/i);

    
    const eliminar = screen.getAllByRole("button", { name: /eliminar|borrar/i })[0];
    await user.click(eliminar);

    
    const confirmar = await screen.findByRole("button", { name: /confirmar|sí, eliminar/i });
    await user.click(confirmar);

    
    expect(screen.queryByText(/catan/i)).not.toBeInTheDocument();
  });
});
