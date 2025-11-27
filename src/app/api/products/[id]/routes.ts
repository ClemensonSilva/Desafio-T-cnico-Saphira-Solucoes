import { productsService } from "@/services/productsService";


export async function GET( request: Request, { params }: { params: { id: string } }) {
    const id = params.id;
    const products = await productsService.getProductById(Number(id));

    if (!products) {
        return new Response(JSON.stringify({ error: "Produto não encontrado" }), {
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