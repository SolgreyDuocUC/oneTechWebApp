import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import React from "react";
import {HomePage as Home} from "../../components/Pages/5-Home/HomePage";

describe("5-Home page", () => {
  it("monta sin crashear", () => {
    const { container, unmount } = render(<Home {...({} as any)} />);
    expect(container.firstChild).toBeTruthy();
    unmount();
  });
});
