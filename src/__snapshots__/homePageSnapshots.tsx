import { HomePage } from "@/components/Pages/5-Home/HomePage";
import { render } from "@testing-library/react";

test("Coincide con el snapshot", () => {
  const { asFragment } = render(<HomePage onNavigate={vi.fn()} />);
  expect(asFragment()).toMatchSnapshot();
});
