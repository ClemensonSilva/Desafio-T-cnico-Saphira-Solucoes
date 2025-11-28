import { categoryService } from "@/services/categoryServices";
import { productsService } from "@/services/productsService";
import { NextRequest } from "next/server";

export async function GET( request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;    
    const categoryName = searchParams.get("category");

     if (!categoryName) {
        return new Response(JSON.stringify({ error: "Parâmetro de categoria ausente" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const category = await categoryService.getCategoryByName(categoryName? categoryName : "");

   if (!category) {
        return new Response(JSON.stringify({ error: "Categoria não encontrada" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
    }


    const products = await productsService.getProductsByCategory(category ? category.id : null);

    if (!products || products.length === 0) {
        return new Response(JSON.stringify({ error: "Nenhum produto encontrado para esta categoria" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
    }

    return new Response(JSON.stringify(products), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });

}
export async function DELETE( request: Request, { params }: { params: { id: string } }) {
    const id = params.id;
    const deletedProduct = await productsService.deleteProductById(Number(id));

    if (!deletedProduct) {
        return new Response(JSON.stringify({ error: "Produto não encontrado" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
    }

    return new Response(JSON.stringify(deletedProduct), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}