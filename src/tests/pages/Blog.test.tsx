import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import React from "react";
import {BlogPage as Blog} from "../../components/Pages/2-Blog/BlogPage";

describe("2-Blog page", () => {
  it("monta sin crashear", () => {
    const { container, unmount } = render(<Blog {...({} as any)} />);
    expect(container.firstChild).toBeTruthy();
    unmount();
  });
});
