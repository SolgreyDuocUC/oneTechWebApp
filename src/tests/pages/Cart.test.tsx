import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import React from "react";
import {CartPage as Cart} from "../../components/Pages/3-Cart/CartPage";

describe("3-Cart page", () => {
  it("monta sin crashear", () => {
    const { container, unmount } = render(<Cart {...({} as any)} />);
    expect(container.firstChild).toBeTruthy();
    unmount();
  });
});
