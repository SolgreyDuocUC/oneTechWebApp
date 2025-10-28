
import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { HomePage } from '../components/Pages/5-Home/HomePage';
import * as CartContext from '../contexts/CartContext';
import * as Sonner from 'sonner';
import type { Product } from '../types';

export const renderHomePage = (overrides: any = {}) => {
  // Mock del contexto
  const addToCart = overrides.addToCart || vi.fn();
  vi.spyOn(CartContext, 'useCart').mockReturnValue({
      addToCart,
      cart: [],
      removeFromCart: function (productId: string): void {
          throw new Error('Function not implemented.');
      },
      updateQuantity: function (productId: string, cantidad: number): void {
          throw new Error('Function not implemented.');
      },
      clearCart: function (): void {
          throw new Error('Function not implemented.');
      },
      getCartTotal: function (): number {
          throw new Error('Function not implemented.');
      },
      getCartItemsCount: function (): number {
          throw new Error('Function not implemented.');
      },
      getProductById: function (productId: string): Product | undefined {
          throw new Error('Function not implemented.');
      }
  });

  // Mock de Sonner
  const toastSuccess = overrides.toastSuccess || vi.fn();
  vi.spyOn(Sonner.toast, 'success').mockImplementation(toastSuccess);

  // Mock de onNavigate
  const onNavigate = overrides.onNavigate || vi.fn();

  const utils = render(<HomePage onNavigate={onNavigate} />);
  return {
    ...utils,
    addToCart,
    toastSuccess,
    onNavigate,
  };
};
