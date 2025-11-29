
import { CartItemCard } from "@/components/cart/cart-item-card";
import { OrderSummary } from "@/components/cart/order-summary";
import { Header } from "@/components/layouts/header";
import {ContinueBuying} from "@/components/cart/continue-buying";
import { ProductUI } from "@/types";
import { CartItemUI } from "@/types";
import { getSession, SessionData } from "@/lib/session";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getCartItems(cartId: number) {
   const session: SessionData = await getSession();

   if (!session.isLoggedIn || !session.user) {
        // Usa o redirect do Next.js (Server-Side redirect)
        redirect("/login?callbackUrl=/cart"); 
        return [];
    }

    const data = await fetch(`${API_URL}/api/cart/${session.user.id}`, {
        cache: 'no-store'
    });

    if (!data.ok) {
        return [];
    }
    return data.json();
}

async function getProductsRecommendations(categoryName: string[]) {
    const uniqueCategories = [...new Set(categoryName)];

    
    // faz várias requisições paralelas para cada categoria única
    const requests = uniqueCategories.map(async (category) => {
        const url = `${API_URL}/api/products?category=${encodeURIComponent(category)}`;
        
        const res = await fetch(url, {
            cache: 'no-store'
        });

        if (!res.ok) return []; 

        return res.json() as Promise<ProductUI[]>;
    });

    const results = await Promise.all(requests);

    return results.flat();
}


export default async function Cart({ params }: { params: Promise<{ id: string }> }) {

    const cartItems = await getCartItems(Number((await params).id)) as CartItemUI[];

    const categoriesFromCart = cartItems
        .map(item => item.product?.category?.name)
        .filter((name): name is string => !!name);
        
    const productsRecommendation = await getProductsRecommendations(categoriesFromCart);
    let subTotal = 0;   
    for (const item of cartItems) {
        subTotal += Number(item.quantity) * Number(item.product.price);
    }

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
                            {cartItems.map((cartItemUI) => (
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
                            />
                        </div>
                    </section>

                </div>
                <ContinueBuying 
                    categoryName="CATEGORIA" 
                    products={productsRecommendation as  ProductUI[]}
                />
            </main>
        </div>
    );
}