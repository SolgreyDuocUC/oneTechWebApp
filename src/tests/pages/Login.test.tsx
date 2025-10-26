import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import React from "react";
import {LoginPage as Login} from "../../components/Pages/6-Login/LoginPage";

describe("6-Login page", () => {
  it("monta sin crashear", () => {
    const { container, unmount } = render(<Login {...({} as any)} />);
    expect(container.firstChild).toBeTruthy();
    unmount();
  });
});
