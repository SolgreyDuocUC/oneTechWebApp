import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import {ContactPage as Contact} from "../../../components/Pages/9-Contact/ContactPage";

describe("9-Contact page", () => {
  it("monta sin crashear", () => {
    const { container, unmount } = render(<Contact {...({} as any)} />);
    expect(container.firstChild).toBeTruthy();
    unmount();
  });
});
