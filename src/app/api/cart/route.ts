import { cartService } from "@/services/cartService";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";


type RouteProps = {
  params: Promise<{ id: string }>
}

export async function POST(
    request: Request, 
) {
    const session = await getSession();
    const userId = Number(session.user?.id);
    
    const body = await request.json();

    const cartItem = await cartService.addItemToCart(userId, body.productId, body.quantity);
    if (!cartItem) {
        return new Response(JSON.stringify({ error: "Erro ao adicionar item ao carrinho" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

    return new Response(JSON.stringify(cartItem), {
        status: 201,
        headers: { "Content-Type": "application/json" },
    });
}


export async function GET(
    request: Request, 
) {
    const session = await getSession();

    if (!session.user) {
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const cart = await cartService.getCartByUserId(session.user.id);

    if (!cart) {
        const cart = await cartService.createCartForUser(session.user.id);
        return NextResponse.json(cart.items);
    }

    return NextResponse.json(cart.items);
}