import { cartService } from "@/services/cartService";
import { NextResponse } from "next/server";


// Método está aqui pois o item do carrinho é um recurso do carrinho
export async function POST( request: Request, { params }: { params: { id: string } }) {
    const id = Number(params.id);
    const body = await request.json();

    const cartItem = await cartService.addItemToCart(id, body.productId, body.quantity);

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

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function PUT(
  request: Request,
  { params }: RouteContext 
) {
  try {
    const resolvedParams = await params;
    const cartId = Number(resolvedParams.id);

    if (isNaN(cartId)) {
        return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const body = await request.json();

    const result = await cartService.editItemQuantity(
      cartId, 
      body.productId, 
      body.quantity
    );

    if (!result) {
      return NextResponse.json(
        { error: "Erro ao atualizar item ou item não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
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
type Props = {
    params: Promise<{ id: string }>
}

export async function GET(
    request: Request, 
    props: Props
) {
    try {
        const params = await props.params;
        const userId = Number(params.id);

        if (isNaN(userId)) {
            return NextResponse.json(
                { error: "ID do carrinho inválido" },
                { status: 400 }
            );
        }
        const cart = await cartService.getCartByUserId(userId);
    


        const items = await cartService.getAllItemsByCart(cart.id);
        if (!items) {
            return NextResponse.json(
                { error: "Carrinho não encontrado" }, 
                { status: 404 }
            );
        }

        return NextResponse.json(items, { status: 200 });

    } catch (error) {
        console.error("Erro API GET Cart:", error);
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}