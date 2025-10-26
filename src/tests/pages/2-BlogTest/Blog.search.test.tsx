import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../setup/test-utils";
import { BlogPage as Blog } from "@/components/Pages/2-Blog/BlogPage";

describe("Blog - búsqueda", () => {
  it("filtra posts por texto", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Blog {...({} as any)} />);

    await screen.findByText(/primer post/i);

    const input = screen.getByRole("textbox", { name: /buscar|search/i }) 
               || screen.getByPlaceholderText(/buscar/i);

    await user.clear(input);
    await user.type(input, "vitest");

    expect(await screen.findByText(/vitest tips/i)).toBeInTheDocument();
    expect(screen.queryByText(/primer post/i)).not.toBeInTheDocument();
  });
});
