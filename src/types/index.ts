import type { Prisma } from "@prisma/client";

/**
 * Tipagens TypeScript base correspondentes ao schema Prisma.
 * Relações são opcionais (podem ser incluídas quando você fizer include/select no Prisma).
 */

export interface UserUI {
    id: number;
    email: string;
    name: string;
    password: string | null;
    cart?: CartUI;
}

export interface ProductUI {
    id: number;
    name: string;
    price: Prisma.Decimal | string;
    description: string;
    categoryId: number;
    category?: CategoryUI;
    imageUrl: string;
    cartItems?: CartItemUI[];
}

export interface CategoryUI {
    id: number;
    name: string;
    products?: ProductUI[];
}

export interface CartUI {
    id: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    items?: CartItemUI[];
    user?: UserUI;
}

export interface CartItemUI {
    id: number;
    quantity: number;
    productId: number;
    cartId: number;
    product?: ProductUI;
    cart?: CartUI;
}