import { categoryService } from '@/services/categoryServices';
import { productsService } from '@/services/productsService';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const categoryName = searchParams.get('category'); 
    const searchQuery = searchParams.get('search');
    let products ; 
    
    try {
        products = await productsService.getProductsByFilter(categoryName || undefined, searchQuery || undefined);
        return new Response(JSON.stringify(products), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }catch (error) {
        return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Erro ao buscar produtos' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    }

   


    

    

