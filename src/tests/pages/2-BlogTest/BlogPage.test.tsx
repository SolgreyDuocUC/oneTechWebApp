// tests/Pages/BlogPage.test.tsx
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../../helpers/renderWithProviders";
import { BlogPage } from "@/components/Pages/2-Blog/BlogPage";

// Este mock simula que hay un post llamado "Configuraciones de PC"
const mockPosts = [
  {
    id: 1,
    title: "Las mejores configuraciones de PC para gaming en 2025",
    summary: "Una guía para armar tu equipo gamer",
    content: "Contenido largo del artículo...",
  },
];

describe("BlogPage - Detalle de post", () => {
  it("abre el detalle al hacer click en 'Leer más'", async () => {
    const user = userEvent.setup();

    renderWithProviders(<BlogPage posts={mockPosts as any} />);

    // Comprueba que el título del post está visible
    expect(
      await screen.findByText(/configuraciones de pc para gaming/i)
    ).toBeInTheDocument();

    // Busca y hace clic en el botón 'Leer más'
    const leerMasButton = screen.getByRole("button", { name: /leer más/i });
    await user.click(leerMasButton);

    // Ahora debe mostrarse el contenido largo
    expect(await screen.findByText(/contenido largo/i)).toBeInTheDocument();
  });
});
