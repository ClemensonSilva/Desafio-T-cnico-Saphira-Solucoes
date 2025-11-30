import { cartService } from "@/services/cartService";
import { NextResponse } from "next/server";
import { BusinessError, NotFoundError } from '@/exceptions';

type RouteProps = {
  params: Promise<{ id: string }>
}

export async function POST(
  request: Request,
  props: RouteProps
) {
  const params = await props.params;
  const id = Number(params.id);

  const body = await request.json();


  try {
    const cartItem = await cartService.addItemToCart(id, body.productId, body.quantity);
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


export async function PUT(
  request: Request,
  props: RouteProps
) {
    const params = await props.params;

    const cartId = Number(params.id);

    if (isNaN(cartId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const body = await request.json();
    try {

      const result = await cartService.editItemQuantity(
        cartId,
        body.productId,
        body.quantity
      );

      return NextResponse.json(result, { status: 200 });

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
      return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Erro ao atualizar item do carrinho' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
      
    }
}


export async function DELETE(
  request: Request,
  props: RouteProps
) {
  const params = await props.params;
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
