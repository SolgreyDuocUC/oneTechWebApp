import { describe, it, expect, beforeEach } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../setup/test-utils";
import {ProductDetailPage} from "@/components/Pages/7-ProductDetail/ProductDetailPage";
import { resetReviews } from "../../setup/msw-server";

describe("R.21 - Reviews por producto", () => {
  beforeEach(() => {
    // si exportaste resetReviews
    resetReviews?.();
    localStorage.clear();
  });

  it("lista reseñas existentes y muestra promedio", async () => {
    renderWithProviders(<ProductDetailPage {...({} as any)} />);

    // asume que el detalle carga productId=1 por ruta/estado (si no, ajusta)
    const list = await screen.findByRole("list", { name: /reseñas|reviews/i });
    expect(within(list).getByText(/excelente/i)).toBeInTheDocument();
    expect(within(list).getByText(/muy bueno/i)).toBeInTheDocument();

    // promedio: (5+4)/2 = 4.5 (ajusta a tu UI: estrellas, texto “4.5”, etc.)
    const avg = screen.getByText(/4\.5|4,5/);
    expect(avg).toBeInTheDocument();
  });

  it("valida y crea una nueva reseña, actualizando la lista y el promedio", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProductDetailPage {...({} as any)} />);

    // intenta enviar vacío → errores
    const submit = await screen.findByRole("button", { name: /enviar reseña|publicar|comentar/i });
    await user.click(submit);
    const errs = await screen.findAllByText(/obligatorio|requerido|inválido/i);
    expect(errs.length).toBeGreaterThan(0);

    // completa y envía
    // rating: ajusta según tu UI (select, radios, estrellas clicables)
    const ratingSelect = screen.queryByLabelText(/calificación|rating|estrellas/i);
    if (ratingSelect) {
      await user.selectOptions(ratingSelect as HTMLSelectElement, "5");
    } else {
      // alternativa: si usas 5 botones/estrellas
      const star = screen.getByRole("button", { name: /5/i });
      await user.click(star);
    }

    await user.type(screen.getByLabelText(/tu nombre|usuario/i), "Mila");
    await user.type(screen.getByLabelText(/comentario|reseña/i), "Maravilloso");

    await user.click(submit);

    // aparece en la lista
    expect(await screen.findByText(/maravilloso/i)).toBeInTheDocument();
    // el promedio ahora debería subir (antes 4.5 con 5 y 4; con 5 nuevo → 4.67 aprox)
    expect(screen.getByText(/4\.6|4,6|4\.7|4,7/)).toBeInTheDocument();
  });

  it("muestra error si la API de reseñas rechaza los datos", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProductDetailPage {...({} as any)} />);

    // rating inválido
    await user.type(screen.getByLabelText(/tu nombre|usuario/i), "Mila");
    await user.type(screen.getByLabelText(/comentario|reseña/i), "sin rating");
    await user.click(await screen.findByRole("button", { name: /enviar reseña|publicar|comentar/i }));

    expect(await screen.findByText(/datos inválidos|error/i)).toBeInTheDocument();
  });
});
