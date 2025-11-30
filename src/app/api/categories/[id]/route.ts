import { BusinessError, NotFoundError } from "@/exceptions";
import { categoryService } from "@/services/categoryServices";

export async function GET(
    request: Request, 
    props: { params: Promise<{ id: string }> } 
) {
    const params = await props.params; 
    if (!params.id) {
        return new Response(JSON.stringify({ error: "ID da categoria ausente" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
    const id = params.id;
    
    try {
    const category = await categoryService.getCategoryById(Number(id));
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

        return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Erro ao buscar categoria' }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}