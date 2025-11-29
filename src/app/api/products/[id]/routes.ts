import { categoryService } from "@/services/categoryServices";
import { productsService } from "@/services/productsService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;    
    const categoryName = searchParams.get("category");

    if (!categoryName) {
        return NextResponse.json(
            { error: "Parâmetro de categoria ausente" }, 
            { status: 400 }
        );
    }

    const category = await categoryService.getCategoryByName(categoryName);

    if (!category) {
        return NextResponse.json(
            { error: "Categoria não encontrada" }, 
            { status: 404 }
        );
    }

    const products = await productsService.getProductsByCategory(category.id);

    if (!products || products.length === 0) {
        return NextResponse.json(
            { error: "Nenhum produto encontrado para esta categoria" }, 
            { status: 404 }
        );
    }

    return NextResponse.json(products, { status: 200 });
}

export async function DELETE(
    request: Request, 
    props: { params: Promise<{ id: string }> } 
) {
    const params = await props.params; 
    const id = Number(params.id);

    const deletedProduct = await productsService.deleteProductById(id);

    if (!deletedProduct) {
        return NextResponse.json(
            { error: "Produto não encontrado ou erro ao deletar" }, 
            { status: 404 }
        );
    }

    return NextResponse.json(deletedProduct, { status: 200 });
}