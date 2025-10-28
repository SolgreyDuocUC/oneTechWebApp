import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../setup/test-utils";
import { BlogPage as Blog } from "@/components/Pages/2-Blog/BlogPage"; // ajusta si export default

describe("Blog - carga de lista", () => {
  it("muestra posts después de cargar", async () => {
    renderWithProviders(<Blog {...({} as any)} />);


    expect(await screen.findByText(/primer post/i)).toBeInTheDocument();
    expect(screen.getByText(/segundo post/i)).toBeInTheDocument();
  });
});
