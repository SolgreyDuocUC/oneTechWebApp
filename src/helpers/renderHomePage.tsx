import { HomePage } from "@/components/Pages/5-Home/HomePage";
import { render } from "@testing-library/react";
import { vi } from "vitest";

// Mock del contexto del carrito
export const mockAddToCart = vi.fn();
vi.mock("../../contexts/CartContext", () => ({
  useCart: () => ({
    addToCart: mockAddToCart,
  }),
}));

export const renderHomePage = (onNavigate = vi.fn()) => {
  return render(<HomePage onNavigate={onNavigate} />);
};
