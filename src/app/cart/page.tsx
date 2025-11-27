"use client";

import { CartItemCard } from "@/components/cart/cart-item-card";
import { OrderSummary } from "@/components/cart/order-summary";
import { Header } from "@/components/layouts/header";
import {ContinueBuying} from "@/components/cart/continue-buying";
import { CartItemUI } from "@/types";

export default function Cart() {
    // Corrigi a sintaxe do array de objetos que estava com erros no seu snippet
    const mockedCartItem: CartItemUI[] = [
        {
            id: 1,
            quantity: 2,
            productId: 1,
            cartId: 1,
            
            product: {
                id: 1,
                name: "Smart Watch Pro",
                price: 399.99, // Ajustei preço para bater com a foto
                description: "Wearables",
                categoryId: 1,
                category: { id: 1, name: "Wearables" },
                imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=300",
            },
            cart: { id: 1, userId: 1, createdAt: new Date(), updatedAt: new Date() },
        },
        {
            id: 2,
            quantity: 1,
            productId: 2,
            cartId: 1,
            product: {
                id: 2,
                name: "Premium Wireless Headphones",
                price: 299.99, // Ajustei preço para bater com a foto
                description: "Audio",
                categoryId: 2,
                category: { id: 2, name: "Audio" },
                imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=300",
            },
            cart: { id: 1, userId: 1, createdAt: new Date(), updatedAt: new Date() },
        }
    ];

    const subTotal = mockedCartItem.reduce((acc, item) => {
        return acc + Number(item.product.price) * item.quantity;
    }, 0);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
                    Shopping Cart
                </h1>

                <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                    <section className="lg:col-span-7">
                        <ul role="list" className="space-y-4"> 
                            {mockedCartItem.map((cartItemUI) => (
                                <li key={cartItemUI.id}>
                                    <CartItemCard item={cartItemUI} />
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="lg:col-span-5 mt-8 lg:mt-0">
                        <div className="sticky top-20">
                            <OrderSummary 
                                subtotal={subTotal} 
                                onCheckout={() => console.log("Checkout click")} 
                                onContinueShopping={() => console.log("Continue click")} 
                            />
                        </div>
                    </section>

                </div>
                <ContinueBuying 
                    categoryName="Wearables" 
                    products={mockedCartItem.map(item => item.product)} 
                />
            </main>
        </div>
    );
}