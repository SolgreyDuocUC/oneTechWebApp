import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../setup/test-utils";
import { BlogPage as Blog } from "@/components/Pages/2-Blog/BlogPage";

describe("Blog - paginación", () => {
  it("avanza de página y muestra nuevos posts", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Blog {...({} as any)} />);

    await screen.findByText(/primer post/i);

    // botón "Siguiente" 
    const next = screen.getByRole("button", { name: /siguiente|next/i });
    await user.click(next);

    expect(await screen.findByText(/vitest tips/i)).toBeInTheDocument();

    expect(screen.queryByText(/primer post/i)).not.toBeInTheDocument();
  });
});
