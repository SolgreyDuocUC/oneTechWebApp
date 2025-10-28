import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../setup/test-utils";
import { AdminPage as Admin } from "@/components/Pages/1-Admin/AdminPage";

describe("Admin - editar producto", () => {
  it("abre con valores y guarda cambios", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Admin {...({} as any)} />);

    
    await screen.findByText(/catan/i);
    const editar = screen.getAllByRole("button", { name: /editar/i })[0];
    await user.click(editar);

    const nombre = screen.getByLabelText(/nombre/i);
    expect((nombre as HTMLInputElement).value).toMatch(/catan/i);

    await user.clear(nombre);
    await user.type(nombre, "Catan (Edición 2025)");
    await user.click(screen.getByRole("button", { name: /guardar/i }));

    
    expect(await screen.findByText(/edición 2025/i)).toBeInTheDocument();
  });
});
