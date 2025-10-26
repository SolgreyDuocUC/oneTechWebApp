import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { AdminPage as Admin } from "../../../components/Pages/1-Admin/AdminPage";

describe("1-Admin page", () => {
  it("monta sin crashear", () => {
    const { container, unmount } = render(<Admin {...({} as any)} />);
    expect(container.firstChild).toBeTruthy();
    unmount();
  });
});
