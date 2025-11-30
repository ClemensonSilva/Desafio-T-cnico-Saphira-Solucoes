import { categoryService } from "@/services/categoryServices";
import { productsService } from "@/services/productsService";
import { NextRequest, NextResponse } from "next/server";
import { BusinessError, NotFoundError } from '@/exceptions';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const categoryName = searchParams.get("category");

    if (!categoryName) {
        return NextResponse.json(
            { error: "Parâmetro de categoria ausente" },
            { status: 400 }
        );
    }

    try {
        
        const category = await categoryService.getCategoryByName(categoryName);
        const products = await productsService.getProductsByCategory(category);
        return NextResponse.json(products, { status: 200 });

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


export async function DELETE(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    const id = Number(params.id);
    try {
        const deletedProduct = await productsService.deleteProductById(id);
        return NextResponse.json(deletedProduct, { status: 200 });
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