import { HomePage } from '@/components/Pages/5-Home/HomePage';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, it, expect, vi } from 'vitest';

describe('HomePage', () => {
const mockNavigate = vi.fn();

beforeEach(() => {
    render(<HomePage onNavigate={mockNavigate} />);
});

it('debe renderizar las secciones principales de la HomePage', () => {
    expect(screen.getByText(/carousel/i)).toBeInTheDocument();
    expect(screen.getByText(/beneficios/i)).toBeInTheDocument();
    expect(screen.getByText(/productos destacados/i)).toBeInTheDocument();
});
    it('debe mostrar las secciones de categorías', () => {
        expect(screen.getByText(/computadores gamer/i)).toBeInTheDocument();
        expect(screen.getByText(/periféricos gaming/i)).toBeInTheDocument();
        expect(screen.getByText(/monitores gaming/i)).toBeInTheDocument();
    });
});
