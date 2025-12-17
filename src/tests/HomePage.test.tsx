import { HomePage } from '@/components/Pages/5-Home/HomePage';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, it, expect, vi } from 'vitest';

vi.mock('@/data/mockProductos', () => ({
    productos: [
        { id: 1, name: 'Producto Destacado', featured: true, category: 'Computadores' },
        { id: 2, name: 'Computador Gamer', category: 'Computadores', featured: false },
        { id: 3, name: 'Periférico Gaming', category: 'Periféricos', featured: false },
        { id: 4, name: 'Monitor Gaming', category: 'Monitores', featured: false },
    ],
}));

const addToCartMock = vi.fn();

vi.mock('@/contexts/CartContext', () => ({
    useCart: () => ({
        addToCart: addToCartMock,
    }),
}));

vi.mock('@/components/Pages/5-Home/HomeComponents/Carrusel', () => ({
    default: () => <div data-testid="carousel" />,
}));

vi.mock('@/components/Pages/5-Home/HomeComponents/Beneficios', () => ({
    default: () => <div data-testid="beneficios" />,
}));

vi.mock('@/components/Pages/5-Home/HomeComponents/ProductosDestacados', () => ({
    default: ({ addToCart }: any) => (
        <button onClick={() => addToCart(1, 2)}>Add Featured</button>
    ),
}));

vi.mock('@/components/Pages/5-Home/HomeComponents/SeccionCategoria', () => ({
    default: ({ titulo }: any) => (
        <div>{titulo}</div>
    ),
}));

const onNavigateMock = vi.fn();

const renderHome = () => {
    render(<HomePage onNavigate={onNavigateMock} />);
};

describe('HomePage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('debe renderizar las secciones principales', () => {
        renderHome();

        expect(screen.getByTestId('carousel')).toBeInTheDocument();
        expect(screen.getByTestId('beneficios')).toBeInTheDocument();

        expect(screen.getByText('Computadores Gamer')).toBeInTheDocument();
        expect(screen.getByText('Periféricos Gaming')).toBeInTheDocument();
        expect(screen.getByText('Monitores Gaming')).toBeInTheDocument();
});

    it('debe llamar addToCart con los valores correctos', () => {
        renderHome();

        const button = screen.getByText('Add Featured');
        button.click();

        expect(addToCartMock).toHaveBeenCalledWith(1, 2);
    });
});
