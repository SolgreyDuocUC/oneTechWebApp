import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../setup/test-utils";
import { server } from "../../setup/msw-server";
import { http, HttpResponse } from "msw";
import { BlogPage as Blog } from "@/components/Pages/2-Blog/BlogPage";

describe("Blog - errores", () => {
  it("muestra mensaje de error si la API falla", async () => {
    
    server.use(http.get("/api/posts", () => HttpResponse.json({ message: "fail" }, { status: 500 })));

    renderWithProviders(<Blog {...({} as any)} />);

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });
});
