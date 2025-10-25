import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, test, vi, beforeEach } from "vitest";
import React from "react";
import { HomePage } from "./HomePage";

describe('HomePage', () => {
    test("Debe simular agregar un elemento al carrito", () => {

        const mockAddToCart = vi.fn();
        vi.mock("../../../contexts/CartContext", () => ({
            useCart: () => ({
        addToCart: mockAddToCart,
            }),
        }));

    })
})

