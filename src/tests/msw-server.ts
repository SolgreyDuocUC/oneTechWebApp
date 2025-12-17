import { cleanup } from "@testing-library/react";
import { setupServer } from "msw/node";

export const server = setupServer();

afterEach(() => {
  cleanup();
});

window.scrollTo = () => {};