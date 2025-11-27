import { cartService } from "@/services/cartService";

// Método está aqui pois o item do carrinho é um recurso do carrinho
export async function POST( request: Request, { params }: { params: { id: string } }) {
    const id = Number(params.id);
    const body = await request.json();

    const cartItem = cartService.addItemToCart(id, body.productId, body.quantity);

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

export async function PUT( request: Request, { params }: { params: { id: string } }) {
    const id = Number(params.id);
    const body = await request.json();
    
    const cartItem = await cartService.editItemQuantity(id, body.productId, body.quantity);
    if (!cartItem) {
        return new Response(JSON.stringify({ error: "Erro ao atualizar quantidade do item" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
    
    return new Response(JSON.stringify(cartItem), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

export async function DELETE( request: Request, { params }: { params: { id: string } }) {
    const id = Number(params.id);
    
    const deletedItem = await cartService.removeItemFromCart(id);
    if (!deletedItem) {
        return new Response(JSON.stringify({ error: "Erro ao remover item do carrinho" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

    return new Response(JSON.stringify(deletedItem), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

// puxa todos os itens do carrinho
export async function GET( request: Request, { params }: { params: { id: string } }) {
    const id = Number(params.id);
    
    const items = await cartService.getAllItemsByCart(id);
    if (!items) {
        return new Response(JSON.stringify({ error: "Carrinho não encontrado" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
    
    }
    return new Response(JSON.stringify(items), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}