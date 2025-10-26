import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import React from "react";
import {RegisterPage as Register} from "../../components/Pages/8-Register/RegisterPage";

describe("8-Register page", () => {
  it("monta sin crashear", () => {
    const { container, unmount } = render(<Register {...({} as any)} />);
    expect(container.firstChild).toBeTruthy();
    unmount();
  });
});
