import { categoryService } from "@/services/categoryServices";

export async function GET(
    request: Request, 
    props: { params: Promise<{ id: string }> } 
) {
    const params = await props.params; 
    const id = params.id;
    
    const category = await categoryService.getCategoryById(Number(id));
    
    if (!category) {
        return new Response(JSON.stringify({ error: "Categoria não encontrada" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
    }
    
    return new Response(JSON.stringify(category), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}