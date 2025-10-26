import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import React from "react";
import {ProductDetailPage as ProductDetail} from "../../components/Pages/7-ProductDetail/ProductDetailPage";

describe("7-ProductDetail page", () => {
  it("monta sin crashear", () => {
    const { container, unmount } = render(<ProductDetail {...({} as any)} />);
    expect(container.firstChild).toBeTruthy();
    unmount();
  });
});
