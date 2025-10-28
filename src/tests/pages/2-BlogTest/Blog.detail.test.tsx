import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import { renderWithProviders } from "../../setup/test-utils";
import { BlogPage as Blog } from "@/components/Pages/2-Blog/BlogPage";

describe("Blog - detalle", () => {
  it("abre el detalle al hacer click en 'Leer más' o en el título", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Blog {...({} as any)} />);

   
    await screen.findByText(/primer post/i);

    
    const leerMas = screen.getByRole("link", { name: /leer más/i }) 
                 || screen.getByRole("button", { name: /leer más/i });
    await user.click(leerMas);

    expect(await screen.findByText(/contenido largo/i)).toBeInTheDocument();
  });
});
