import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../setup/test-utils";
import { AdminPage as Admin } from "@/components/Pages/1-Admin/AdminPage";

describe("Admin - carga de productos", () => {
  it("muestra listado después de cargar", async () => {
    renderWithProviders(<Admin {...({} as any)} />);

    expect(await screen.findByText(/catan/i)).toBeInTheDocument();
    expect(screen.getByText(/azul/i)).toBeInTheDocument();
  });
});
