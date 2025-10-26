import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../setup/test-utils";
import {ContactPage} from "@/components/Pages/9-Contact/ContactPage"; 

describe("R.23 - Contacto WhatsApp", () => {
  it("muestra enlace de WhatsApp con href bien formado", () => {
    renderWithProviders(<ContactPage {...({} as any)} />);


    const link = screen.getByRole("link", { name: /whatsapp|contacto|soporte/i });

    expect(link).toBeInTheDocument();

    const href = (link as HTMLAnchorElement).href;
  
    expect(href).toMatch(/^https:\/\/(wa\.me|api\.whatsapp\.com)\/?/);


    expect(href).toMatch(/(wa\.me\/\d{8,15})|(phone=\d{8,15})/);
  });
});
