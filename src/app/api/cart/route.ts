import { cartService } from "@/services/cartService";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { BusinessError, NotFoundError } from '@/exceptions';


type RouteProps = {
    params: Promise<{ id: string }>
}

export async function POST(
    request: Request,
) {
    const session = await getSession();
    const userId = Number(session.user?.id);

    const body = await request.json();

    try {
        const cartItem = await cartService.addItemToCart(userId, body.productId, body.quantity);
        
        return new Response(JSON.stringify(cartItem), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
    
            if (error instanceof NotFoundError) {
    
                return new Response(JSON.stringify({ error: error.message }), {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
            if (error instanceof BusinessError) {
                return new Response(JSON.stringify({ error: error.message }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
            return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Erro ao buscar produtos' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }


}


export async function GET(
    request: Request,
) {
    const session = await getSession();
     if (!session.user) {
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    try {
        const cart = await cartService.getCartByUserId(session.user.id);
        return NextResponse.json(cart.items, { status: 200 });
    }
    catch(error){   

            if (error instanceof NotFoundError) {
    
                return new Response(JSON.stringify({ error: error.message }), {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
            if (error instanceof BusinessError) {
                return new Response(JSON.stringify({ error: error.message }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
            return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Erro ao buscar produtos' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
       
    }
   



}