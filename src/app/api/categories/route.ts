import { BusinessError, NotFoundError } from "@/exceptions";
import { categoryService } from  "@/services/categoryServices";

export async function GET( ) {
    try {
        const categories = await categoryService.getAllCategories();
        return new Response(JSON.stringify(categories), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {

        if (error instanceof NotFoundError) {

            return new Response(JSON.stringify({ error: error.message }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }
        if (error instanceof BusinessError) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Erro ao buscar categorias' }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}