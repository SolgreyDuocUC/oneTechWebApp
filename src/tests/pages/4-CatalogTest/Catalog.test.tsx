import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import {CatalogPage as Catalog} from "../../../components/Pages/4-Catalog/CatalogPage";

describe("4-Catalog page", () => {
  it("monta sin crashear", () => {
    const { container, unmount } = render(<Catalog {...({} as any)} />);
    expect(container.firstChild).toBeTruthy();
    unmount();
  });
});
